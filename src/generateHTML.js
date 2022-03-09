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
const generateCards = (team) => {
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

module.exports = {
  createManager,
  createEngineer,
  createIntern,
  generateCards,
};
