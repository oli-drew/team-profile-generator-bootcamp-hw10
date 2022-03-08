const inquirer = require("inquirer");
const fs = require("fs");
const chalk = require("chalk");
const figlet = require("figlet");
const emailValidator = require("email-validator");

const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");

// Exit application
const exitGenerator = (message) => {
  console.log(
    chalk.yellow(
      figlet.textSync(message, {
        font: "Small",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
};

// Ask the user if they would like to start or exit
const startGenerator = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "start",
        message: "Shall we start building your team?",
        choices: ["Yes, Please!", "Nah, I'm a lone wolf!"],
      },
    ])
    .then((data) => {
      const answer = data.start;
      if (answer === "Yes, Please!") {
        console.log(chalk.green.bold("Okay, let's do this!", "\n"));
        // Start asking questions
        init();
      } else {
        exitGenerator("Bye Bye!");
      }
    });
};

// Introduce Application
const applicationIntro = () => {
  console.log(
    chalk.green(
      figlet.textSync("Team Profile Generator", {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
  console.log(
    chalk.bgGreen.bold.white(
      "----- Generate a HTML webpage to display the structure of your software team -----",
      "\n"
    )
  );
  startGenerator();
};

applicationIntro();

// Collect answers asynchronously
const collectInfo = async (userInputs = []) => {
  // Array of questions to ask
  const questions = [
    {
      type: "input",
      name: "userName",
      message: "Hi Boss, what is your name?",
      validate: validateResponse,
    },
    {
      type: "input",
      name: "ID",
      message: "What is your employee ID?",
      validate: validateResponse,
    },
    {
      type: "input",
      name: "email",
      message: "What is your email address?",
      validate: validateEmail,
    },
    {
      type: "input",
      name: "officeNumber",
      message: "What is your office number?",
      validate: validateResponse,
    },
    {
      type: "list",
      name: "nextOption",
      message: "?",
      choices: ["Engineer", "Intern", "Finish building team"],
    },
  ];

  // Collect answers in the newInputs array
  const { again, ...answers } = await inquirer.prompt(questions);
  const newInputs = [...userInputs, answers];
  return again ? collectInputs(newInputs) : newInputs;
};

// Run the collectAnswers function and write to file
async function init() {
  const inputs = await collectInfo();
}

// Validate Response
const validateResponse = (response) => {
  if (!response) {
    return chalk.red("You have to type something!");
  }
  return true;
};

// Validate email address
const validateEmail = (response) => {
  if (emailValidator.validate(response)) {
    return true;
  } else {
    return chalk.red("That's not a valid email address");
  }
};
