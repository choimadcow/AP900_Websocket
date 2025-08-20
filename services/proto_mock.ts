import * as fs from 'fs';
import * as path from 'path';
import * as protobuf from 'protobufjs';
import { WebSocket } from 'ws';

// .proto 파일 로딩 (최초 1회만 실행)
const protoPath = path.join(__dirname, '../../ws_test_code_20250623/HMI_T_Proto/HMI-T.proto');
let root: protobuf.Root;
let HMIInfoPb: protobuf.Type;

try {
    root = protobuf.loadSync(protoPath);
    // .proto 파일의 패키지 이름과 메시지 이름을 정확히 확인해야 합니다.
    HMIInfoPb = root.lookupType("HMI_T.ETRI.protobuf.HMIInfoPb");
} catch (e) {
    console.error("Error loading .proto file:", e);
}

// .out 파일들이 있는 디렉토리 경로
const outFilesDirectory = path.join(__dirname, '../../ws_test_code_20250623');

/**
 * .out 파일을 읽고, 데이터를 수정한 뒤, 연결된 모든 웹소켓 클라이언트에게 전송합니다.
 * @param clients - 전송 대상인 웹소켓 클라이언트 Set
 * @param outFileName - 읽어올 .out 파일 이름 (예: 'WS_read.out')
 * @param maneuver - 추가하거나 변경할 TBT maneuver 값 (예: 'LEFT', 'RIGHT')
 */
export const createAndBroadcastProtoData = (clients: Set<WebSocket>, outFileName: string, maneuver?: string) => {
    if (!HMIInfoPb) {
        console.error(".proto types not loaded. Cannot send data. Check .proto file path and package name.");
        return;
    }

    const filePath = path.join(outFilesDirectory, outFileName);

    try {
        const fileBuffer = fs.readFileSync(filePath);
        console.log(`[DEBUG] Read file '${outFileName}' with size: ${fileBuffer.length} bytes`);

        if (fileBuffer.length === 0) {
            console.error("[ERROR] File is empty. Cannot process data.");
            return;
        }

        let decodedMessage: protobuf.Message<{}> | null = null;

        try {
            // .out 파일이 length-delimited가 아닐 수 있으므로, 전체 버퍼를 decode하려고 시도합니다.
            console.log('[DEBUG] Attempting to decode the entire file buffer...');
            decodedMessage = HMIInfoPb.decode(fileBuffer);
        } catch (e) {
            console.error(`[ERROR] Failed to decode the file buffer as a single message. Error: ${e}`);
            // 단일 메시지 디코딩 실패 시 스트림으로 다시 시도해볼 수 있습니다.
            console.log('[DEBUG] Falling back to decoding as a delimited stream...');
            const reader = protobuf.Reader.create(fileBuffer);
            while (reader.pos < reader.len) {
                try {
                    const tempMessage = HMIInfoPb.decodeDelimited(reader);
                    if (tempMessage && Object.keys(tempMessage.toJSON()).length > 0) {
                        decodedMessage = tempMessage;
                        console.log('[DEBUG] Successfully decoded a non-empty message from the stream.');
                        break; // 첫 번째 유효한 메시지를 찾으면 중단
                    }
                } catch (streamError) {
                    console.error(`[ERROR] Error decoding a message segment from stream at position ${reader.pos}.`, streamError);
                    break; // 스트림에서도 오류 발생 시 중단
                }
            }
        }


        if (!decodedMessage || Object.keys(decodedMessage.toJSON()).length === 0) {
            console.error("[ERROR] Failed to decode any valid non-empty message from the file.");
            return;
        }

        console.log('[DEBUG] Successfully decoded message object (JSON):', JSON.stringify(decodedMessage.toJSON(), null, 2));

        const messageObject = HMIInfoPb.toObject(decodedMessage, {
            longs: String,
            enums: String,
            bytes: String,
        });

        // 데이터 수정 (maneuver 값이 주어진 경우)
        if (maneuver && messageObject.dispInfo && messageObject.dispInfo.TurnByTurnInfo) {
            console.log(`[DEBUG] Changing maneuver from '${messageObject.dispInfo.TurnByTurnInfo.maneuver}' to '${maneuver}'`);
            messageObject.dispInfo.TurnByTurnInfo.maneuver = maneuver;
        }

        const verificationError = HMIInfoPb.verify(messageObject);
        if (verificationError) {
            console.error("[ERROR] Message verification failed:", verificationError);
            throw Error(verificationError);
        }

        // 수정된 JavaScript 객체를 다시 바이너리 데이터로 인코딩합니다.
        const modifiedBuffer = HMIInfoPb.encode(messageObject).finish();


        // 연결된 모든 클라이언트에게 수정된 바이너리 데이터 전송
        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(modifiedBuffer);
            }
        });

        console.log(`Successfully sent proto data (${modifiedBuffer.length} bytes) based on '${outFileName}' to all clients.`);

    } catch (error) {
        console.error(`An error occurred while processing '${filePath}':`, error);
    }
};
