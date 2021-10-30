const assert = require('chai').assert;
const portal = require('../portal');

const noargsmethods = [
    'summerExam',
    'winterExam',    
]

const nameargmethods = [
    'week2name'
]

const dateargmethods = [
    'date'
]

const ids = { 
    byGroup : 33626,
    byAuditorium : 2859,
    byStudent : 91743,
    byLecturer : 26184,
}

let iitii = 0; 
while(iitii++ < 2)
{

    describe("Extensions " + (iitii == 1 ? "[mOFF]" : "[mON]"), () => {

        if(iitii == 2) before(() => portal.modifyon())

        for(const component in portal.timetable) {

            for(const method of noargsmethods)
            {
                it(`Can get no args ${method} by ${component}`, async () => {
                    const answer = await portal.timetable[component](ids[component])[method]();
                    assert.isNotNull(answer);
                    assert.isDefined(answer);
                    let { error } = answer;
                    assert.isUndefined(error);
                });
            }

            for(const method of nameargmethods)
            {
                it(`Can get name args ${method} by ${component}`, async () => {
                    const answer = await portal.timetable[component](ids[component])[method]("АиСД");
                    assert.isNotNull(answer);
                    assert.isDefined(answer);
                    let { error } = answer;
                    assert.isUndefined(error);
                });
            }

            for(const method of dateargmethods)
            {
                it(`Can get date args ${method} by ${component}`, async () => {
                    const answer = await portal.timetable[component](ids[component])[method](new Date());
                    assert.isNotNull(answer);
                    assert.isDefined(answer);
                    let { error } = answer;
                    assert.isUndefined(error);
                });
            }
        }
    })

}