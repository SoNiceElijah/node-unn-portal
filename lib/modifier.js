const helper = require('./helper');

const LEC_TYPES = [
    262,
    264,
    263,
    271, // Консультация
    266, // Экзамен
];

const EMOJI_BM = {
    t262 : "&#128215;",
    t264 : "&#128217;",
    t263 : "&#128216;",
    t271 : "&#128214;",
    t266 : "&#128213;",
    undef : "&#128211;"
}

const EMOJI_SM = {
    t262 : "&#127797;",
    t264 : "&#128312;",
    t263 : "&#128313;",
    t271 : "&#128196;",
    t266 : "&#127822;",
    undef : "&#9642;"
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
];

function innermodel(e)
{
    let teachersign = e.lecturer.trim().split(' ');
    let tsign = teachersign[0];
    
    if(teachersign[1]) tsign += ' ' + teachersign[1][0];
    if(teachersign[2]) tsign += '.' + teachersign[2][0] + '.';

    let today = new Date();
    let target = new Date(e.date);

    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    let istoday = helper.buildDateString(today) == e.date;

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
        sm : EMOJI_SM['t' + e.kindOfWorkOid] ? EMOJI_SM['t' + e.kindOfWorkOid] : EMOJI_SM['undef'],
        bm : EMOJI_BM['t' + e.kindOfWorkOid] ? EMOJI_BM['t' + e.kindOfWorkOid] : EMOJI_BM['undef'],
        today : istoday,
        tm : istoday ? '&#11088;' : '&#128198;',
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
        readabledate : d[2].replace(/^0+/g,'') + ' ' + MONTHS[parseInt(d[1], 10) - 1] + ' ' + d[0],
        distance : Math.floor((target.getTime() - today.getTime()) / (1000 * 3600 * 24))
    };

    return obj;
}

function $m(data) {

    if(!Array.isArray(data)) return data;
    return data.map(innermodel);;

}

module.exports = {
    
    $m,

    on : () => MODIFYON = true,
    off : () => MODIFYON = false

}
