import * as fs from 'fs';
import * as path from 'path';
import * as protobuf from 'protobufjs';
import { WebSocket } from 'ws';

// .proto 파일 로딩 (최초 1회만 실행)
const protoPath = path.join(__dirname, '../ws_test_code_20250623/HMI_T_Proto/HMI-T.proto'); // .proto 파일 경로 (상대 경로 주의)
let root: protobuf.Root;
let HMIInfoPb: protobuf.Type;

try {
    root = protobuf.loadSync(protoPath);
    HMIInfoPb = root.lookupType("HMI-T.proto.HMIInfoPb");
} catch (e) {
    console.error("Error loading .proto file:", e);
}

// .out 파일들이 있는 디렉토리 경로
const outFilesDirectory = path.join(__dirname, '../ws_test_code_20250623');

/**
 * .out 파일을 읽고, 데이터를 수정한 뒤, 연결된 모든 웹소켓 클라이언트에게 전송합니다.
 * @param clients - 전송 대상인 웹소켓 클라이언트 Set
 * @param outFileName - 읽어올 .out 파일 이름 (예: 'WS_read.out')
 * @param maneuver - 추가하거나 변경할 TBT maneuver 값 (예: 'LEFT', 'RIGHT')
 */
export const createAndBroadcastProtoData = (clients: Set<WebSocket>, outFileName: string, maneuver?: string) => {
    if (!HMIInfoPb) {
        console.error(".proto types not loaded. Cannot send data.");
        return;
    }

    const filePath = path.join(outFilesDirectory, outFileName);

    try {
        // 1. .out 파일 읽기 (바이너리 Buffer)
        const fileBuffer = fs.readFileSync(filePath);

        // 2. 바이너리 데이터를 JavaScript 객체로 디코딩
        const decodedMessage = HMIInfoPb.decode(fileBuffer);
        const messageObject = HMIInfoPb.toObject(decodedMessage, {
            longs: String,
            enums: String,
            bytes: String,
        });

        // 3. 데이터 수정 (maneuver 값이 주어진 경우)
        if (maneuver && messageObject.dispInfo && messageObject.dispInfo.TurnByTurnInfo) {
            console.log(`Maneuver 변경: ${messageObject.dispInfo.TurnByTurnInfo.maneuver} -> ${maneuver}`);
            messageObject.dispInfo.TurnByTurnInfo.maneuver = maneuver;
        }

        // 4. 수정된 JavaScript 객체를 다시 바이너리 데이터로 인코딩
        const modifiedBuffer = HMIInfoPb.encode(HMIInfoPb.create(messageObject)).finish();

        // 5. 연결된 모든 클라이언트에게 수정된 바이너리 데이터 전송
        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(modifiedBuffer);
            }
        });

        console.log(`'${outFileName}' 파일 기반의 Proto 데이터 (${modifiedBuffer.length} bytes)를 모든 클라이언트에게 전송했습니다.`);

    } catch (error) {
        console.error(`'${filePath}' 처리 중 오류 발생:`, error);
    }
};
