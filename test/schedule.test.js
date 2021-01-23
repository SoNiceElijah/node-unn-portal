const assert = require('chai').assert;
const portal = require('../portal');

describe("Schedule", () => {

    it("Can request smth by group", async () => {
        const answer = await portal.schedule.byGroup(25009);
        assert.isArray(answer);
    });
    it("Can not request invalid date by group", async () => {
        const answer = await portal.schedule.byGroup(25009, { start : new Date("10 sep 2024"), finish: new Date("10 sep 2014") });
        assert.isObject(answer);
        let { error } = answer;
        assert.isString(error);
    })




    it("Can request smth by auditorium", async () => {
        const answer = await portal.schedule.byAuditorium(2859);
        assert.isArray(answer);
    });
    it("Can not request invalid date by auditorium", async () => {
        const answer = await portal.schedule.byAuditorium(2859, { start : new Date("10 sep 2024"), finish: new Date("10 sep 2014") });
        assert.isObject(answer);
        let { error } = answer;
        assert.isString(error);
    })




    it("Can request smth by student", async () => {
        const answer = await portal.schedule.byStudent(91743);
        assert.isArray(answer);
    });
    it("Can not request invalid date by student", async () => {
        const answer = await portal.schedule.byStudent(91743, { start : new Date("10 sep 2024"), finish: new Date("10 sep 2014") });
        assert.isObject(answer);
        let { error } = answer;
        assert.isString(error);
    })




    it("Can request smth by lecturer", async () => {
        const answer = await portal.schedule.byLecturer(26184);
        assert.isArray(answer);
    });
    it("Can not request invalid date by lecturer", async () => {
        const answer = await portal.schedule.byLecturer(26184, { start : new Date("10 sep 2024"), finish: new Date("10 sep 2014") });
        assert.isObject(answer);
        let { error } = answer;
        assert.isString(error);
    })

})