function buildDateString(date) {
    return date.getFullYear().toString(10).padStart(4,'0') + '.'
           + (date.getMonth()+1).toString(10).padStart(2,'0') + '.'
           + date.getDate().toString(10).padStart(2,'0');
}

function filterByName(name) {
    name = name.toUpperCase().trim();
    return function(e) {
        return e.name.toUpperCase().trim() === name
            || e.short.trim() === name
            || e.rootname.toUpperCase().trim() === name
            || e.teacher.trim().toUpperCase() === name
            || e.teacher.split(' ')[0].trim().toUpperCase() === name
        }
}

module.exports = { buildDateString, filterByName }