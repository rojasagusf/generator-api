'use strict';
const app = require('../mocks/app');
require('should');

describe('Database - connect', () => {
    beforeAll(() => {
        return app.initDb();
    }, 30000);

    afterAll(() => {
        return app.finish();
    });

    it('Should connect database', () => {
        expect(true).toBe(true);
    });
});
