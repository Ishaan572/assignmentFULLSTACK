const fs = require('fs');

let store = {}; 
const dbPath = './attendance.json';

try {
    const rawData = fs.readFileSync(dbPath, 'utf8');
    store = JSON.parse(rawData);
     console.log("Database loaded successfully!");
} catch (error) {
  
    console.log("No existing database found. Starting fresh.");
    store = {};
}


function markAttendance(rollNumber) {
    if (store[rollNumber]) {
        return false; 
    }

    store[rollNumber] = {
        present: true,
        timestamp: new Date().toISOString() 
    };

    saveDatabase();

    return true; 
}

function saveDatabase() {
    const jsonText = JSON.stringify(store, null, 2);
     fs.writeFileSync(dbPath, jsonText, 'utf8');
}

function getStats(){
  const rawRollNumbers = Object.keys(store);

    const sortedRollNumbers = rawRollNumbers.sort();

    return {
        total: sortedRollNumbers.length,
        rollNumbers: sortedRollNumbers
    };
}
module.exports = { markAttendance ,getStats};