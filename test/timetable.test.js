const assert = require('chai').assert;
const portal = require('../portal');

const methods = [
    'today',
    'tommorow',
    'weekAligned',
    'week',
    'week2Aligned',
    'week2'
]

const ids = { 
    byGroup : 25009,
    byAuditorium : 2859,
    byStudent : 91743,
    byLecturer : 26184,
}

let iitii = 0; 
while(iitii++ < 2)
{

    describe("Timetable " + (iitii == 1 ? "[mOFF]" : "[mON]"), () => {

        for(const component in portal.timetable) {

            for(const method of methods)
            {
                it(`Can get ${method} by ${component}`, async () => {
                    const answer = await portal.timetable[component](ids[component],{ lng : 1 })[method]();
                    assert.isNotNull(answer);
                    let { error } = answer;
                    assert.isUndefined(error);
                });
            }
        }
    })

    portal.modifyon();
}