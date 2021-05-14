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
	genders: '[type="radio"]',
	mobile: '#userNumber',
	dob: '#dateOfBirthInput',
	subjects: '#subjectsContainer',
	// TO DO: hobbies
	picture: '#uploadPicture',
	address: '#currentAddress',
	state: '#state',
	city: '#city',
	submit: '#submit'
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

	// Select desired gender
	selectGender(formValues.gender);

	// TO DO: DOB 

	// Enter subject values
	selectSubjects(formValues.subjects);

	// TO DO: upload picture

	// Choose state and city
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
	cy.get(form.genders + `[value="${gender}"]`)
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

export function uploadPicture() {

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