'use strict';
require('dotenv').config();
const {initDatabase: connectToDB} = require('../src/models');
const {initializeApi, initializeServices} = require('../app');
const logger = require('../src/utils/logger');

return connectToDB()
    .then(() => {
        logger.info('Connected to database');
        return initializeApi();
    })
    .then((application) => {
        application.listen(process.env.SERVER_PORT);
        logger.info('Server listening on port ' + process.env.SERVER_PORT);
				return initializeServices();
    })
    .catch((error) => {
        logger.error('APP STOPPED');
        logger.error(error.message);
        logger.error(error.stack);
        process.exit(1);
    });
