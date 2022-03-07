const Engineer = require("../lib/Engineer");

describe("Engineer Class", () => {
  const engineer = new Engineer("Oliver Drew", 10, "oli-webdev@protonmail.com");

  describe("getName function", () => {
    it("Returns the Engineer's name", () => {
      expect(engineer.getName()).toBe("Oliver Drew");
    });
  });

  describe("getId function", () => {
    it("Returns the Engineer's ID", () => {
      expect(engineer.getId()).toBe(10);
    });
  });

  describe("getEmail function", () => {
    it("Returns the Engineer's Email address", () => {
      expect(engineer.getEmail()).toBe("oli-webdev@protonmail.com");
    });
  });

  describe("getRole function", () => {
    it("Returns the Engineer's Role", () => {
      expect(engineer.getRole()).toBe("Engineer");
    });
  });
});
