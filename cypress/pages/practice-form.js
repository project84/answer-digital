import dayjs from 'dayjs';

import * as table from '../pages/components/table';
import * as datePicker from '../pages/components/date-picker';
import * as modal from '../pages/components/modals';

import defaultValues from '../fixtures/practice-form/default-values.json';
import fieldTypes from '../fixtures/practice-form/field-types.json';
import submissionMapping from '../fixtures/practice-form/submission-mapping.json';

/* Page element selectors */
/* Basic page attributes */
export const url = 'automation-practice-form';
export const pageTitle = 'Practice Form';

/* Form elements */
export const form = {
	firstName: '#firstName',
	lastName: '#lastName',
	email: '#userEmail',
	gender: '[type="radio"]',
	mobile: '#userNumber',
	dob: '#dateOfBirthInput',
	subjects: '#subjectsContainer',
	subjectsDropDown: '.subjects-auto-complete__menu',
	hobbies: '[type="checkbox"]',
	picture: '#uploadPicture',
	address: '#currentAddress',
	state: '#state',
	city: '#city'
}

export const submitButton = '#submit';

/**
 * Fill the practice form with default or supplied values
 * @param {object} formValues 
 */
export function fill(formValues = defaultValues) {

	// Enter specified value for each text input
	fieldTypes.text.forEach(field => {
		cy.wrap(formValues[field]).then(value => {
			if(value) {
				cy.get(form[field])
					.type(value);
			}
		});
	});

	// Fill DOB
	if (formValues.dob) {
		datePicker.selectDate(form.dob, formValues.dob);
	}

	// Fill other non-text inputs
	selectGender(formValues.gender);
	selectSubjects(formValues.subjects);
	selectHobbies(formValues.hobbies);
	uploadPicture(formValues.picture);
	selectLocation(formValues.state, formValues.city);

}

/**
 * Select the specified gender
 * @param {string} gender 
 */
export function selectGender(gender) {

	if (!gender) {
		// Do not select gender if none provided
		return;
	}

	// Click is forced because the the label covers the radio input
	cy.get(form.gender + `[value="${gender}"]`)
		.click({ force: true });

}

/**
 * Select a list of specified subjects
 * @param {array} subjects 
 */
export function selectSubjects(subjects = []) {

	subjects.forEach(subject => {
		// Type each subject into the form field
		cy.get(form.subjects)
			.type(subject);

		// Verify that a single item is displayed in the drop-down and select it
		cy.get(form.subjectsDropDown)
			.should('have.length', 1)
			.click();
	});

}

/**
 * Select specified hobbies
 * @param {array} hobbies 
 */
export function selectHobbies(hobbies = []) {

	hobbies.forEach(hobby => {
		cy.contains(hobby)
			.siblings(form.hobbies)
			.click({ force: true });
	});

}

/**
 * Uploads the specified picture
 * @param {string} file path to file
 */
export function uploadPicture(file) {

	if (!file) {
		// Do not upload picture if none provided
		return;
	}

	cy.get(form.picture)
		.attachFile(file);

}

/**
 * Select value for city and state
 * @param {string} state 
 * @param {string} city 
 */
export function selectLocation(state, city) {

	if (state) {
		// Select state value
		cy.get(form.state)
			.type(state + '{enter}');

		if (city) {
			// City is only selectable after selecting state
			cy.get(form.city)
				.type(city + '{enter}');
		}
	}

}

/**
 * Verify that the post submission form has the expected values
 * @param {object} expectedValues 
 */
export function validateSubmission(expectedValues) {

	let populatedFields = [];
	let missingFields = []

	// Add directly mapped field values to array of expected values 
	submissionMapping.direct.forEach(mapping => {

		if (expectedValues[mapping.selector]) {
			populatedFields.push({
				label: mapping.label,
				expValue: expectedValues[mapping.selector]
			});
		} else {
			missingFields.push(mapping.label);
		}

	});

	// Add form fields with concatenated values
	submissionMapping.concat.forEach(mapping => {

		let expValue = '';

		mapping.selectors.forEach(selector => {

			// Generate string concatenating all expected values for the field with the specified delimeter
			const rawvalue = expectedValues[selector];
			const value = Array.isArray(rawvalue) ? expectedValues[selector].join(mapping.delimeter) : rawvalue;
			
			if (value) {
				expValue += expValue.length === 0 ? value : mapping.delimeter + value;
			}

		});

		if (expValue) {
			populatedFields.push({
				label: mapping.label,
				expValue: expValue
			});
		} else {
			missingFields.push(mapping.label);
		}

	});

	submissionMapping.list.forEach(mapping => {

		let values = expectedValues[mapping.selector];

		if (values) {
			values.forEach(value => {
				populatedFields.push({
					label: mapping.label,
					expValue: value
				});
			});			
		} else {
			missingFields.push(mapping.label);
		}
		
	});

	// Add picture name if it exists
	if (expectedValues.picture) {
		populatedFields.push({
			label: submissionMapping.picture,
			expValue: expectedValues.picture.slice(expectedValues.picture.lastIndexOf('/') + 1)
		});
	} else {
		missingFields.push(submissionMapping.picture);
	}

	// Add DOB if it exists, or todays date (reflects default value in form)
	populatedFields.push({
		label: submissionMapping.dob,
		expValue: dayjs(expectedValues.dob).format('DD MMMM,YYYY')
	});

	// Validate table content
	table.validateTableContent('Label', 'Values', populatedFields, missingFields);

}