const assert = require('chai').assert;
const portal = require('../portal');

let iitii = 0; 
while(iitii++ < 2)
{

    describe("Search " + (iitii == 1 ? "[mOFF]" : "[mON]"), () => {

        it("Can search by student", async () => {
            const answer = await portal.search.byStudent("Сидоров");
            assert.isArray(answer);
            assert.isAbove(answer.length, 0);
            assert.equal(answer[0].id,"146191")
        })

        it("Can search by group", async () => {
            const answer = await portal.search.byGroup("382003-2");
            assert.isArray(answer);
            assert.equal(answer.length, 3);
            assert.equal(answer[0].id,"33626")
        })

        it("Can search by lecturer", async () => {
            const answer = await portal.search.byLecturer("Сысоев Александр Владимирович");
            assert.isArray(answer);
            assert.equal(answer.length, 1);
            assert.equal(answer[0].id,"26184")
        })

        it("Can search by auditorium", async () => {
            const answer = await portal.search.byAuditorium("314");
            assert.isArray(answer);
            assert.equal(answer.length, 13);
            assert.equal(answer[0].id,"2859")
        })

    })

}