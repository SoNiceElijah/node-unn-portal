# node-unn-portal
![npm](https://img.shields.io/npm/v/node-unn-portal) ![Travis (.org)](https://img.shields.io/travis/soniceelijah/node-unn-portal) ![NPM](https://img.shields.io/npm/l/node-unn-portal)

NodeJS axios-based unn portal SDK

## Install

```shell
$ npm i node-unn-portal -S
```

## Usage

```js
const portal = require('node-unn-portal')

portal.search.byGroup("382003-2")
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });

```

## Documentation

### URL

Request base url can be specified.

```js
const { base } = require('node-unn-portal');
base(url);
// Do portal things....
```

### Search

Gets objects from human readable names.

```js
const { search } = require('node-unn-portal');
```

**Methods:**

1. ```byStudent(name:string)```
2. ```byGroup(name:string)```
3. ```byLecturer(name:string)```
4. ```byAuditorium(name:string)```

### Schedule

Gets schedule from inner portal IDs.

```js
const { schedule } = require('node-unn-portal');
```

**Methods:**

1. ```byStudent(id:number|string)```
2. ```byGroup(id:number|string)```
3. ```byLecturer(id:number|string)```
4. ```byAuditorium(id:number|string)```

### Timetable

Gets timetable from inner portal IDs.

```js
const { timetable } = require('node-unn-portal');


// Methods like in schedule
const {
    byStudent,
    byGroup,
    byLecturer,
    byAuditorium
} = timetable;

```

**Methods:**

1. ```today()```
2. ```tommorow()```
3. ```weekAligned()```
4. ```week()```
5. ```week2Aligned()```
6. ```week2()```
7. ```when()```
8. ```where()```

**Example:**

```js
const response = await portal.timetable.byGroup(portal_group_id).today();
```

Aligned methods get current week. Not aligned methods get 7 days from today

## License

MIT.
