const inquirer = require("inquirer");
const fs = require("fs");
const chalk = require("chalk");
const figlet = require("figlet");
const emailValidator = require("email-validator");

const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
