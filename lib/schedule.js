const { buildDateString } = require('./helper');
const exec = require('./execute');

async function schedule(type, id, options) {

    let method = `schedule/${type}`;

    if(!options) options = {}    
    let { start, finish } = options;

    if(start) options.start = buildDateString(start);
    if(finish) options.finish = buildDateString(finish); 

    return await exec(method, id, options);
    
}

module.exports = {
    byGroup : function(group_id,options) {
        return schedule('group',group_id,options);
    },
    byPerson : function(person_id,options) {
        return schedule('person',person_id,options);
    },
    byAuditorium : function(auditorium_id,options) {
        return schedule('auditorium',auditorium_id,options);
    },
    byStudent : function(student_id, options) {
        return schedule('student',student_id,options);
    },
    byLecturer : function(lecturer_id, options) {
        return schedule('lecturer',lecturer_id,options);
    },
    run : schedule
}

