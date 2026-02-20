export type RoomType = 'PVM' | 'PREMIUM' | 'STANDARD' | 'SERVICE';
export type BedPosition = 'top' | 'bottom' | 'left' | 'right';

export interface RoomData {
  id: string;
  number: string;
  type: RoomType;
  isAccessible?: boolean;
  label?: string; // For things like "PASILLO", "ASCENSOR"
  headboard?: string;
  tv?: string;
  safe?: string;
  bedPosition?: BedPosition;
}

export interface Observation {
  id: string;
  roomId: string;
  text: string;
  timestamp: number;
}
