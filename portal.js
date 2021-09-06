
const { base } = require('./lib/execute');
const schedule = require('./lib/schedule');
const search = require('./lib/search');
const timetable = require('./lib/timetable');

const { on, off } = require('./lib/modifier'); 

module.exports = {
    
    base,

    modifyon : on,
    modifyoff : off,

    schedule,
    search,
    timetable
    
};