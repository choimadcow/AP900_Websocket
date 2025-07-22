const tempDatas = [
    {
        "idx": 1,
        "stationKor": "카이스트",
        "stationEng": "KAIST",
        "infoKor": "카이스트",
        "infoEng": "KAIST",
        "soundFile": "sound.wav",
        "idxName": "카이스트",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 2,
        "stationKor": "구성삼거리",
        "stationEng": "Guseong Samgeori (Guseong Junction)",
        "infoKor": "구성삼거리",
        "infoEng": "Guseong Samgeori (Guseong Junction)",
        "soundFile": "sound.wav",
        "idxName": "구성삼거리",
        "lineImg": "station2.PNG"
    },
    {
        "idx": 3,
        "stationKor": "대전지방기상청",
        "stationEng": "Daejeon Regional Meteorological Administration",
        "infoKor": "대전지방기상청",
        "infoEng": "Daejeon Regional Meteorological Administration",
        "soundFile": "sound.wav",
        "idxName": "대전지방기상청",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 4,
        "stationKor": "보건환경연구원",
        "stationEng": "Institute of Health and Environment",
        "infoKor": "보건환경연구원",
        "infoEng": "Institute of Health and Environment",
        "soundFile": "sound.wav",
        "idxName": "보건환경연구원",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 5,
        "stationKor": "국립중앙과학관",
        "stationEng": "National Science Museum",
        "infoKor": "국립중앙과학관",
        "infoEng": "National Science Museum",
        "soundFile": "sound.wav",
        "idxName": "국립중앙과학관",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 6,
        "stationKor": "신세계백화점",
        "stationEng": "Shinsegae Department Store",
        "infoKor": "신세계백화점",
        "infoEng": "Shinsegae Department Store",
        "soundFile": "sound.wav",
        "idxName": "신세계백화점",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 7,
        "stationKor": "대전컨벤션센터",
        "stationEng": "Daejeon Convention Center",
        "infoKor": "대전컨벤션센터",
        "infoEng": "Daejeon Convention Center",
        "soundFile": "sound.wav",
        "idxName": "대전컨벤션센터",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 8,
        "stationKor": "MBC/TJB방송국",
        "stationEng": "MBC/TJB Broadcasting Station",
        "infoKor": "MBC/TJB방송국",
        "infoEng": "MBC/TJB Broadcasting Station",
        "soundFile": "sound.wav",
        "idxName": "MBC/TJB방송국",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 9,
        "stationKor": "원촌동솔로몬로파크",
        "stationEng": "Wonchon-dong Solomon Law Park",
        "infoKor": "원촌동솔로몬로파크",
        "infoEng": "Wonchon-dong Solomon Law Park",
        "soundFile": "sound.wav",
        "idxName": "원촌동솔로몬로파크",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 10,
        "stationKor": "원촌사거리",
        "stationEng": "Wonchon Intersection",
        "infoKor": "원촌사거리",
        "infoEng": "Wonchon Intersection",
        "soundFile": "sound.wav",
        "idxName": "원촌사거리",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 11,
        "stationKor": "싸이언스빌3가",
        "stationEng": "Science Ville 3-ga",
        "infoKor": "싸이언스빌3가",
        "infoEng": "Science Ville 3-ga",
        "soundFile": "sound.wav",
        "idxName": "싸이언스빌3가",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 12,
        "stationKor": "문지네거리",
        "stationEng": "Munji Intersection",
        "infoKor": "문지네거리",
        "infoEng": "Munji Intersection",
        "soundFile": "sound.wav",
        "idxName": "문지네거리",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 13,
        "stationKor": "KAIST 문지캠퍼스",
        "stationEng": "KAIST Munji Campus",
        "infoKor": "KAIST 문지캠퍼스",
        "infoEng": "KAIST Munji Campus",
        "soundFile": "sound.wav",
        "idxName": "KAIST 문지캠퍼스",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 14,
        "stationKor": "전력연구원",
        "stationEng": "KEPCO Research Institute (KEPRI)",
        "infoKor": "전력연구원",
        "infoEng": "KEPCO Research Institu",
        "soundFile": "sound.wav",
        "idxName": "전력연구원",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 15,
        "stationKor": "대덕고등학교",
        "stationEng": "Daedeok High School",
        "infoKor": "대덕고등학교",
        "infoEng": "Daedeok High School",
        "soundFile": "sound.wav",
        "idxName": "대덕고등학교",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 16,
        "stationKor": "연구단지네거리",
        "stationEng": "Yeongudanji Intersection",
        "infoKor": "연구단지네거리",
        "infoEng": "Yeongudanji Intersection",
        "soundFile": "sound.wav",
        "idxName": "연구단지네거리",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 17,
        "stationKor": "한국표준과학연구원",
        "stationEng": "Korea Research Institute of Standards and Science (KRISS)",
        "infoKor": "한국표준과학연구원",
        "infoEng": "KRISS",
        "soundFile": "sound.wav",
        "idxName": "한국표준과학연구원",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 18,
        "stationKor": "과학기술연합대학원(UST)",
        "stationEng": "University of Science and Technology (UST)",
        "infoKor": "과학기술연합대학원",
        "infoEng": "UST",
        "soundFile": "sound.wav",
        "idxName": "과학기술연합대학원(UST)",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 19,
        "stationKor": "LG생활건강기술연구원",
        "stationEng": "LG Household & Health Care R&D Center",
        "infoKor": "LG생활건강기술연구원",
        "infoEng": "LG H&H R&D Center",
        "soundFile": "sound.wav",
        "idxName": "LG생활건강기술연구원",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 20,
        "stationKor": "한국화학연구원",
        "stationEng": "Korea Research Institute of Chemical Technology (KRICT)",
        "infoKor": "한국화학연구원",
        "infoEng": "KRICT",
        "soundFile": "sound.wav",
        "idxName": "한국화학연구원",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 21,
        "stationKor": "한화솔루션중앙연구소",
        "stationEng": "Hanwha Solutions Central Research Institute",
        "infoKor": "한화솔루션중앙연구소",
        "infoEng": "Hanwha Solutions Central Research Institute",
        "soundFile": "sound.wav",
        "idxName": "한화솔루션중앙연구소",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 22,
        "stationKor": "하나아파트",
        "stationEng": "Hana Apartments",
        "infoKor": "하나아파트",
        "infoEng": "Hana Apartments",
        "soundFile": "sound.wav",
        "idxName": "하나아파트",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 23,
        "stationKor": "유성구노인복지관",
        "stationEng": "Yuseong-gu Senior Welfare Center",
        "infoKor": "유성구노인복지관",
        "infoEng": "Yuseong-gu Senior Welfare Center",
        "soundFile": "sound.wav",
        "idxName": "유성구노인복지관",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 24,
        "stationKor": "하기동",
        "stationEng": "Hagi-dong",
        "infoKor": "하기동",
        "infoEng": "Hagi-dong",
        "soundFile": "sound.wav",
        "idxName": "하기동",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 25,
        "stationKor": "송림마을5.6단지",
        "stationEng": "Songnim Maeul Complex 5, 6",
        "infoKor": "송림마을5.6단지",
        "infoEng": "Songnim Maeul Complex 5, 6",
        "soundFile": "sound.wav",
        "idxName": "송림마을5.6단지",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 26,
        "stationKor": "송림마을3단지",
        "stationEng": "Songnim Maeul Complex 3",
        "infoKor": "송림마을3단지",
        "infoEng": "Songnim Maeul Complex 3",
        "soundFile": "sound.wav",
        "idxName": "송림마을3단지",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 27,
        "stationKor": "송림마을2단지",
        "stationEng": "Songnim Maeul Complex 2",
        "infoKor": "송림마을2단지",
        "infoEng": "Songnim Maeul Complex 2",
        "soundFile": "sound.wav",
        "idxName": "송림마을2단지",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 28,
        "stationKor": "지족역(반석역방면)",
        "stationEng": "Jijok Station (Banseok Station Direction)",
        "infoKor": "지족역",
        "infoEng": "Jijok Station",
        "soundFile": "sound.wav",
        "idxName": "지족역(반석역방면)",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 29,
        "stationKor": "송림마을1단지",
        "stationEng": "Songnim Maeul Complex 1",
        "infoKor": "송림마을1단지",
        "infoEng": "Songnim Maeul Complex 1",
        "soundFile": "sound.wav",
        "idxName": "송림마을1단지",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 30,
        "stationKor": "반석역",
        "stationEng": "Banseok Station",
        "infoKor": "반석역",
        "infoEng": "Banseok Station",
        "soundFile": "sound.wav",
        "idxName": "반석역",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 31,
        "stationKor": "세종고속시외버스터미널",
        "stationEng": "Sejong Express & Intercity Bus Terminal",
        "infoKor": "세종고속시외버스터미널",
        "infoEng": "Sejong Express & Intercity Bus Terminal",
        "soundFile": "sound.wav",
        "idxName": "세종고속시외버스터미널",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 32,
        "stationKor": "반석역",
        "stationEng": "Banseok Station",
        "infoKor": "반석역",
        "infoEng": "Banseok Station",
        "soundFile": "sound.wav",
        "idxName": "반석역",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 33,
        "stationKor": "극동방송/반석네거리",
        "stationEng": "Banseok Negeori",
        "infoKor": "반석네거리",
        "infoEng": "Banseok Negeori",
        "soundFile": "sound.wav",
        "idxName": "극동방송/반석네거리",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 34,
        "stationKor": "하기중학교 ",
        "stationEng": "Hagi Middle School",
        "infoKor": "하기중학교 ",
        "infoEng": "Hagi Middle School",
        "soundFile": "sound.wav",
        "idxName": "하기중학교 ",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 35,
        "stationKor": "송림마을4단지",
        "stationEng": "Songnim Maeul Complex 4",
        "infoKor": "송림마을4단지",
        "infoEng": "Songnim Maeul Complex 4",
        "soundFile": "sound.wav",
        "idxName": "송림마을4단지",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 36,
        "stationKor": "송림마을5.6단지",
        "stationEng": "Songnim Maeul Complex 5, 6",
        "infoKor": "송림마을5.6단지",
        "infoEng": "Songnim Maeul Complex 5, 6",
        "soundFile": "sound.wav",
        "idxName": "송림마을5.6단지",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 37,
        "stationKor": "하기동",
        "stationEng": "Hagi-dong",
        "infoKor": "하기동",
        "infoEng": "Hagi-dong",
        "soundFile": "sound.wav",
        "idxName": "하기동",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 38,
        "stationKor": "KT&G연구소",
        "stationEng": "KT&G Research Institute",
        "infoKor": "KT&G연구소",
        "infoEng": "KT&G Research Institute",
        "soundFile": "sound.wav",
        "idxName": "KT&G연구소",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 39,
        "stationKor": "하나아파트",
        "stationEng": "Hana Apartments",
        "infoKor": "하나아파트",
        "infoEng": "Hana Apartments",
        "soundFile": "sound.wav",
        "idxName": "하나아파트",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 40,
        "stationKor": "한화솔루션중앙연구소",
        "stationEng": "Hanwha Solutions Central Research Institute",
        "infoKor": "한화솔루션중앙연구소",
        "infoEng": "Hanwha Solutions Central Research Institute",
        "soundFile": "sound.wav",
        "idxName": "한화솔루션중앙연구소",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 41,
        "stationKor": "한국에너지기술연구원",
        "stationEng": "Korea Institute of Energy Research (KIER)",
        "infoKor": "한국에너지기술연구원",
        "infoEng": "Korea Institute of Energy Research (KIER)",
        "soundFile": "sound.wav",
        "idxName": "한국에너지기술연구원",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 42,
        "stationKor": "KT북대전지사",
        "stationEng": "KT North Daejeon Branch",
        "infoKor": "KT북대전지사",
        "infoEng": "KT North Daejeon Branch",
        "soundFile": "sound.wav",
        "idxName": "KT북대전지사",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 43,
        "stationKor": "한국전자통신연구원",
        "stationEng": "Electronics and Telecommunications Research Institute (ETRI)",
        "infoKor": "한국전자통신연구원",
        "infoEng": "ETRI",
        "soundFile": "sound.wav",
        "idxName": "한국전자통신연구원",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 44,
        "stationKor": "한국표준과학연구원",
        "stationEng": "Korea Research Institute of Standards and Science (KRISS)",
        "infoKor": "한국표준과학연구원",
        "infoEng": "KRISS",
        "soundFile": "sound.wav",
        "idxName": "한국표준과학연구원",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 45,
        "stationKor": "SK뷰아파트",
        "stationEng": "SK View Apartments",
        "infoKor": "SK뷰아파트",
        "infoEng": "SK View Apartments",
        "soundFile": "sound.wav",
        "idxName": "SK뷰아파트",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 46,
        "stationKor": "대덕고등학교",
        "stationEng": "Daedeok High School",
        "infoKor": "대덕고등학교",
        "infoEng": "Daedeok High School",
        "soundFile": "sound.wav",
        "idxName": "대덕고등학교",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 47,
        "stationKor": "대덕터널입구",
        "stationEng": "Daedeok Tunnel Entrance",
        "infoKor": "대덕터널입구",
        "infoEng": "Daedeok Tunnel Entrance",
        "soundFile": "sound.wav",
        "idxName": "대덕터널입구",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 48,
        "stationKor": "국립문화유산연구원",
        "stationEng": "National Research Institute of Cultural Heritage (NRICH)",
        "infoKor": "국립문화유산연구원",
        "infoEng": "NRICH",
        "soundFile": "sound.wav",
        "idxName": "국립문화유산연구원",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 49,
        "stationKor": "LG화학기술연구원",
        "stationEng": "LG Chem R&D Center",
        "infoKor": "LG화학기술연구원",
        "infoEng": "LG Chem R&D Center",
        "soundFile": "sound.wav",
        "idxName": "LG화학기술연구원",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 50,
        "stationKor": "문지네거리",
        "stationEng": "Munji Intersection",
        "infoKor": "문지네거리",
        "infoEng": "Munji Intersection",
        "soundFile": "sound.wav",
        "idxName": "문지네거리",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 51,
        "stationKor": "싸이언스빌3가",
        "stationEng": "Science Ville 3-ga",
        "infoKor": "싸이언스빌3가",
        "infoEng": "Science Ville 3-ga",
        "soundFile": "sound.wav",
        "idxName": "싸이언스빌3가",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 52,
        "stationKor": "원촌삼거리",
        "stationEng": "Wonchon Samgeori",
        "infoKor": "원촌삼거리",
        "infoEng": "Wonchon Samgeori",
        "soundFile": "sound.wav",
        "idxName": "원촌삼거리",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 53,
        "stationKor": "원촌동솔로몬로파크",
        "stationEng": "Wonchon-dong Solomon Law Park",
        "infoKor": "원촌동솔로몬로파크",
        "infoEng": "Wonchon-dong Solomon Law Park",
        "soundFile": "sound.wav",
        "idxName": "원촌동솔로몬로파크",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 54,
        "stationKor": "MBC/TJB 방송국",
        "stationEng": "MBC/TJB Broadcasting Station",
        "infoKor": "MBC/TJB 방송국",
        "infoEng": "MBC/TJB Broadcasting Station",
        "soundFile": "sound.wav",
        "idxName": "MBC/TJB 방송국",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 55,
        "stationKor": "대전컨벤션센터",
        "stationEng": "Daejeon Convention Center (DCC)",
        "infoKor": "대전컨벤션센터",
        "infoEng": "Daejeon Convention Center",
        "soundFile": "sound.wav",
        "idxName": "대전컨벤션센터",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 56,
        "stationKor": "한빛탑",
        "stationEng": "Hanbit Tower",
        "infoKor": "한빛탑",
        "infoEng": "Hanbit Tower",
        "soundFile": "sound.wav",
        "idxName": "한빛탑",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 57,
        "stationKor": "신세계백화점",
        "stationEng": "Shinsegae Department Store",
        "infoKor": "신세계백화점",
        "infoEng": "Shinsegae Department Store",
        "soundFile": "sound.wav",
        "idxName": "신세계백화점",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 58,
        "stationKor": "국립중앙과학관",
        "stationEng": "National Science Museum",
        "infoKor": "국립중앙과학관",
        "infoEng": "National Science Museum",
        "soundFile": "sound.wav",
        "idxName": "국립중앙과학관",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 59,
        "stationKor": "보건환경연구원",
        "stationEng": "Institute of Health and Environment",
        "infoKor": "보건환경연구원",
        "infoEng": "Institute of Health and Environment",
        "soundFile": "sound.wav",
        "idxName": "보건환경연구원",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 60,
        "stationKor": "대전지방기상청",
        "stationEng": "Daejeon Regional Meteorological Administration",
        "infoKor": "대전지방기상청",
        "infoEng": "Daejeon Regional Meteorological Administration",
        "soundFile": "sound.wav",
        "idxName": "대전지방기상청",
        "lineImg": "station1.PNG"
    },
    {
        "idx": 61,
        "stationKor": "원자력안전기술원",
        "stationEng": "Korea Institute of Nuclear Safety",
        "infoKor": "원자력안전기술원",
        "infoEng": "Korea Institute of Nuclear Safety",
        "soundFile": "sound.wav",
        "idxName": "원자력안전기술원",
        "lineImg": "station1.PNG"
    }
];

interface MockData {
    dispInfo: {
        gpsInfo: {
            latitude: number;
            longitude: number;
        };
        egoInfo: {
            egoVehicleSpeedMps: number;
            energyLevel: number;
            gear: number;
            brake: number;
            turnSignal: number;
            steeringAngleDeg: number;
        };
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
    isAuto: boolean;
    isPedestrian: boolean;
}

let lastMockData: MockData | null = null;

export const createMockData = (isContinuous?: boolean, forceStationChanged?: boolean): MockData => {
    if (!isContinuous) {
        const randomNumber = Math.floor(Math.random() * tempDatas.length);
        const thisStop = tempDatas[randomNumber];

        // 정방향인지 여부 판단
        // TODO: 31은 바뀔 수 있음
        const isForward = thisStop.idx <= 31;

        let nextStop: any = null;

        if (isForward) {
            nextStop = tempDatas.find(s => s.idx === thisStop.idx + 1);
        } else {
            nextStop = tempDatas.find(s => s.idx === thisStop.idx - 1);
        }

        // 마지막 정류장 예외
        if (!nextStop) {
            nextStop = thisStop; // 자기 자신
        }

        lastMockData = {
            dispInfo: {
                gpsInfo: {
                    // 위치 정보 (테스트용 TM 좌표 혹은 위경도 좌표)
                    latitude: +(36.35 + Math.random() * 0.01).toFixed(7),
                    longitude: +(127.38 + Math.random() * 0.01).toFixed(7)
                },
                egoInfo: {
                    // 차량 속도 (m/s), 배터리 잔량, 기어 상태 (ASCII), 브레이크 여부, 방향지시등, 핸들 각도
                    egoVehicleSpeedMps: +(Math.random() * 25).toFixed(2),
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
                controlInfo: {
                    // 자율/수동 상태, 오류 여부, 자율 가능 여부
                    operation_mode: Math.random() > 0.5 ? 1 : 0, // 1: 자율, 0: 수동
                    system_off_reason: 0, // NONE
                    auto_available: Math.random() > 0.1,
                    sensor_status: [0x00000000, 0x00000040, 0x00000020][Math.floor(Math.random() * 3)]
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
            event: {
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
            isAuto: Math.random() >= 0.5,
            isPedestrian: Math.random() >= 0.5
        };
    } else if (lastMockData) {
        // 연속 송신 시 ego 상태만 업데이트
        lastMockData.dispInfo.egoInfo = {
            egoVehicleSpeedMps: +(Math.random() * 25).toFixed(2),
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
    } else {
        console.warn("No previous data. Generating fresh.");
        return createMockData(false);
    }

    return lastMockData;
};