const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '..', 'db.json');

function readDb() {
  if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify({ bookings: [] }, null, 2));
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8') || '{"bookings":[]}');
}

function writeDb(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

const db = readDb();
db.bookings ||= [];
db.bookings.push({
  id: `BOOK-${Date.now()}`,
  date: '2025-08-22',
  timeSlotId: 'afternoon',
  conservationAreaId: '2',
  visitors: 1,
  createdAt: new Date().toISOString()
});
writeDb(db);
console.log('Sync demo: booking added to db.json');
