const Manager = require("../lib/Manager");

describe("Manager Class", () => {
  const manager = new Manager("Oliver Drew", 10, "oli-webdev@protonmail.com");

  describe("getName function", () => {
    it("Returns the Manager's name", () => {
      expect(manager.getName()).toBe("Oliver Drew");
    });
  });

  describe("getId function", () => {
    it("Returns the Manager's ID", () => {
      expect(manager.getId()).toBe(10);
    });
  });

  describe("getEmail function", () => {
    it("Returns the Manager's Email address", () => {
      expect(manager.getEmail()).toBe("oli-webdev@protonmail.com");
    });
  });

  describe("getRole function", () => {
    it("Returns the Manager's Role", () => {
      expect(manager.getRole()).toBe("Manager");
    });
  });
});
