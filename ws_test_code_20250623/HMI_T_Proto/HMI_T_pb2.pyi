from google.protobuf.internal import containers as _containers
from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class EventType(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    Toast: _ClassVar[EventType]
    GlobalPath: _ClassVar[EventType]
    DriverMessage: _ClassVar[EventType]
    OperatorInput: _ClassVar[EventType]

class ObjectType(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    Vehicle: _ClassVar[ObjectType]
    Pedestrian: _ClassVar[ObjectType]
    Bike: _ClassVar[ObjectType]

class LaneDirection(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    NOT_CHANGING: _ClassVar[LaneDirection]
    LEFT: _ClassVar[LaneDirection]
    RIGHT: _ClassVar[LaneDirection]

class LaneProcess(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    READY: _ClassVar[LaneProcess]
    BLOCKED: _ClassVar[LaneProcess]
    CHANGING: _ClassVar[LaneProcess]
Toast: EventType
GlobalPath: EventType
DriverMessage: EventType
OperatorInput: EventType
Vehicle: ObjectType
Pedestrian: ObjectType
Bike: ObjectType
NOT_CHANGING: LaneDirection
LEFT: LaneDirection
RIGHT: LaneDirection
READY: LaneProcess
BLOCKED: LaneProcess
CHANGING: LaneProcess

class HMIInfoPb(_message.Message):
    __slots__ = ("dispInfo", "event")
    DISPINFO_FIELD_NUMBER: _ClassVar[int]
    EVENT_FIELD_NUMBER: _ClassVar[int]
    dispInfo: HMIDisplayInfoPb
    event: HMIEventPb
    def __init__(self, dispInfo: _Optional[_Union[HMIDisplayInfoPb, _Mapping]] = ..., event: _Optional[_Union[HMIEventPb, _Mapping]] = ...) -> None: ...

class HMIEventPb(_message.Message):
    __slots__ = ("eventType", "Content")
    EVENTTYPE_FIELD_NUMBER: _ClassVar[int]
    CONTENT_FIELD_NUMBER: _ClassVar[int]
    eventType: EventType
    Content: str
    def __init__(self, eventType: _Optional[_Union[EventType, str]] = ..., Content: _Optional[str] = ...) -> None: ...

class HMIDisplayInfoPb(_message.Message):
    __slots__ = ("gpsInfo", "egoInfo", "objectInfos", "extraInfos", "vehicleID", "messageTime", "controlInfo", "roadInfo", "localPath", "laneChange", "TurnByTurnInfo", "targetInfo")
    GPSINFO_FIELD_NUMBER: _ClassVar[int]
    EGOINFO_FIELD_NUMBER: _ClassVar[int]
    OBJECTINFOS_FIELD_NUMBER: _ClassVar[int]
    EXTRAINFOS_FIELD_NUMBER: _ClassVar[int]
    VEHICLEID_FIELD_NUMBER: _ClassVar[int]
    MESSAGETIME_FIELD_NUMBER: _ClassVar[int]
    CONTROLINFO_FIELD_NUMBER: _ClassVar[int]
    ROADINFO_FIELD_NUMBER: _ClassVar[int]
    LOCALPATH_FIELD_NUMBER: _ClassVar[int]
    LANECHANGE_FIELD_NUMBER: _ClassVar[int]
    TURNBYTURNINFO_FIELD_NUMBER: _ClassVar[int]
    TARGETINFO_FIELD_NUMBER: _ClassVar[int]
    gpsInfo: HMIGpsInfoPb
    egoInfo: HMIEgoVehiclePb
    objectInfos: _containers.RepeatedCompositeFieldContainer[HMIObjectPb]
    extraInfos: _containers.RepeatedScalarFieldContainer[str]
    vehicleID: str
    messageTime: int
    controlInfo: HMIControlInfoPb
    roadInfo: HMIRoadInfoPb
    localPath: HMILocalPathPb
    laneChange: HMILaneChangePb
    TurnByTurnInfo: HMITurnByTurnPb
    targetInfo: HMITargetInfoPb
    def __init__(self, gpsInfo: _Optional[_Union[HMIGpsInfoPb, _Mapping]] = ..., egoInfo: _Optional[_Union[HMIEgoVehiclePb, _Mapping]] = ..., objectInfos: _Optional[_Iterable[_Union[HMIObjectPb, _Mapping]]] = ..., extraInfos: _Optional[_Iterable[str]] = ..., vehicleID: _Optional[str] = ..., messageTime: _Optional[int] = ..., controlInfo: _Optional[_Union[HMIControlInfoPb, _Mapping]] = ..., roadInfo: _Optional[_Union[HMIRoadInfoPb, _Mapping]] = ..., localPath: _Optional[_Union[HMILocalPathPb, _Mapping]] = ..., laneChange: _Optional[_Union[HMILaneChangePb, _Mapping]] = ..., TurnByTurnInfo: _Optional[_Union[HMITurnByTurnPb, _Mapping]] = ..., targetInfo: _Optional[_Union[HMITargetInfoPb, _Mapping]] = ...) -> None: ...

class HMITargetInfoPb(_message.Message):
    __slots__ = ("targetAvailable",)
    TARGETAVAILABLE_FIELD_NUMBER: _ClassVar[int]
    targetAvailable: bool
    def __init__(self, targetAvailable: bool = ...) -> None: ...

class HMIGpsInfoPb(_message.Message):
    __slots__ = ("xM", "yM", "zM", "heading")
    XM_FIELD_NUMBER: _ClassVar[int]
    YM_FIELD_NUMBER: _ClassVar[int]
    ZM_FIELD_NUMBER: _ClassVar[int]
    HEADING_FIELD_NUMBER: _ClassVar[int]
    xM: float
    yM: float
    zM: float
    heading: float
    def __init__(self, xM: _Optional[float] = ..., yM: _Optional[float] = ..., zM: _Optional[float] = ..., heading: _Optional[float] = ...) -> None: ...

class HMIEgoVehiclePb(_message.Message):
    __slots__ = ("egoVehicleSpeedMps", "steeringAngleDeg", "turnSignal", "brake", "gear", "energyLevel")
    EGOVEHICLESPEEDMPS_FIELD_NUMBER: _ClassVar[int]
    STEERINGANGLEDEG_FIELD_NUMBER: _ClassVar[int]
    TURNSIGNAL_FIELD_NUMBER: _ClassVar[int]
    BRAKE_FIELD_NUMBER: _ClassVar[int]
    GEAR_FIELD_NUMBER: _ClassVar[int]
    ENERGYLEVEL_FIELD_NUMBER: _ClassVar[int]
    egoVehicleSpeedMps: float
    steeringAngleDeg: float
    turnSignal: int
    brake: int
    gear: int
    energyLevel: float
    def __init__(self, egoVehicleSpeedMps: _Optional[float] = ..., steeringAngleDeg: _Optional[float] = ..., turnSignal: _Optional[int] = ..., brake: _Optional[int] = ..., gear: _Optional[int] = ..., energyLevel: _Optional[float] = ...) -> None: ...

class HMIControlInfoPb(_message.Message):
    __slots__ = ("operation_mode", "system_off_reason", "auto_available", "sensor_status")
    OPERATION_MODE_FIELD_NUMBER: _ClassVar[int]
    SYSTEM_OFF_REASON_FIELD_NUMBER: _ClassVar[int]
    AUTO_AVAILABLE_FIELD_NUMBER: _ClassVar[int]
    SENSOR_STATUS_FIELD_NUMBER: _ClassVar[int]
    operation_mode: int
    system_off_reason: int
    auto_available: bool
    sensor_status: int
    def __init__(self, operation_mode: _Optional[int] = ..., system_off_reason: _Optional[int] = ..., auto_available: bool = ..., sensor_status: _Optional[int] = ...) -> None: ...

class PoseXY(_message.Message):
    __slots__ = ("x", "y")
    X_FIELD_NUMBER: _ClassVar[int]
    Y_FIELD_NUMBER: _ClassVar[int]
    x: float
    y: float
    def __init__(self, x: _Optional[float] = ..., y: _Optional[float] = ...) -> None: ...

class HMIObjectPb(_message.Message):
    __slots__ = ("objectID", "objectType", "box_point_0", "box_point_1", "box_point_2", "box_point_3")
    OBJECTID_FIELD_NUMBER: _ClassVar[int]
    OBJECTTYPE_FIELD_NUMBER: _ClassVar[int]
    BOX_POINT_0_FIELD_NUMBER: _ClassVar[int]
    BOX_POINT_1_FIELD_NUMBER: _ClassVar[int]
    BOX_POINT_2_FIELD_NUMBER: _ClassVar[int]
    BOX_POINT_3_FIELD_NUMBER: _ClassVar[int]
    objectID: int
    objectType: ObjectType
    box_point_0: PoseXY
    box_point_1: PoseXY
    box_point_2: PoseXY
    box_point_3: PoseXY
    def __init__(self, objectID: _Optional[int] = ..., objectType: _Optional[_Union[ObjectType, str]] = ..., box_point_0: _Optional[_Union[PoseXY, _Mapping]] = ..., box_point_1: _Optional[_Union[PoseXY, _Mapping]] = ..., box_point_2: _Optional[_Union[PoseXY, _Mapping]] = ..., box_point_3: _Optional[_Union[PoseXY, _Mapping]] = ...) -> None: ...

class HMIRoadInfoPb(_message.Message):
    __slots__ = ("trafficType",)
    TRAFFICTYPE_FIELD_NUMBER: _ClassVar[int]
    trafficType: int
    def __init__(self, trafficType: _Optional[int] = ...) -> None: ...

class HMILocalPathPb(_message.Message):
    __slots__ = ("path",)
    PATH_FIELD_NUMBER: _ClassVar[int]
    path: _containers.RepeatedCompositeFieldContainer[PoseXY]
    def __init__(self, path: _Optional[_Iterable[_Union[PoseXY, _Mapping]]] = ...) -> None: ...

class HMILaneChangePb(_message.Message):
    __slots__ = ("direction", "process")
    DIRECTION_FIELD_NUMBER: _ClassVar[int]
    PROCESS_FIELD_NUMBER: _ClassVar[int]
    direction: LaneDirection
    process: LaneProcess
    def __init__(self, direction: _Optional[_Union[LaneDirection, str]] = ..., process: _Optional[_Union[LaneProcess, str]] = ...) -> None: ...

class HMITurnByTurnPb(_message.Message):
    __slots__ = ("maneuver", "distance")
    MANEUVER_FIELD_NUMBER: _ClassVar[int]
    DISTANCE_FIELD_NUMBER: _ClassVar[int]
    maneuver: str
    distance: float
    def __init__(self, maneuver: _Optional[str] = ..., distance: _Optional[float] = ...) -> None: ...
