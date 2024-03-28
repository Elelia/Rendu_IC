import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Form from '../components/Form';

const setupForm = () => {
  const utils = render(<Form />);
  const getByLabelText = utils.getByLabelText;
  const getByText = utils.getByText;
  const firstNameInput = getByLabelText('First Name:');
  const lastNameInput = getByLabelText('Last Name:');
  const emailInput = getByLabelText('Email:');
  const dobInput = getByLabelText('Date of Birth:');
  const postalCodeInput = getByLabelText('Postal Code:');
  const cityInput = getByLabelText('City:');
  const saveButton = getByText('Save');
  return {
    ...utils,
    firstNameInput,
    lastNameInput,
    emailInput,
    dobInput,
    postalCodeInput,
    cityInput,
    saveButton,
  };
};

test('renders the Form component and checks for the Save button', () => {
  const { saveButton } = setupForm();
  expect(saveButton).toBeInTheDocument();
  expect(saveButton).toBeDisabled();
  expect(saveButton).toHaveClass('submit-btn');
  fireEvent.click(saveButton);
});

test('submits the form with valid data and saves it to localStorage and clears the form after a successful submission', async () => {
  const {
    firstNameInput,
    lastNameInput,
    emailInput,
    dobInput,
    postalCodeInput,
    cityInput,
    saveButton,
    getByText,
  } = setupForm();

  fireEvent.change(firstNameInput, { target: { value: 'John' } });
  fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
  fireEvent.change(dobInput, { target: { value: '2000-01-01' } });
  fireEvent.change(postalCodeInput, { target: { value: '12345' } });
  fireEvent.change(cityInput, { target: { value: 'Paris' } });

  fireEvent.click(saveButton);

  await waitFor(() => {
    expect(localStorage.getItem('formData')).toBeTruthy();
    const formData = JSON.parse(localStorage.getItem('formData'));
    expect(formData.firstName).toBe('John');
    expect(formData.lastName).toBe('Doe');
    expect(formData.email).toBe('john.doe@example.com');
    expect(formData.dateOfBirth).toBe('2000-01-01');
    expect(formData.postalCode).toBe('12345');
    expect(formData.city).toBe('Paris');
    expect(getByText('Form saved successfully!')).toBeInTheDocument();
    [firstNameInput, lastNameInput, emailInput, dobInput, postalCodeInput, cityInput].forEach(
      input => {
        expect(input.value).toBe('');
      }
    );
  });
});

test('displays an error message when the form is submitted with invalid data', async () => {
  const {
    firstNameInput,
    lastNameInput,
    emailInput,
    dobInput,
    postalCodeInput,
    cityInput,
    saveButton,
    getByText,
  } = setupForm();

  fireEvent.change(firstNameInput, { target: { value: '123' } });
  fireEvent.change(lastNameInput, { target: { value: 'Doe323' } });
  fireEvent.change(emailInput, { target: { value: 'xxxx.xxx@xxxxxxx' } });
  fireEvent.change(dobInput, { target: { value: '2010-01-01' } });
  fireEvent.change(postalCodeInput, { target: { value: '1234' } });
  fireEvent.change(cityInput, { target: { value: 'Paris@' } });

  fireEvent.click(saveButton);

  await waitFor(() => {
    const errorMessages = [
      'First name is invalid',
      'Last name is invalid',
      'Email is invalid',
      'Postal code is invalid',
      'City is invalid',
      'You must be over 18 years old',
    ];
    errorMessages.forEach(errorMessage => {
      const errorElement = getByText(errorMessage);
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveStyle('color: red');
      expect(errorElement).toHaveTextContent(errorMessage);
    });
  });
});

test('displays an error message when the form is submitted with empty data', async () => {
  const {
    firstNameInput,
    lastNameInput,
    emailInput,
    dobInput,
    postalCodeInput,
    cityInput,
    saveButton,
    getByText,
  } = setupForm();
  fireEvent.change(firstNameInput, { target: { value: ' ' } });
  fireEvent.change(lastNameInput, { target: { value: '  ' } });
  fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
  fireEvent.change(dobInput, { target: { value: '2000-01-01' } });
  fireEvent.change(postalCodeInput, { target: { value: '12345' } });
  fireEvent.change(cityInput, { target: { value: '  ' } });
  fireEvent.click(saveButton);
  await waitFor(() => {
    const errorMessages = [
      'First name is invalid',
      'Last name is invalid',
      'City is invalid',
    ];
    errorMessages.forEach(errorMessage => {
      const errorElement = getByText(errorMessage);
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveStyle('color: red');
      expect(errorElement).toHaveTextContent(errorMessage);
    });
  });
});


