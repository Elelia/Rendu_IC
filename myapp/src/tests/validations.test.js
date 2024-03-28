import {
    isValidName,
    isValidEmail,
    isValidPostalCode,
    isOver18,
    isValidCity,
    isNotEmpty,
  } from "../utils/validations";

/**
 * test suite for the validation functions
 * @functions isValidName, isValidEmail, isValidPostalCode, isOver18 
 * @param {string} name
 * @param {string} email
 * @param {string} postalCode
 * @param {string} dateOfBirth
 * @returns {boolean}
 * @module validations.test
 * @requires isValidName
 * @requires isValidEmail
 * @requires isValidPostalCode
 * @requires isOver18
 */
  
  describe("isValidName", () => {
    it("should return true for valid names", () => {
      expect(isValidName("John")).toBe(true);
      expect(isValidName("D'Angelo")).toBe(true);
      expect(isValidName("Jean-Luc")).toBe(true);
      expect(isValidName("Marie-Laure")).toBe(true);
    });
  
    it("should return false for invalid names", () => {
      expect(isValidName("123")).toBe(false);
      expect(isValidName("John@Doe")).toBe(false);
      expect(isValidName("Jean!")).toBe(false);
    });
  });
  describe("isValidCity", () => {
    it("should return true for valid cities", () => {
      expect(isValidCity("Paris")).toBe(true);
      expect(isValidCity("New York")).toBe(true);
      expect(isValidCity("Los Angeles")).toBe(true);
      expect(isValidCity("San Francisco")).toBe(true);
    });
  
    it("should return false for invalid cities", () => {
      expect(isValidCity("123")).toBe(false);
      expect(isValidCity("Paris@")).toBe(false);
      expect(isValidCity("Los Angeles!")).toBe(false);
    });
  });
  
  describe("isValidEmail", () => {
    it("should return true for valid emails", () => {
      expect(isValidEmail("john@example.com")).toBe(true);
      expect(isValidEmail("john.doe@example.co.uk")).toBe(true);
    });
  
    it("should return false for invalid emails", () => {
      expect(isValidEmail("john@example")).toBe(false);
      expect(isValidEmail("john@example@com")).toBe(false);
    });
  });
  
  describe("isValidPostalCode", () => {
    it("should return true for valid French postal codes", () => {
      expect(isValidPostalCode("75001")).toBe(true);
      expect(isValidPostalCode("13008")).toBe(true);
    });
  
    it("should return false for invalid postal codes", () => {
      expect(isValidPostalCode("123456")).toBe(false);
      expect(isValidPostalCode("ABC12")).toBe(false);
    });
  });
  
  describe("isOver18", () => {
    it("should return correct age for given date of birth", () => {
      expect(isOver18("2000-01-01")).toBeGreaterThanOrEqual(18);
      expect(isOver18("2012-01-01")).toBeLessThan(18);
    });
    it("should return age minus 1 if the birthday hasn't happened yet", () => {
      expect(isOver18("2006-07-02")).toBe(17);
    });
  });

  describe("isNotEmpty", () => {
    it("should return true for valid inputs", () => {
      expect(isNotEmpty("John")).toBe(true);
      expect(isNotEmpty("Doe")).toBe(true);
    });
    it("should return false for invalid inputs", () => {
      expect(isNotEmpty("")).toBe(false);
    });
  });
  