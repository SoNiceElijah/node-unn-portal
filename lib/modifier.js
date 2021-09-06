
const helper = require('./helper');

let MODIFYON = false;
let INNERLOCK = false;

const LEC_TYPES = [
    262,
    264,
    263,
    271, // Консультация
    266, // Экзамен
];

const EMOJI = {
    t262 : '&#128215;',
    t264 : "&#128217;",
    t263 : "&#128216;",
    t271 : "&#128214;",
    t266 : "&#128213;",
    undef : "&#128211;"
}

const MONTHS = [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек'
]

function recombine(array)
{
    if(!array || !array.length) return [];
    
    let blocks = [];

    while(array.length)
    {
        let line = [array.shift()];
        while(array.length && line[0].date === array[0].date) 
            line.push(array.shift())

        blocks.push(line);
    }

    return blocks;
}

function innermodel(e)
{
    let teachersign = e.lecturer.trim().split(' ');
    let tsign = teachersign[0];
    if(teachersign[1]) tsign += ' ' + teachersign[1][0];
    if(teachersign[2]) tsign += '.' + teachersign[2][0] + '.';

    let d = e.date.split('.');
    let obj = {
        id : e.disciplineOid,
        from : e.beginLesson,
        to : e.endLesson,
        num : e.lessonNumberStart,
        type : LEC_TYPES.indexOf(e.kindOfWorkOid),
        typename : e.kindOfWork,
        name : e.discipline,
        rootname : e.discipline.match(/[^\)]+(\(|$)/gu).join('').replace(/\(/gu,''),
        teacher : e.lecturer,
        tsign : tsign,
        emoji : EMOJI['t' + e.kindOfWorkOid] ? EMOJI['t' + e.kindOfWorkOid] : EMOJI['undef'],
        place : e.auditorium,
        building : e.building,
        sub : e.subGroup,
        date : e.date,
        day : e.dayOfWeekString,
        dnum : e.dayOfWeek,
        short : e.discipline
            .match(/[^\)]+(\(|$)/gu).join('').replace(/\(/gu,'')
            .match(/(?<=[\s,.:;"']|^)([а-яА-Я]|[a-zA-Z])/gu).join('')
            .toUpperCase(),
        readabledate : d[2].replace(/^0+/g,'') + ' ' + MONTHS[parseInt(d[1], 10) - 1] + ' ' + d[0] 
    };

    return obj;
}

function extend(blocks)
{
    let model = [];

    for(let block of blocks)
    {
        let first = block[0];
        let info = {
            day : first.day,
            date : first.date,
            today : first.date === helper.buildDateString(new Date()),
            readabledate : first.readabledate,
            content : block
        }

        model.push(info);
    }

    return model;
}

function $m(data) {

    if(!MODIFYON || INNERLOCK) return data;
    if(!Array.isArray(data)) return data;

    data = data.map(innermodel);
    data = recombine(data);
    data = extend(data);

    return data;

}

function $mm(data) {

    if(!Array.isArray(data)) return data;
    return data.map(innermodel);;

}

module.exports = {
    $m,
    $mm,
    on : () => MODIFYON = true,
    off : () => MODIFYON = false,

    inneron : () => INNERLOCK = true,
    inneroff : () => INNERLOCK = false
}
