import React, { useState } from "react";
import {
  isValidName,
  isValidEmail,
  isValidPostalCode,
  isOver18,
  isValidCity,
  isNotEmpty,
} from "../utils/validations";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/Form.css";

/**
 * Form component
 * @typedef {Object} FormData
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} dateOfBirth
 * @property {string} city
 * @property {string} postalCode
 */

const Form = () => {

  const [errors, setErrors] = useState({});
  // const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const isFormValid = () => {
    return (!formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    !formData.dateOfBirth ||
    !formData.postalCode)
};
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validation
    if (!isValidName(formData.firstName)|| !isNotEmpty(formData.firstName)) {
      newErrors.firstName = "First name is invalid";
    }
    if (!isValidName(formData.lastName) || !isNotEmpty(formData.lastName)){
      newErrors.lastName = "Last name is invalid";
    }
    if(!isValidCity(formData.city) || !isNotEmpty(formData.city)){
      newErrors.city = "City is invalid";
    }

    if (!isValidEmail(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!isValidPostalCode(formData.postalCode)) {
      newErrors.postalCode = "Postal code is invalid";
    }
    if (isOver18(formData.dateOfBirth) < 18) {
      newErrors.dateOfBirth = "You must be over 18 years old";
    }
  

    if (Object.keys(newErrors).length > 0) {
      Object.keys(newErrors).forEach((key) => {
        toast.error(newErrors[key]+" !");
        setErrors(newErrors);
      });
    } else {
      localStorage.setItem("formData", JSON.stringify(formData));
      toast.success("Form saved successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        city: "",
        postalCode: "",
      });
      setErrors({});
    }
  };

  return (
    <>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    >
    </ToastContainer>
    <form onSubmit={handleSubmit} className="form-container">
        <h3>User Registration</h3>
        <div className="Name">
      <div className="label-input">
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <span style={{ color: "red" }}>{errors.firstName}</span>}
        </label>
        <label >
          Last Name:
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span style={{ color: "red" }}>{errors.lastName}</span>}
        </label>
        </div>
      </div>
      <div className="label-input">
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          {errors.dateOfBirth && <span style={{ color: "red" }}>{errors.dateOfBirth}</span>}
        </label>
      </div>
      <div className="label-input">
        <label>
          City:
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && <span style={{ color: "red" }}>{errors.city}</span>}
        </label>
        <label>
          Postal Code:
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
          />
          {errors.postalCode && <span style={{ color: "red" }} >{errors.postalCode}</span>}
        </label>
      </div>
      <button
        type="submit"
        style={ isFormValid () ? {backgroundColor: "grey"} : {backgroundColor: "#ae3c33"}}
        disabled={isFormValid()}
        className="submit-btn"
      >
        Save
      </button>
    </form>
    </>
    );
}

export default Form;
