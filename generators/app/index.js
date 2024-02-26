"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
	prompting() {
		this.log(
			yosay(
				`Welcome to terrorific ${chalk.white.bgRed.bold("Roja's")} ${chalk.black.strikethrough.bgWhite(
					"Express api generator"
				)}`
			)
		);

		const prompts = [
			{
				type: "input",
				name: "nameProject",
				message: "Name of the project:",
				default: "express-api"
			},
			{
				type: "confirm",
				name: "typescriptAnswer",
				message: "Would you like to use Typescript?",
				default: false
			},
			{
				type: "list",
				name: "databaseChoice",
				message: "What database type would you like to",
				choices: [
					{
						name: 'MongoDb',
						value: 'mongo'
					},
					{
						name: 'MySQL',
						value: 'mysql'
					},
					{
						name: 'PostgreSQL',
						value: 'psql'
					}
				]
			},
			{
				type: "list",
				name: "ODM",
				message: "What ODM for mongo you use?",
				choices: [
					{
						name: 'Mongoose',
						value: 'mongoose'
					},
				],
				when: answers => answers.databaseChoice.includes('mongo')
			},
			{
				type: "list",
				name: "ORM",
				message: "What ORM for your SQL database use?",
				choices: [
					{
						name: 'Sequelize',
						value: 'sequelize'
					},
					{
						name: 'Prisma',
						value: 'prisma'
					}
				],
				when: answers => answers.databaseChoice.includes('mysql') || answers.databaseChoice.includes('psql')
			}
		];

		return this.prompt(prompts).then(props => {
			this.props = props;
		});
	}

	writing() {
		const vars = {

		};


		this.fs.copy(
			this.templatePath("."),
			this.destinationPath(`./${this.props.nameProject}/`),
			vars,
			{},
			{globOptions: {dot: true}}
		);
	}

	install() {
		this.installDependencies();
	}
};
