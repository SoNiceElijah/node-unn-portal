function buildDateString(date) {
    return date.getFullYear().toString(10).padStart(4,'0') + '.'
           + (date.getMonth()+1).toString(10).padStart(2,'0') + '.'
           + date.getDate().toString(10).padStart(2,'0');
}

module.exports = { buildDateString }