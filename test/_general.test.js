const assert = require('chai').assert;

describe("General", () => {
    it("Can be loaded", () => {

        let portal = require('../portal');
        assert.isObject(portal);
        
    })
    it("Can on/off loaded", () => {

        let portal = require('../portal');
        portal.modifyon();
        portal.modifyoff();
        
    })
})