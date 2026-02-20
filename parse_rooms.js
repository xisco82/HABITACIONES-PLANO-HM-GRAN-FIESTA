const fs = require('fs');

const content = fs.readFileSync('rooms_input.txt', 'utf-8');
const lines = content.split('\n').filter(l => l.trim());

const details = {};

lines.forEach(line => {
  const parts = line.split('\t');
  // Chunks of 4
  for (let i = 0; i < parts.length; i += 4) {
    const room = parts[i]?.trim();
    if (!room) continue;
    
    // Check if room is a number
    if (!/^\d+$/.test(room)) continue;

    const headboard = parts[i+1]?.trim();
    const tv = parts[i+2]?.trim();
    const safe = parts[i+3]?.trim();
    
    if (headboard || tv || safe) {
      details[room] = {};
      if (headboard) details[room].headboard = headboard;
      if (tv) details[room].tv = tv;
      if (safe) details[room].safe = safe;
    }
  }
});

console.log(`export interface RoomDetail {
  headboard?: string;
  tv?: string;
  safe?: string;
}

export const ROOM_DETAILS: Record<string, RoomDetail> = ${JSON.stringify(details, null, 2)};
`);
