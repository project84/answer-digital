import * as practiceForm from '../pages/practice-form';

import testData from '../fixtures/test-data/practice-form.json';

context('Practice form', () => {

	beforeEach(() => {

		// Navigate to the practice form page
		practiceForm.visit();

	});

	context('Mandatory fields', () => {

		testData.forEach(testCase => {

			const missingField = testCase.missingField;
			

			it(`Must not be able to submit the form without populating the ${missingField} field`, () => {

				cy.fixture('practice-form/default-values.json').then(formValues => {

					// Remove the desired mandatory field value from static data, then fill form
					delete formValues[missingField];
					practiceForm.fill(formValues);

					// Attempt to submit the form and verify that the missing field is highlighted
					cy.get(practiceForm.form.submit)
						.click();

					// Verify that the success form is not displayed
					cy.get(practiceForm.modal.content)
						.should('not.exist');

					// Check that the form field indicates that it is required
					cy.get(practiceForm.form[missingField])
						.then(formField => {
							expect(formField[0].validity.valueMissing).to.be.true;
						});

				})

			});

		});

	});

});