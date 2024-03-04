'use strict';
// Const schedule = require('node-schedule');
// const runningSchedules = new Set();

/*
const runSchedule = (name, callback) => {
    if (runningSchedules.has(name)) {
        return null;
    }

    runningSchedules.add(name);
    return callback()
        .then(() => {
            return null;
        })
        .catch(() => {
            runningSchedules.delete(name);
        });
};
*/
const initSchedules = () => {
    /*
		Schedule.scheduleJob(' * * * * *', () => {
				runSchedule('scheduleName', scheduleFunction);
		})

	*/
};

module.exports = initSchedules;
