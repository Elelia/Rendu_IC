// jsdoc
/**
 * @function isValidName
 * @param {string} name
 * @returns {boolean}
 */
/**
 * @function isValidCity
 * @param {string} city
 * @returns {boolean}
 */
/**
 * @function isValidEmail
 * @param {string} email
 * @returns {boolean}
 */
/**
 * @function isValidPostalCode
 * @param {string} postalCode
 * @returns {boolean}
 */
/**
 * @function isOver18
 * @param {string} dateOfBirth
 * @returns {boolean}
 */


export const isValidName = (name) => {
    const nameRegex = /^[a-zA-ZÀ-ÿ\-'|\s]+$/;
    return nameRegex.test(name);
  };
  export const isValidCity = (city) => {
    const nameRegex = /^[a-zA-ZÀ-ÿ\-'|\s]+$/;
    return nameRegex.test(city);
  };
  
  export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const isValidPostalCode = (postalCode) => {
    const postalCodeRegex = /^(?:[0-8]\d|9[0-8])\d{3}$/;
    return postalCodeRegex.test(postalCode);
  };
  
  export const isOver18 = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  export const isNotEmpty = (value) => {
    return value.trim() !== "";
  };
  