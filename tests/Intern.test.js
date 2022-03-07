const Intern = require("../lib/Intern");

describe("Intern Class", () => {
  const intern = new Intern("Oliver Drew", 10, "oli-webdev@protonmail.com");

  describe("getName function", () => {
    it("Returns the Intern's name", () => {
      expect(intern.getName()).toBe("Oliver Drew");
    });
  });

  describe("getId function", () => {
    it("Returns the Intern's ID", () => {
      expect(intern.getId()).toBe(10);
    });
  });

  describe("getEmail function", () => {
    it("Returns the Intern's Email address", () => {
      expect(intern.getEmail()).toBe("oli-webdev@protonmail.com");
    });
  });

  describe("getRole function", () => {
    it("Returns the Intern's Role", () => {
      expect(intern.getRole()).toBe("Intern");
    });
  });
});
