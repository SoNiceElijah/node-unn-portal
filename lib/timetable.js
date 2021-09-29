const schedule = require('./schedule');
const { $mm, inneron, inneroff } = require('./modifier');
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

    async when(name) {
        inneron();
        let data = $mm(await this.week2());
        inneroff();
        let filtered = data.filter(helper.filterByName(name));
        let today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        filtered = filtered.map((e) => {
            let target = new Date(e.date);
            let dt = Math.floor((target.getTime() - today.getTime()) / (1000 * 3600 * 24));
            e.distance = dt;
            return e;
        });
        return filtered;
    }

    async where(name) {
        inneron();
        let data = $mm(await this.week2());
        inneroff();
        let filtered = data.filter(helper.filterByName(name));
        let obj = {};
        if(!filtered.length) return {};
        let type0 = filtered.filter(e => e.type === 0);
        let type1 = filtered.filter(e => e.type === 1);
        let type2 = filtered.filter(e => e.type === 2);
        let typeundef = filtered.filter(e => e.type === -1);
        if(type0.length) obj.type0 = type0;
        if(type1.length) obj.type1 = type1;
        if(type2.length) obj.type2 = type2;
        if(typeundef.length) obj.typeundef = typeundef;
        for(let prop in obj)
        {
            let array = obj[prop];
            array.sort((a,b) => a.dnum - b.dnum);
            obj[prop] = array;
        }
        return obj;
    }

    date(date) {
        let start = date;
        let finish = date;
        return this.exec(this.target,{start, finish});
    }

};

module.exports = { 
    byGroup : (id, options) => new Abstruct(schedule.byGroup,id, options),
    byAuditorium : (id, options) => new Abstruct(schedule.byAuditorium,id, options),
    byStudent : (id, options) => new Abstruct(schedule.byStudent,id, options),
    byLecturer : (id, options) => new Abstruct(schedule.byLecturer,id, options)
}