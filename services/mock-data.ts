// 상행/하행 구분 상수 (DBService2.js와 동일)
const DIRECTION = {
    UPWARD: { name: "상행", startIdx: 1, endIdx: 15 },      // 카이스트 → 세종터미널
    DOWNWARD: { name: "하행", startIdx: 16, endIdx: 29 }    // 세종터미널 → 원자력안전기술원
};

const tempDatas = [
    // 상행: 카이스트 → 세종고속시외버스터미널 (15개, idx 1-15)
    {
        "idx": 1,
        "stationKor": "카이스트",
        "stationEng": "KAIST",
        "infoKor": "카이스트",
        "infoEng": "KAIST",
        "soundFile": "sound.wav",
        "idxName": "42850",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 2,
        "stationKor": "대전지방기상청",
        "stationEng": "Daejeon Regional Meteorological Administration",
        "infoKor": "대전지방기상청",
        "infoEng": "Daejeon Regional Meteorological Administration",
        "soundFile": "sound.wav",
        "idxName": "42900",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 3,
        "stationKor": "신세계백화점",
        "stationEng": "Shinsegae Department Store",
        "infoKor": "신세계백화점",
        "infoEng": "Shinsegae Department Store",
        "soundFile": "sound.wav",
        "idxName": "43240",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 4,
        "stationKor": "대전컨벤션센터",
        "stationEng": "Daejeon Convention Center",
        "infoKor": "대전컨벤션센터",
        "infoEng": "Daejeon Convention Center",
        "soundFile": "sound.wav",
        "idxName": "43270",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 5,
        "stationKor": "싸이언스빌3가",
        "stationEng": "Sciencevil 3-ga",
        "infoKor": "싸이언스빌3가",
        "infoEng": "Sciencevil 3-ga",
        "soundFile": "sound.wav",
        "idxName": "46110",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 6,
        "stationKor": "KAIST문지캠퍼스",
        "stationEng": "KAIST Munji Campus",
        "infoKor": "KAIST문지캠퍼스",
        "infoEng": "KAIST Munji Campus",
        "soundFile": "sound.wav",
        "idxName": "44030",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 7,
        "stationKor": "대덕고등학교",
        "stationEng": "Daedeok High School",
        "infoKor": "대덕고등학교",
        "infoEng": "Daedeok High School",
        "soundFile": "sound.wav",
        "idxName": "43160",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 8,
        "stationKor": "과학기술연합대학원(UST)",
        "stationEng": "University of Science and Technology",
        "infoKor": "과학기술연합대학원(UST)",
        "infoEng": "University of Science and Technology",
        "soundFile": "sound.wav",
        "idxName": "43090",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 9,
        "stationKor": "한국화학연구원",
        "stationEng": "Korea Research Institute of Chemical Technology",
        "infoKor": "한국화학연구원",
        "infoEng": "Korea Research Institute of Chemical Technology",
        "soundFile": "sound.wav",
        "idxName": "43060",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 10,
        "stationKor": "하나아파트",
        "stationEng": "Hana Apartment",
        "infoKor": "하나아파트",
        "infoEng": "Hana Apartment",
        "soundFile": "sound.wav",
        "idxName": "43000",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 11,
        "stationKor": "송림마을5,6단지",
        "stationEng": "Songnim Village Complex 5,6",
        "infoKor": "송림마을5,6단지",
        "infoEng": "Songnim Village Complex 5,6",
        "soundFile": "sound.wav",
        "idxName": "43630",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 12,
        "stationKor": "송림마을3단지",
        "stationEng": "Songnim Village Complex 3",
        "infoKor": "송림마을3단지",
        "infoEng": "Songnim Village Complex 3",
        "soundFile": "sound.wav",
        "idxName": "43610",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 13,
        "stationKor": "지족역",
        "stationEng": "Jijok Station",
        "infoKor": "지족역",
        "infoEng": "Jijok Station",
        "soundFile": "sound.wav",
        "idxName": "42430",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 14,
        "stationKor": "반석역",
        "stationEng": "Banseok Station",
        "infoKor": "반석역",
        "infoEng": "Banseok Station",
        "soundFile": "sound.wav",
        "idxName": "43980",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 15,
        "stationKor": "세종고속시외버스터미널",
        "stationEng": "Sejong Express Bus Terminal",
        "infoKor": "세종고속시외버스터미널",
        "infoEng": "Sejong Express Bus Terminal",
        "soundFile": "sound.wav",
        "idxName": "51052",
        "lineImg": "station1.PNG"
    },

    // 하행: 세종고속시외버스터미널 → 원자력안전기술원 (14개, idx 16-29)
    {
        "idx": 16,
        "stationKor": "세종고속시외버스터미널",
        "stationEng": "Sejong Express Bus Terminal",
        "infoKor": "세종고속시외버스터미널",
        "infoEng": "Sejong Express Bus Terminal",
        "soundFile": "sound.wav",
        "idxName": "51053",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 17,
        "stationKor": "반석역",
        "stationEng": "Banseok Station",
        "infoKor": "반석역",
        "infoEng": "Banseok Station",
        "soundFile": "sound.wav",
        "idxName": "43970",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 18,
        "stationKor": "하기중학교",
        "stationEng": "Hagi Middle School",
        "infoKor": "하기중학교",
        "infoEng": "Hagi Middle School",
        "soundFile": "sound.wav",
        "idxName": "43600",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 19,
        "stationKor": "송림마을5.6단지",
        "stationEng": "Songnim Village Complex 5.6",
        "infoKor": "송림마을5.6단지",
        "infoEng": "Songnim Village Complex 5.6",
        "soundFile": "sound.wav",
        "idxName": "43640",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 20,
        "stationKor": "하나아파트",
        "stationEng": "Hana Apartment",
        "infoKor": "하나아파트",
        "infoEng": "Hana Apartment",
        "soundFile": "sound.wav",
        "idxName": "43010",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 21,
        "stationKor": "한국에너지기술연구원",
        "stationEng": "Korea Institute of Energy Research",
        "infoKor": "한국에너지기술연구원",
        "infoEng": "Korea Institute of Energy Research",
        "soundFile": "sound.wav",
        "idxName": "43070",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 22,
        "stationKor": "한국전자통신연구원",
        "stationEng": "Electronics and Telecommunications Research Institute",
        "infoKor": "한국전자통신연구원",
        "infoEng": "Electronics and Telecommunications Research Institute",
        "soundFile": "sound.wav",
        "idxName": "43080",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 23,
        "stationKor": "대덕고등학교",
        "stationEng": "Daedeok High School",
        "infoKor": "대덕고등학교",
        "infoEng": "Daedeok High School",
        "soundFile": "sound.wav",
        "idxName": "43200",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 24,
        "stationKor": "문지네거리",
        "stationEng": "Munji Intersection",
        "infoKor": "문지네거리",
        "infoEng": "Munji Intersection",
        "soundFile": "sound.wav",
        "idxName": "44050",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 25,
        "stationKor": "원촌삼거리",
        "stationEng": "Wonchon 3-way",
        "infoKor": "원촌삼거리",
        "infoEng": "Wonchon 3-way",
        "soundFile": "sound.wav",
        "idxName": "44270",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 26,
        "stationKor": "MBC/TJB방송국",
        "stationEng": "MBC/TJB Broadcasting Station",
        "infoKor": "MBC/TJB방송국",
        "infoEng": "MBC/TJB Broadcasting Station",
        "soundFile": "sound.wav",
        "idxName": "43330",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 27,
        "stationKor": "신세계백화점",
        "stationEng": "Shinsegae Department Store",
        "infoKor": "신세계백화점",
        "infoEng": "Shinsegae Department Store",
        "soundFile": "sound.wav",
        "idxName": "42440",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 28,
        "stationKor": "대전지방기상청",
        "stationEng": "Daejeon Regional Meteorological Administration",
        "infoKor": "대전지방기상청",
        "infoEng": "Daejeon Regional Meteorological Administration",
        "soundFile": "sound.wav",
        "idxName": "42890",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 29,
        "stationKor": "원자력안전기술원",
        "stationEng": "Korea Institute of Nuclear Safety",
        "infoKor": "원자력안전기술원",
        "infoEng": "Korea Institute of Nuclear Safety",
        "soundFile": "sound.wav",
        "idxName": "42860",
        "lineImg": "station1.PNG"
    }
];

interface MockData {
    dispInfo: {
        gpsInfo: {
            xM: number,
            yM: number,
            zM: number,
            heading: number
            // latitude: number;
            // longitude: number;
        };
        egoInfo: {
            egoVehicleSpeedMps: number;
            energyLevel: number;
            gear: number;
            brake: number;
            turnSignal: number;
            steeringAngleDeg: number;
        };
        objectInfos: {
            objectID: number;
            objectType: number; // 0: Vehicle, 1: Pedestrian, 2: Bike
            box_point_0: { x: number, y: number };
            box_point_1: { x: number, y: number };
            box_point_2: { x: number, y: number };
            box_point_3: { x: number, y: number };
        }[];
        roadInfo: {};
        localPath: {};
        extraInfos: string[];
        controlInfo: {
            operation_mode: number;
            system_off_reason: number;
            auto_available: boolean;
            sensor_status: number;
        };
        laneChange: {
            direction: number;
            process: number;
        };
        TurnByTurnInfo: {
            maneuver: string;
            distance: number;
        };
        vehicleID: string;
        messageTime: number;
        targetInfo: {
            targetAvailable: boolean;
        };
    };
    event: {
        eventType: number;
        Content: string;
    };
    isStationChanged: boolean;
    isStation: boolean;
    isPedestrian: boolean;
}

// SENSOR_FAIL_CODES 정의
export const SENSOR_FAIL_CODES = {
    FAULT_NONE: 0x00000000,
    CONTROL_SYSTEM_FAIL: 0x00000001, // 2^0
    VISION_SYSTEM_FAIL: 0x00000002, // 2^1 (인식)
    VISION_CAMERA_FAIL: 0x00000004, // 2^2 (카메라)
    VISION_GPS_FAIL: 0x00000008, // 2^3 (GPS)
    VISION_CAN_FAIL: 0x00000010, // 2^4 (제어)
    VISION_NTRIP_FAIL: 0x00000020, // 2^5 (GPS)
    VISION_LIDAR_FAIL: 0x00000040, // 2^6 (LIDAR/Radar)
    VISION_TLR_FAIL: 0x00000080, // 2^7 (인식)
    VISION_DETECTOR_FAIL: 0x00000100, // 2^8 (인식)
    VISION_LOC_INIT_FAIL: 0x00000200, // 2^9 (인식)
    DEVIATE_ROUTE: 0x00000400, // 2^10 (판단)
    GPP_FAIL: 0x00000800, // 2^11 (판단)
    SCHOOL_ZONE_OVERRIDE: 0x00001000, // 2^12
    INTERNET_FAIL: 0x00002000, // 2^13 (임의 할당)
    V2I_FAIL: 0x00004000, // 2^14 (임의 할당)
};

let lastMockData: MockData | null = null;

export const createMockData = (isContinuous?: boolean, forceStationChanged?: boolean): MockData => {
    if (!isContinuous) {
        const randomNumber = Math.floor(Math.random() * tempDatas.length);
        const thisStop = tempDatas[randomNumber];

        // 방향 판단 (상행: 1-15, 하행: 16-29)
        let isForward: boolean;
        let nextStop: any = null;

        if (thisStop.idx >= DIRECTION.UPWARD.startIdx && thisStop.idx <= DIRECTION.UPWARD.endIdx) {
            // 상행 (카이스트 → 세종터미널): idx가 증가하는 방향이 정방향
            isForward = thisStop.idx < DIRECTION.UPWARD.endIdx;
            if (isForward) {
                nextStop = tempDatas.find(s => s.idx === thisStop.idx + 1);
            } else {
                nextStop = thisStop; // 종점인 경우 자기 자신
            }
        } else if (thisStop.idx >= DIRECTION.DOWNWARD.startIdx && thisStop.idx <= DIRECTION.DOWNWARD.endIdx) {
            // 하행 (세종터미널 → 원자력안전기술원): idx가 증가하는 방향이 정방향
            isForward = thisStop.idx < DIRECTION.DOWNWARD.endIdx;
            if (isForward) {
                nextStop = tempDatas.find(s => s.idx === thisStop.idx + 1);
            } else {
                nextStop = thisStop; // 종점인 경우 자기 자신
            }
        } else {
            // 예외: 범위 밖 idx
            isForward = true;
            nextStop = thisStop;
        }

        // 다음 정류장이 없으면 자기 자신 (안전장치)
        if (!nextStop) {
            nextStop = thisStop;
        }

        lastMockData = {
            dispInfo: {
                gpsInfo: {
                    // 위치 정보 (테스트용 TM 좌표 혹은 위경도 좌표)
                    xM: +(127.38 + Math.random() * 0.01).toFixed(7),
                    yM: +(36.35 + Math.random() * 0.01).toFixed(7),  // latitude를 yM으로
                    zM: +(Math.random() * 50).toFixed(2),
                    heading: +(Math.random() * 360).toFixed(2)      // heading 추가
                    // latitude: +(36.35 + Math.random() * 0.01).toFixed(7),
                    // longitude: +(127.38 + Math.random() * 0.01).toFixed(7)

                },
                egoInfo: {
                    // 차량 속도 (m/s), 배터리 잔량, 기어 상태 (ASCII), 브레이크 여부, 방향지시등, 핸들 각도
                    egoVehicleSpeedMps: +(Math.random() * 100).toFixed(2),
                    energyLevel: +(Math.random()).toFixed(2),
                    gear: ["P", "R", "N", "D"][Math.floor(Math.random() * 4)].charCodeAt(0),
                    brake: Math.round(Math.random()),
                    turnSignal: Math.floor(Math.random() * 3), // 0: 없음, 1: 좌, 2: 우
                    steeringAngleDeg: +(Math.random() * 20 - 10).toFixed(1)
                },
                extraInfos: [
                    JSON.stringify({
                        thisStop: thisStop.idxName,
                        thisStopDist: +(Math.random() * 0.5).toFixed(3),
                        nextStop: nextStop.idxName
                    })
                ],
                objectInfos: [
                    ...Array.from({length: Math.floor(Math.random() * 3) + 1}, () => ({
                        objectID: Math.floor(Math.random() * 1000),
                        objectType: Math.floor(Math.random() * 3),
                        box_point_0: {x: +(Math.random() * 10 - 5).toFixed(2), y: +(Math.random() * 20).toFixed(2)},
                        box_point_1: {x: +(Math.random() * 10 - 5).toFixed(2), y: +(Math.random() * 20).toFixed(2)},
                        box_point_2: {x: +(Math.random() * 10 - 5).toFixed(2), y: +(Math.random() * 20).toFixed(2)},
                        box_point_3: {x: +(Math.random() * 10 - 5).toFixed(2), y: +(Math.random() * 20).toFixed(2)},
                    }))
                ],
                roadInfo: {
                    trafficType: [1, 2, 4, 8, 16][Math.floor(Math.random() * 5)] // 예시 신호등 값
                },
                localPath: {
                    path: Array.from({length: 10}, (_, i) => ({ // 예시: 10개 좌표로 구성된 경로
                        x: +(i * 2).toFixed(2),
                        y: +(Math.sin(i) * 2).toFixed(2)
                    }))
                },
                controlInfo: {
                    // 자율/수동 상태, 오류 여부, 자율 가능 여부
                    operation_mode: lastMockData ? lastMockData.dispInfo.controlInfo.operation_mode : 0, // 1: 자율, 0: 수동
                    system_off_reason: 0, // NONE
                    auto_available: Math.random() > 0.1,
                    sensor_status: lastMockData ? lastMockData.dispInfo.controlInfo.sensor_status : SENSOR_FAIL_CODES.FAULT_NONE
                },
                laneChange: {
                    // 차선 변경 상태
                    direction: Math.floor(Math.random() * 3), // 0: 없음, 1: 좌, 2: 우
                    process: Math.floor(Math.random() * 3)    // 0: READY, 1: BLOCKED, 2: CHANGING
                },
                TurnByTurnInfo: {
                    // 내비게이션 방향 + 거리 (m)
                    maneuver: ["LEFT", "RIGHT", "STRAIGHT", "TURN"][Math.floor(Math.random() * 4)],
                    distance: +(Math.random() * 300).toFixed(0)
                },
                vehicleID: "TEST-BUS-001",
                messageTime: Date.now(),
                targetInfo: {
                    targetAvailable: Math.random() > 0.5
                }
            },
            event: lastMockData ? lastMockData!.event : {
                eventType: 129, // OperatorInput
                Content: JSON.stringify({
                    type: ["PassengerCountUpdate", "TakeOverReason", "BusOperation"][
                        Math.floor(Math.random() * 3)
                        ],
                    value: (() => {
                        const choice = Math.floor(Math.random() * 3);
                        if (choice === 0) return Math.floor(Math.random() * 30); // 승객 수
                        if (choice === 1) return "긴급정지";
                        return ["AUTO_BTN_PRESSED", "SYSTEM_RESET_PRESSED", "BEGIN_OPERATION"][
                            Math.floor(Math.random() * 3)
                            ];
                    })()
                })
            },
            isStationChanged: true,
            isStation: Math.random() >= 0.5,
            isPedestrian: Math.random() >= 0.5
        };
    } else if (lastMockData) {
        // 연속 송신 시 ego 상태만 업데이트
        lastMockData.dispInfo.egoInfo = {
            egoVehicleSpeedMps: +(Math.random() * 100).toFixed(2),
            energyLevel: +(Math.random()).toFixed(2),
            gear: ["P", "R", "N", "D"][Math.floor(Math.random() * 4)].charCodeAt(0),
            brake: Math.round(Math.random()),
            turnSignal: Math.floor(Math.random() * 3),
            steeringAngleDeg: +(Math.random() * 20 - 10).toFixed(1)
        };
        lastMockData.dispInfo.TurnByTurnInfo = {
            maneuver: ["LEFT", "RIGHT", "STRAIGHT", "TURN"][Math.floor(Math.random() * 4)],
            distance: +(Math.random() * 999).toFixed(0)
        };
        lastMockData.dispInfo.messageTime = Date.now();
        lastMockData.isStationChanged = forceStationChanged ?? false;
        lastMockData.dispInfo.controlInfo.sensor_status = lastMockData ? lastMockData.dispInfo.controlInfo.sensor_status : SENSOR_FAIL_CODES.FAULT_NONE
    } else {
        console.warn("No previous data. Generating fresh.");
        return createMockData(false);
    }

    return lastMockData;
};

export const changeDriveMode = (autoMode: boolean): MockData => {
    if (!lastMockData) {
        createMockData(false);
    }

    lastMockData!.dispInfo.controlInfo.operation_mode = autoMode ? 1 : 0;
    lastMockData!.dispInfo.controlInfo.sensor_status = lastMockData ? lastMockData.dispInfo.controlInfo.sensor_status : SENSOR_FAIL_CODES.FAULT_NONE

    return lastMockData!;
};

export const changeStatus = (statusCode: number, turnOn: boolean): MockData => {
    if (!lastMockData) {
        // lastMockData가 null이면 새로운 데이터를 생성합니다.
        createMockData(false);
    }

    if (turnOn) {
        // 해당 비트를 켭니다.
        lastMockData!.dispInfo.controlInfo.sensor_status |= statusCode;
    } else {
        // 해당 비트를 끕니다.
        lastMockData!.dispInfo.controlInfo.sensor_status &= ~statusCode;
    }

    return lastMockData!;
}

export const createDriverMessageEvent = (icon: string, message: string): MockData => {
    if (!lastMockData) {
        // lastMockData가 없으면 기본 데이터 생성
        createMockData(false);
    }

    const driverMessageEvent = {
        eventType: 2, // DriverMessage
        Content: JSON.stringify({
            icon: icon,
            content: message
        })
    };

    // lastMockData를 기반으로 새로운 이벤트 객체를 포함한 MockData 생성
    const newMockData: MockData = {
        ...lastMockData!, // 기존 데이터 복사
        event: driverMessageEvent, // 이벤트 부분만 교체
        dispInfo: {
            ...lastMockData!.dispInfo,
            messageTime: Date.now() // 메시지 시간 갱신
        }
    };

    lastMockData = newMockData; // lastMockData 업데이트
    return newMockData;
}

export const changeSpeed = (newSpeed: number): MockData => {
    if (!lastMockData) {
        createMockData(false);
    }

    lastMockData!.dispInfo.egoInfo.egoVehicleSpeedMps = newSpeed;
    lastMockData!.dispInfo.messageTime = Date.now();

    return lastMockData!;
};

export const changeLaneChange = (direction: number, process: number): MockData => {
    if (!lastMockData) {
        createMockData(false);
    }

    lastMockData!.dispInfo.laneChange.direction = direction;
    lastMockData!.dispInfo.laneChange.process = process;
    lastMockData!.dispInfo.messageTime = Date.now();

    return lastMockData!;
};