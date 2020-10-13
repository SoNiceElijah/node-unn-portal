const exec = require('./execute');

async function search(param,type,options) {
    return await exec('search','', { term : param, type : type, ...options });
}

module.exports = {
    byAuditorium : function(term, options) {
        return search(term,'auditorium', options);
    },
    byLecturer : function(term, options) {
        return search(term,'lecturer', options);
    },
    byGroup : function(term, options) {
        return search(term,'group', options);
    },
    byStudent : function(term, options) {
        return search(term, 'student', options)
    },
    byPerson : function(term, options) {
        return search(term,'person', options);
    },
    run : search
}