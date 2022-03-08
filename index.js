const inquirer = require("inquirer");
const fs = require("fs");
const chalk = require("chalk");
const figlet = require("figlet");
const emailValidator = require("email-validator");

const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");

// Array to store the team
const team = [];

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
const managerInfo = async (userInputs = []) => {
  // Array of questions to ask
  const questions = [
    {
      type: "input",
      name: "managerName",
      message: "Hi, what is the team manager's name?",
      validate: validateResponse,
    },
    {
      type: "input",
      name: "managerID",
      message: "What is the employee ID of the manager?",
      validate: validateResponse,
    },
    {
      type: "input",
      name: "managerEmail",
      message: "What is the manager's email address?",
      validate: validateEmail,
    },
    {
      type: "input",
      name: "managerOfficeNumber",
      message: "What is the manager's office number?",
      validate: validateResponse,
    },
    {
      type: "list",
      name: "nextOption",
      message: "What would you like to do next?",
      choices: ["Add Employee", "Finish building team"],
    },
  ];

  // Collect answers in the newInputs array
  const { again, ...answers } = await inquirer.prompt(questions);
  const newInputs = [...userInputs, answers];
  return again ? collectInputs(newInputs) : newInputs;
};

// Collect manager info
async function init() {
  const inputs = await managerInfo();
  const managerProfile = new Manager(
    inputs[0].managerName,
    inputs[0].managerID,
    inputs[0].managerEmail,
    inputs[0].managerOfficeNumber
  );
  team.push(managerProfile);
  if (inputs[0].nextOption === "Add Employee") {
    addEmployee();
  } else {
    generateHTML();
  }
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

//
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "profileType",
        message:
          "Select the type of employee you would like to add from the list:",
        choices: ["Add an Engineer", "Add an Intern"],
      },
      {
        type: "input",
        name: "name",
        message: "What is your employees name?",
        validate: validateResponse,
      },
      {
        type: "input",
        name: "id",
        message: "Please enter your employees ID",
        validate: validateResponse,
      },
      {
        type: "input",
        name: "email",
        message: "Please enter your employees email address",
        validate: validateEmail,
      },
      {
        type: "input",
        name: "github",
        message: "Please enter your Engineer's GitHub username",
        when: (answers) => answers.profileType === "Add an Engineer",
        validate: validateResponse,
      },
      {
        type: "input",
        name: "school",
        message: "Please enter the school name your Intern attended",
        when: (answers) => answers.profileType === "Add an Intern",
        validate: validateResponse,
      },
      {
        type: "confirm",
        name: "addEmployee",
        message: "Would you like to add another employee to your team?",
      },
    ])

    //
    .then((answers) => {
      if (answers.profileType === "Add an Engineer") {
        const engineerProfile = new Engineer(
          answers.name,
          answers.id,
          answers.email,
          answers.github
        );
        team.push(engineerProfile);
      } else if (answers.profileType === "Add an Intern") {
        const internProfile = new Intern(
          answers.name,
          answers.id,
          answers.email,
          answers.school
        );
        team.push(internProfile);
      }

      if (answers.addEmployee === true) {
        addEmployee();
      } else {
        // Make the html profile
        console.log(chalk.green.bold("HTML Profile Generated!"));
        generateHTML();
      }
    });
};

const generateHTML = function () {
  console.log(`Team Array: ${team}`);
};
