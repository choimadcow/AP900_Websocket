import asyncio
import os
import time
import pprint

from websockets.asyncio.client import connect
from websockets.asyncio.server import serve, ServerConnection
from HMI_T_Proto import HMI_T_pb2
from google.protobuf import json_format

import base64

# Get the absolute path of the directory where the script is located
script_dir = os.path.dirname(os.path.abspath(__file__))
# Construct the full path for WS_read.out
ws_read_out_path = os.path.join(script_dir, 'WS_out 202506231459.out')

async def recv_ws():
    uri = "ws://localhost:48625" # "ws://192.168.0.8:48624"
    async with connect(uri) as ws:
        file_out = open('WS_out.out', "w")
        try:
            while ws.open:
                buf = await ws.recv()
                file_out.write(base64.b64encode(buf).decode())
                file_out.write('\n')
                hmi_info = HMI_T_pb2.HMIInfoPb()
                hmi_info.ParseFromString(buf)
                print(hmi_info)
        finally:
            file_out.close()

async def read_file_json(ws: ServerConnection):
    file_in = open(ws_read_out_path, "r")
    new_line = True
    while new_line:
        a_line = file_in.readline()
        new_line = True if len(a_line) > 0 else False
        if not new_line:
            break
        buf = base64.b64decode(a_line)
        
        hmi_info = HMI_T_pb2.HMIInfoPb()
        hmi_info.ParseFromString(buf)
        
        # HMIInfoPb 객체를 JSON 문자열로 변환
        json_string = json_format.MessageToJson(
            hmi_info,
            preserving_proto_field_name=True,
            indent=0
        ).replace("\n", "").replace(" ", "")
        
        await ws.send(json_string)
        
        print(f"control : {pprint.pformat(hmi_info.dispInfo.controlInfo)}")
        print(f"road : {pprint.pformat(hmi_info.dispInfo.roadInfo)}")
        print(f"target : {pprint.pformat(hmi_info.dispInfo.targetInfo)}")
        if hmi_info.event.eventType == HMI_T_pb2.EventType.DriverMessage:
           print(hmi_info)
        await asyncio.sleep(0.1)
        
    file_in.close()
    await ws.close()

async def read_file_proto(ws: ServerConnection):
    file_in = open(ws_read_out_path, "r")
    new_line = True
    while new_line:
        a_line = file_in.readline()
        new_line = True if len(a_line) > 0 else False
        if not new_line:
            break
        buf = base64.b64decode(a_line)
        
        # Protobuf 바이너리 데이터를 직접 전송
        await ws.send(buf)
        
        hmi_info = HMI_T_pb2.HMIInfoPb()
        hmi_info.ParseFromString(buf)
        
        print(f"control : {pprint.pformat(hmi_info.dispInfo.controlInfo)}")
        print(f"road : {pprint.pformat(hmi_info.dispInfo.roadInfo)}")
        print(f"target : {pprint.pformat(hmi_info.dispInfo.targetInfo)}")
        if hmi_info.event.eventType == HMI_T_pb2.EventType.DriverMessage:
           print(hmi_info)
        await asyncio.sleep(0.1)
        
    file_in.close()
    await ws.close()

async def send_ws_json():
    print("Starting JSON WebSocket server on port 48625...")
    async with serve(read_file_json, "", 48625) as server:
        await server.serve_forever()

async def send_ws_proto():
    print("Starting Protobuf WebSocket server on port 48626...")
    async with serve(read_file_proto, "", 48626) as server:
        await server.serve_forever()

if __name__ == "__main__":
    # JSON 데이터를 48625 포트로 전송하려면 아래 주석을 해제하세요.
    asyncio.run(send_ws_json())

    # Protobuf 바이너리 데이터를 48626 포트로 전송하려면 아래 주석을 해제하세요。
    # asyncio.run(send_ws_proto())

    # 웹소켓 서버로부터 데이터를 수신하려면 아래 주석을 해제하세요。
    # asyncio.run(recv_ws())
