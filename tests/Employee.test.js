const Employee = require("../lib/Employee");

describe("Employee Class", () => {
  const employee = new Employee("Oliver Drew", 10, "oli-webdev@protonmail.com");

  describe("getName function", () => {
    it("Returns the Employee's name", () => {
      expect(employee.getName()).toBe("Oliver Drew");
    });
  });

  describe("getId function", () => {
    it("Returns the Employee's ID", () => {
      expect(employee.getId()).toBe(10);
    });
  });

  describe("getEmail function", () => {
    it("Returns the Employee's Email address", () => {
      expect(employee.getEmail()).toBe("oli-webdev@protonmail.com");
    });
  });

  describe("getRole function", () => {
    it("Returns the Employee's Role", () => {
      expect(employee.getRole()).toBe("Employee");
    });
  });
});
