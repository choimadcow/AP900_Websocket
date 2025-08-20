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

        // HMIInfoPb 메시지의 첫 번째 필드(dispInfo, id=1, wire type 2)의 태그 값은 (1 << 3) | 2 = 0x0A 입니다.
        // 이 값을 기준으로 파일 내에서 메시지 시작 위치를 검색합니다.
        const startTag = 0x0A;

        for (let i = 0; i < fileBuffer.length; i++) {
            // startTag를 찾으면 해당 위치를 잠재적인 시작점으로 간주합니다.
            if (fileBuffer[i] === startTag) {
                const startIndex = i;
                // 디버깅을 위해 주변 20바이트의 16진수 데이터를 출력합니다.
                const hexData = fileBuffer.slice(startIndex, startIndex + 20).toString('hex').match(/.{1,2}/g)?.join(' ');
                console.log(`[DEBUG] Found potential message start tag 0x${startTag.toString(16)} at offset ${startIndex}. Data: [ ${hexData} ]`);

                try {
                    // 찾은 시작 위치부터 버퍼를 잘라내어 디코딩을 시도합니다.
                    const messageBuffer = fileBuffer.slice(startIndex);
                    const tempMessage = HMIInfoPb.decode(messageBuffer);

                    if (tempMessage && Object.keys(tempMessage.toJSON()).length > 0) {
                        decodedMessage = tempMessage;
                        console.log(`[SUCCESS] Successfully decoded a non-empty message starting from offset ${startIndex}.`);
                        break; // 유효한 메시지를 찾았으므로 검색을 중단합니다.
                    }
                } catch (e) {
                    // 디코딩에 실패하면, 다음 시작 태그를 찾아 계속 진행합니다.
                    console.log(`[INFO] Decoding failed at offset ${startIndex}, continuing search... Error: ${e}`);
                }
            }
        }

        if (!decodedMessage) {
            console.error("[ERROR] Failed to find and decode any valid message from the file. Please check if the .proto schema matches the binary data file.");
            return;
        }

        console.log('[SUCCESS] Final decoded message object (JSON):', JSON.stringify(decodedMessage.toJSON(), null, 2));

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
