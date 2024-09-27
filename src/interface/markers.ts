export interface ICoord {
  lon: number;
  lat: number;
  alt: number;
}

export enum TargetTypeEnum {
  self = 'self',
  target = 'target',
  empty = 'empty',
}

export interface ITarget {
  value: string;
  src: string;
  type: TargetTypeEnum;
}

export interface IMarker {
  coords: ICoord;
  target: ITarget;
  tags: string[];
  timeStamp: number;
  notes: string;
  uniqKey: string;
  files: string[];
}

export interface IEmptyMarker {
  coords: ICoord;
  timeStamp: number;
  uniqKey: string;
}

export interface ISelfMarker {
  target: { value: 'SELF'; src: string; type: TargetTypeEnum.self };
  coords: ICoord;
  uniqKey: string;
}
