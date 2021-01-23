const schedule = require('./schedule');

class Abstruct {
    constructor(func,id) {
        this.exec = func;
        this.target = id;
    }

    today() {
        let start = new Date();
        let finish = new Date();
        return this.exec(this.target,{start, finish});
    }

    tommorow() {
        let start = new Date();
        start.setDate(start.getDate() + 1);
        let finish = new Date(start);
        return this.exec(this.target,{start, finish});
    }

    weekAligned() {
        let start = new Date();
        start.setDate(start.getDate() - start.getDay());
        let finish = new Date();
        finish.setDate(finish.getDate() + (6 - finish.getDay()));
        return this.exec(this.target,{start, finish});
    }

    week() {
        let start = new Date();
        let finish = new Date();
        finish.setDate(finish.getDate() + 6);
        return this.exec(this.target,{start, finish});
    }

    week2Aligned() {
        let start = new Date();
        start.setDate(start.getDate() - start.getDay());
        let finish = new Date();
        finish.setDate(finish.getDate() + 7 + (6 - finish.getDay()));
        return this.exec(this.target,{start, finish});
    }

    week2() {
        let start = new Date();
        let finish = new Date();
        finish.setDate(finish.getDate() + 7 + 6);
        return this.exec(this.target,{start, finish});
    }

};

module.exports = { 
    byGroup : (id) => new Abstruct(schedule.byGroup,id),
    byAuditorium : (id) => new Abstruct(schedule.byAuditorium,id),
    byStudent : (id) => new Abstruct(schedule.byStudent,id),
    byLecturer : (id) => new Abstruct(schedule.byLecturer,id)
}