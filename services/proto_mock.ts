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

        const reader = protobuf.Reader.create(fileBuffer);
        let decodedMessage: protobuf.Message<{}> | null = null;

        // 파일 버퍼의 끝에 도달할 때까지 메시지를 디코딩합니다.
        // 이 파일은 여러 메시지가 합쳐진 스트림일 수 있으므로, 첫 번째 유효한 메시지를 찾습니다.
        while (reader.pos < reader.len) {
            try {
                // decodeDelimited는 길이-접두사 형식의 메시지를 하나 읽습니다.
                decodedMessage = HMIInfoPb.decodeDelimited(reader);
                if (decodedMessage) {
                    console.log('[DEBUG] Successfully decoded a message.');
                    // 첫 번째 메시지를 성공적으로 디코딩했으면 루프를 중단합니다.
                    break;
                }
            } catch (e) {
                console.error('Error decoding a message segment, attempting to skip...', e);
                // 오류 발생 시 다음 메시지로 넘어가기 위해 reader 위치를 조정해야 할 수 있으나,
                // 단순화를 위해 여기서는 루프를 중단합니다.
                break;
            }
        }

        if (!decodedMessage) {
            console.error("[ERROR] Failed to decode any valid message from the file.");
            return;
        }

        console.log('[DEBUG] Decoded message object (JSON):', JSON.stringify(decodedMessage.toJSON(), null, 2));

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
        // 클라이언트가 Delimited 형식을 기대할 수 있으므로 encodeDelimited를 사용합니다.
        const writer = HMIInfoPb.encodeDelimited(messageObject);
        const modifiedBuffer = writer.finish();


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