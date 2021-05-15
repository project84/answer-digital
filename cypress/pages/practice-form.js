import defaultValues from '../fixtures/practice-form/default-values.json';
import fieldTypes from '../fixtures/practice-form/field-types.json';

/* Page element selectors */
/* Basic page attributes */
export const url = 'automation-practice-form';
export const pageHeader = '.main-header';
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
	hobbies: '[type="checkbox"]',
	picture: '#uploadPicture',
	address: '#currentAddress',
	state: '#state',
	city: '#city',
	submit: '#submit'
}

/* Success modal */
export const modal = {
	content: '.modal-content'
}

/**
 * Visit the practice form page and verify the page title
 */
export function visit() {
	cy.visit(url);
	cy.get(pageHeader)
		.should('contain', pageTitle);
}

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
		cy.get(form.dob)
			.selectDate(formValues.dob);
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
		// Type each subject into the form field, tabbing between each entry
		cy.get(form.subjects)
			.type(subject)
			.focused()
			.tab();
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