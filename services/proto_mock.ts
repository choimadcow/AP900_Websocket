import * as fs from 'fs';
import * as path from 'path';
import { WebSocket } from 'ws';

// .out 파일들이 있는 디렉토리 경로
const outFilesDirectory = path.join(__dirname, '../../ws_test_code_20250623');

/**
 * .out 파일을 원본 그대로 읽어서, 연결된 모든 웹소켓 클라이언트에게 바이너리 데이터로 전송합니다.
 * @param clients - 전송 대상인 웹소켓 클라이언트 Set
 * @param outFileName - 읽어올 .out 파일 이름 (예: 'WS_read.out')
 */
export const broadcastRawProtoFile = (clients: Set<WebSocket>, outFileName: string) => {
    const filePath = path.join(outFilesDirectory, outFileName);

    try {
        // 1. .out 파일을 바이너리 Buffer 형태로 원본 그대로 읽습니다.
        const fileBuffer = fs.readFileSync(filePath);

        if (fileBuffer.length === 0) {
            console.error(`'${outFileName}' 파일이 비어있습니다.`);
            return;
        }

        // 2. 연결된 모든 클라이언트에게 읽어온 Buffer를 그대로 전송합니다.
        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(fileBuffer);
            }
        });

        console.log(`'${outFileName}' 파일 원본 (${fileBuffer.length} bytes)을 모든 클라이언트에게 전송했습니다.`);

    } catch (error) {
        console.error(`'${filePath}' 파일을 읽거나 전송하는 중 오류 발생:`, error);
    }
};
