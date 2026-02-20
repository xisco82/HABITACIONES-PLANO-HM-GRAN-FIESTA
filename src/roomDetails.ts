export interface RoomDetail {
  headboard?: string;
  tv?: string;
  safe?: string;
}

const DEFAULT_DETAILS: Record<string, RoomDetail> = {};

// Helper to set range
const setRange = (start: number, end: number, detail: RoomDetail) => {
  for (let i = start; i <= end; i++) {
    DEFAULT_DETAILS[i.toString()] = { ...DEFAULT_DETAILS[i.toString()], ...detail };
  }
};

// Helper to set single
const setSingle = (room: number, detail: RoomDetail) => {
  DEFAULT_DETAILS[room.toString()] = { ...DEFAULT_DETAILS[room.toString()], ...detail };
};

// --- FLOOR 1 ---
setSingle(101, { headboard: "Baldosa", safe: "modelo Ibiza" });
setSingle(102, { headboard: "Tela", safe: "Blanca" });
setSingle(103, { headboard: "Baldosa", safe: "Blanca" });
setSingle(104, { tv: "Toshiba", safe: "Blanca" });
setSingle(105, { tv: "Smart", safe: "Negra" });
setSingle(106, { safe: "Negra" });
setSingle(107, { tv: "Smart", safe: "Negra" });
setSingle(108, { tv: "Smart", safe: "Negra" });
setSingle(109, { tv: "Toshiba", safe: "Blanca" });
setRange(110, 125, { headboard: "Baldosa", safe: "Blanca" });
setSingle(126, { headboard: "Baldosa", tv: "Android (Engel)", safe: "Blanca" });
setRange(127, 135, { headboard: "Baldosa", safe: "Blanca" });

// --- FLOOR 2 ---
setSingle(201, { headboard: "Tela", tv: "Smart", safe: "Blanca" });
setRange(202, 203, { headboard: "Tela", safe: "Blanca" });
setSingle(204, { headboard: "Tela", safe: "Negra" });
setRange(205, 208, { tv: "Smart", safe: "Negra" });
setRange(209, 220, { headboard: "Tela", safe: "Blanca" });
setSingle(221, { headboard: "Tela", tv: "Samsung", safe: "Blanca" });
setRange(222, 235, { headboard: "Tela", safe: "Blanca" });

// --- FLOOR 3 ---
setRange(301, 304, { headboard: "Tela", safe: "Blanca" });
setRange(305, 308, { tv: "Smart", safe: "Negra" });
setRange(309, 318, { headboard: "Tela", safe: "Blanca" });
setSingle(319, { headboard: "Tela", tv: "Smart", safe: "Blanca" });
setRange(320, 331, { headboard: "Tela", safe: "Blanca" });
setSingle(332, { headboard: "Tela", tv: "NO PIN", safe: "Blanca" });
setSingle(333, { headboard: "Tela", safe: "Blanca" });
setSingle(334, { headboard: "Tela", tv: "NO PIN", safe: "Blanca" });
setSingle(335, { headboard: "Tela", safe: "Blanca" });

// --- FLOOR 4 ---
setRange(401, 404, { headboard: "Tela", safe: "Blanca" });
setRange(405, 408, { tv: "Smart", safe: "Negra" });
setRange(409, 421, { headboard: "Tela", safe: "Blanca" });
setSingle(422, { headboard: "Tela", tv: "Smart", safe: "Blanca" });
setRange(423, 431, { headboard: "Tela", safe: "Blanca" });
setSingle(432, { headboard: "Tela", tv: "Smart", safe: "Blanca" });
setRange(433, 435, { headboard: "Tela", safe: "Blanca" });

// --- FLOOR 5 ---
setRange(501, 504, { headboard: "Baldosa", safe: "Blanca" });
setRange(505, 508, { tv: "Smart", safe: "Negra" });
setSingle(509, { headboard: "Baldosa", safe: "Negra" });
setSingle(510, { headboard: "Baldosa", safe: "Blanca" });
setSingle(511, { headboard: "Baldosa", safe: "modelo Ibiza" });
setRange(512, 519, { headboard: "Baldosa", safe: "Blanca" });
setSingle(520, { headboard: "Baldosa", tv: "Smart", safe: "Blanca" });
setRange(521, 535, { headboard: "Baldosa", safe: "Blanca" });

// --- FLOOR 6 ---
setSingle(601, { headboard: "Baldosa", safe: "Blanca" });
setSingle(602, { headboard: "Baldosa", tv: "Smart", safe: "Blanca" });
setRange(603, 604, { headboard: "Baldosa", safe: "Blanca" });
setSingle(605, { safe: "Negra" });
setSingle(606, { tv: "Smart", safe: "sin cofre" });
setRange(607, 608, { safe: "Negra" });
setSingle(609, { headboard: "Baldosa", tv: "Smart", safe: "Blanca" });
setRange(610, 616, { headboard: "Baldosa", safe: "Blanca" });
setSingle(617, { headboard: "Baldosa", tv: "Smart", safe: "Blanca" });
setRange(618, 632, { headboard: "Baldosa", safe: "Blanca" });
setSingle(633, { headboard: "Tela", safe: "Blanca" });
setRange(634, 635, { headboard: "Baldosa", safe: "Blanca" });

// --- FLOOR 7 ---
setRange(701, 704, { headboard: "Tela", safe: "Blanca" });
setRange(705, 708, { tv: "Smart", safe: "Negra" });
setSingle(709, { headboard: "Tela", safe: "Blanca" });
setRange(710, 711, { headboard: "Tela", tv: "Smart", safe: "Blanca" });
setRange(712, 733, { headboard: "Tela", safe: "Blanca" });
setSingle(734, { headboard: "Tela", tv: "Smart", safe: "Blanca" });
setSingle(735, { headboard: "Tela", safe: "Blanca" });

// --- FLOOR 8 ---
setSingle(801, { headboard: "Tela", safe: "Blanca" });
setSingle(802, { headboard: "Tela", tv: "No funciona (samsung)", safe: "Blanca" });
setRange(803, 804, { headboard: "Tela", safe: "Blanca" });
setSingle(805, { tv: "Smart", safe: "Negra" });
setSingle(806, { safe: "Negra" });
setSingle(807, { tv: "Smart", safe: "Negra" });
setSingle(808, { safe: "Negra" });
setRange(809, 820, { headboard: "Tela", safe: "Blanca" });
setSingle(821, { headboard: "Tela", safe: "modelo Ibiza" });
setRange(822, 826, { headboard: "Tela", safe: "Blanca" });
setSingle(827, { headboard: "Tela", tv: "Android (Engel)", safe: "Blanca" });
setRange(828, 833, { headboard: "Tela", safe: "Blanca" });
setSingle(834, { headboard: "Tela", tv: "Hisense dif", safe: "Blanca" });
setSingle(835, { headboard: "Tela", safe: "Blanca" });

// --- FLOOR 9 ---
setRange(901, 904, { headboard: "Baldosa", safe: "Blanca" });
setRange(905, 908, { safe: "Negra" });
setRange(909, 914, { headboard: "Baldosa", safe: "Blanca" });
setSingle(915, { headboard: "Baldosa", tv: "Smart", safe: "Blanca" });
setRange(916, 932, { headboard: "Baldosa", safe: "Blanca" });
setSingle(933, { headboard: "Baldosa", tv: "Smart", safe: "Blanca" });
setRange(934, 935, { headboard: "Baldosa", safe: "Blanca" });

// --- Update for rooms 05, 06, 07, 08 on all floors (Papel pintado verde) ---
// Note: We apply this AFTER the previous settings to ensure the specific user request for 05-08 is met.
for (let floor = 1; floor <= 9; floor++) {
  const suffixes = ['05', '06', '07', '08'];
  suffixes.forEach(suffix => {
    const roomNum = `${floor}${suffix}`;
    if (!DEFAULT_DETAILS[roomNum]) DEFAULT_DETAILS[roomNum] = {};
    DEFAULT_DETAILS[roomNum].headboard = "Papel pintado verde";
  });
}

export const ROOM_DETAILS = DEFAULT_DETAILS;
