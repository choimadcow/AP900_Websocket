// event.Content 안에 들어갈 JSON의 타입
interface ContentData {
    type: 'PassengerCountUpdate' | 'TakeOverReason' | 'BusOperation';
    value: number | string;
}

// event 객체의 타입
interface HMIEventPb {
    eventType: number;
    Content: string; // JSON 문자열이 담기는 필드
}

// 전체 메시지 프로토콜의 타입
interface HMIInfoPb {
    dispInfo?: any; // dispInfo는 현재 로직에서 사용하지 않으므로 any 처리
    event?: HMIEventPb;
}