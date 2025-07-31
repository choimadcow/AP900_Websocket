// src/state.ts

// 이 파일에서 상태를 중앙 관리합니다.
let passengerCount: number | null = null;
let errInfo: string | null = null;

// 승객 수를 변경하는 함수
export const setPassengerCount = (count: number): void => {
    passengerCount = count;
};

// 현재 승객 수를 가져오는 함수
export const getPassengerCount = (): number | null => {
    return passengerCount;
};

// 에러 정보를 변경하는 함수 (추후 확장성을 위해 함께 만듭니다)
export const setErrorInfo = (info: string): void => {
    errInfo = info;
};

// 현재 에러 정보를 가져오는 함수
export const getErrorInfo = (): string | null => {
    return errInfo;
};