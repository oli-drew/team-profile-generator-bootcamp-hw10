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
      name: "name",
      message: "Hi, what is the team manager's name?",
      validate: validateResponse,
    },
    {
      type: "input",
      name: "id",
      message: "What is the employee ID of the manager?",
      validate: validateResponse,
    },
    {
      type: "input",
      name: "email",
      message: "What is the manager's email address?",
      validate: validateEmail,
    },
    {
      type: "input",
      name: "officeNumber",
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
    inputs[0].name,
    inputs[0].id,
    inputs[0].email,
    inputs[0].officeNumber
  );
  team.push(managerProfile);
  if (inputs[0].nextOption === "Add Employee") {
    addEmployee();
  } else {
    generateTeam();
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

// Collect information on other employees
const employeeInfo = async (userInputs = []) => {
  // Array of questions to ask
  const questions = [
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
      type: "list",
      name: "addEmployee",
      message: "Would you like to add another employee to your team?",
      choices: ["Yes", "Nope"],
    },
  ];

  // Collect answers in the newInputs array
  const { again, ...answers } = await inquirer.prompt(questions);
  const newInputs = [...userInputs, answers];
  return again ? collectInputs(newInputs) : newInputs;
};

// Collect other employee info
async function addEmployee() {
  let inputs = await employeeInfo();
  inputs = inputs[0];
  // Add the Engineer
  if (inputs.profileType === "Add an Engineer") {
    console.log("Engineer added");
    const engineerProfile = new Engineer(
      inputs.name,
      inputs.id,
      inputs.email,
      inputs.github
    );
    team.push(engineerProfile);
    // Add the intern
  } else if (inputs.profileType === "Add an Intern") {
    console.log("Intern added");
    const internProfile = new Intern(
      inputs.name,
      inputs.id,
      inputs.email,
      inputs.school
    );
    team.push(internProfile);
  }

  if (inputs.addEmployee === "Yes") {
    console.log("add another employee");
    addEmployee();
  } else {
    // Make the html profile
    console.log(chalk.green.bold("HTML Profile Generated!"));
    generateTeam();
  }
}

const generateTeam = function () {
  console.log(chalk.green.bold("Your team has been generated!"));
  fs.writeFileSync("./dist/sample.html", generateHTML(), "utf-8");
};

// Manager card
const createManager = (manager) => {
  return `
    <div class="col">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h5 class="card-title">${manager.name}</h5>
          <h6 class="mb-0">
            <span class="material-icons align-middle"> groups </span>
            <span>Manager</span>
          </h6>
        </div>
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: <span>${manager.id}</span></li>
            <li class="list-group-item">
              Email:
              <a href="mailto:${manager.email}"
                >${manager.email}</a
              >
            </li>
            <li class="list-group-item">Office Number: <span>${manager.officeNumber}</span></li>
          </ul>
        </div>
      </div>
    </div>`;
};

// Engineer card
const createEngineer = (engineer) => {
  return `
    <div class="col">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h5 class="card-title">${engineer.name}</h5>
          <h6 class="mb-0">
            <span class="material-icons align-middle"> engineering </span>
            <span>Engineer</span>
          </h6>
        </div>
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: <span>${engineer.id}</span></li>
            <li class="list-group-item">
              Email:
              <a href="mailto:${engineer.email}"
                >${engineer.email}</a
              >
            </li>
            <li class="list-group-item">GitHub Profile: <a href="https://www.github.com/${engineer.github}" target="_blank"> ${engineer.github}</a></li>
          </ul>
        </div>
      </div>
    </div>`;
};

// Intern card
const createIntern = (intern) => {
  return `
    <div class="col">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h5 class="card-title">${intern.name}</h5>
          <h6 class="mb-0">
            <span class="material-icons align-middle"> school </span>
            <span>Intern</span>
          </h6>
        </div>
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: <span>${intern.id}</span></li>
            <li class="list-group-item">
              Email:
              <a href="mailto:${intern.email}"
                >${intern.email}</a
              >
            </li>
            <li class="list-group-item">School: <span>${intern.school}</span></li>
          </ul>
        </div>
      </div>
    </div>`;
};

// Generate cards HTML
const buildTeam = (team) => {
  let htmlCards = "";
  team
    .filter((employee) => employee.getRole() === "Manager")
    .map((manager) => (htmlCards += createManager(manager)));
  team
    .filter((engineer) => engineer.getRole() === "Engineer")
    .map((engineer) => (htmlCards += createEngineer(engineer)));
  team
    .filter((intern) => intern.getRole() === "Intern")
    .map((intern) => (htmlCards += createIntern(intern)));
  return htmlCards;
};

// Generate HTML
const generateHTML = () => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Team Profile</title>
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <header class="p-5 mb-4 bg-light rounded-3">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">Team Profile</h1>
        <p class="col-md-8 fs-4">
          Information about my software engineering team
        </p>
      </div>
    </header>
    <!-- Card container -->
    <main class="container pb-4">
      <div class="row row-cols-1 row-cols-md-2 g-4">
        <!-- Cards here -->
        ${buildTeam(team)}
      </div>
    </main>
  </body>
</html>`;
};
