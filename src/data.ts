import { RoomData, RoomType } from './types';
import { ROOM_DETAILS } from './roomDetails';

const getRoomNumber = (floor: number, suffix: string) => `${floor}${suffix.padStart(2, '0')}`;

const isAccessible = (floor: number, suffix: string) => {
  const num = parseInt(suffix);
  // Based on: 125/126/225, 226/326/426, 526/626/726, 826/926
  if (floor === 1 && (num === 25 || num === 26)) return true;
  if (floor === 2 && (num === 25 || num === 26)) return true;
  if (floor >= 3 && floor <= 9 && num === 26) return true;
  return false;
};

const createRoom = (floor: number, suffix: string, type: RoomType): RoomData => {
  const number = getRoomNumber(floor, suffix);
  const details = ROOM_DETAILS[number] || {};
  
  return {
    id: number,
    number,
    type,
    isAccessible: isAccessible(floor, suffix),
    headboard: details.headboard,
    tv: details.tv,
    safe: details.safe
  };
};

const createService = (floor: number, id: string, label: string): RoomData => ({
  id: `${id}-${floor}`,
  number: '',
  type: 'SERVICE',
  label
});

export const getFloorData = (floor: number) => {
  const topRooms = [
    createRoom(floor, '07', 'PVM'),
    createRoom(floor, '06', 'PVM'),
  ];

  const leftRooms = [
    createRoom(floor, '08', 'PVM'),
    createRoom(floor, '09', floor === 1 ? 'JUNIOR SUITE' : 'PREMIUM'),
    createRoom(floor, '10', 'PREMIUM'),
    createRoom(floor, '11', 'PREMIUM'),
    createRoom(floor, '12', 'PREMIUM'),
    createRoom(floor, '13', 'STANDARD'),
    createRoom(floor, '14', 'STANDARD'),
    createRoom(floor, '15', 'STANDARD'),
    createRoom(floor, '16', 'STANDARD'),
    createRoom(floor, '17', 'STANDARD'),
    createRoom(floor, '18', 'STANDARD'),
    createRoom(floor, '19', 'STANDARD'),
    createRoom(floor, '20', 'STANDARD'),
    createRoom(floor, '21', 'STANDARD'),
    createRoom(floor, '22', 'STANDARD'),
    createRoom(floor, '23', 'STANDARD'),
    createRoom(floor, '24', 'STANDARD'),
    createRoom(floor, '25', 'STANDARD'),
  ];

  const rightRooms = [
    createRoom(floor, '05', 'PVM'),
    createRoom(floor, '04', floor === 1 ? 'JUNIOR SUITE' : 'PREMIUM'),
    createRoom(floor, '03', 'PREMIUM'),
    createRoom(floor, '02', 'PREMIUM'),
    createRoom(floor, '01', 'PREMIUM'),
    createService(floor, 'pasillo', 'PASILLO'),
    createService(floor, 'ascensor', 'ASCENSOR'),
    createService(floor, 'office', 'OFFICE'),
    createRoom(floor, '35', 'STANDARD'),
    createRoom(floor, '34', 'STANDARD'),
    createRoom(floor, '33', 'STANDARD'),
    createRoom(floor, '32', 'STANDARD'),
    createRoom(floor, '31', 'STANDARD'),
    createRoom(floor, '30', 'STANDARD'),
    createRoom(floor, '29', 'STANDARD'),
    createRoom(floor, '28', 'STANDARD'),
    createRoom(floor, '27', 'STANDARD'),
    createRoom(floor, '26', 'STANDARD'),
  ];

  return { topRooms, leftRooms, rightRooms };
};
