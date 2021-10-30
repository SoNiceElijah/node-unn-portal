const schedule = require('./schedule');
const helper = require('./helper');

class Abstruct {

    constructor(func,id,options) {
        this.exec = (i,o) => func(i,Object.assign({},o,options));
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

    summerExam() {
        let start = new Date("06.01.2000");
        let finish = new Date("07.02.2000");
        let today = new Date();
        start.setFullYear(today.getFullYear());
        finish.setFullYear(today.getFullYear());
        return this.exec(this.target,{start, finish});
    }

    winterExam() {
        let start = new Date("01.01.2000");
        let finish = new Date("02.02.2000");
        let today = new Date();
        start.setFullYear(today.getFullYear());
        finish.setFullYear(today.getFullYear());
        return this.exec(this.target,{start, finish});
    }

    date(date) {
        let start = date;
        let finish = date;
        return this.exec(this.target,{start, finish});
    }

    async week2name(name) {
        let data = await this.week2();
        return data.filter(helper.filterByName(name));
    }
};

module.exports = { 
    byGroup : (id, options) => new Abstruct(schedule.byGroup,id, options),
    byAuditorium : (id, options) => new Abstruct(schedule.byAuditorium,id, options),
    byStudent : (id, options) => new Abstruct(schedule.byStudent,id, options),
    byLecturer : (id, options) => new Abstruct(schedule.byLecturer,id, options)
}