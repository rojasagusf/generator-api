'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
    prompting() {
        this.log(
            yosay(
                `Welcome to terrorific ${chalk.white.bgRed.bold(
                    'Rojas'
                )} ${chalk.black.strikethrough.bgWhite('Express api generator')}`
            )
        );

        const prompts = [
            {
                type: 'input',
                name: 'projectName',
                message: 'Name of the project:',
                default: 'express-api'
            },
            {
                type: 'confirm',
                name: 'withSchedule',
                message: 'Would you like to use schedules?',
                default: false
            },
            {
                type: 'confirm',
                name: 'withAuth',
                message: 'Would you like to use authentication?',
                default: false
            }
        ];

        return this.prompt(prompts).then((props) => {
            this.props = props;
        });
    }

    writing() {
        this.destinationRoot(this.props.projectName);
        const templateData = {
            projectName: this.props.projectName,
            appInitializePrivateRoutes: '',
            appAfterInitializePrevRoutes: '',
            appRequires: '',
            appFunctions: '',
            appExports: '',
            packagejsonDependences: '',
            packagejsonDevDependences: '',
            authMockRequires: ''
        };

        if (this.props.withSchedule) {
            this.sourceRoot(this.sourceRoot() + '/../01-schedules');
            this.fs.copyTpl(
                this.templatePath('.'),
                this.destinationPath('.'),
                templateData,
                {},
                {globOptions: {dot: true}}
            );
            templateData.appRequires += `
const scheduleRunner = require('./src/utils/schedule-runner');`;
            templateData.packagejsonDependences += `,
			"node-schedule": "^2.1.1"`;
            templateData.appFunctions += 'scheduleRunner();';
        }

        if (this.props.withAuth) {
            this.sourceRoot(this.sourceRoot() + '/02-auth');
            this.fs.copyTpl(
                this.templatePath('.'),
                this.destinationPath('.'),
                templateData,
                {},
                {globOptions: {dot: true}}
            );
            templateData.packagejsonDependences += `,
			"jsonwebtoken": "^9.0.2";`;
            templateData.appRequires += `
			const publicPaths = require('./config/public-paths');
			const extractJwt = require('./src/utils/extract-jwt');`;
            templateData.appAfterInitializePrevRoutes += `
			app.get(publicPaths.regex('get'), extractJwt);
			app.put(publicPaths.regex('put'), extractJwt);
			app.post(publicPaths.regex('post'), extractJwt);
			app.delete(publicPaths.regex('delete'), extractJwt);`;
            templateData.authMockRequires += `
			const realJWT = require('jsonwebtoken');
			const jsonwebtokenMock = require('../mocks/jsonwebtoken-mock')(realJWT);
			mockery.registerMock('jsonwebtoken', jsonwebtokenMock);`;
        }

        this.sourceRoot(this.sourceRoot() + '/../00-basic');
        this.fs.copyTpl(
            this.templatePath('.'),
            this.destinationPath('.'),
            templateData,
            {},
            {globOptions: {dot: true}}
        );
    }
};
