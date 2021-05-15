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

				cy.skipOn(testCase.skip);

				cy.fixture('practice-form/default-values.json').then(formValues => {

					// Remove the desired mandatory field value from static data, then fill form
					delete formValues[missingField];
					practiceForm.fill(formValues);

					// Attempt to submit the form and verify that the missing field is highlighted
					cy.get(practiceForm.submitButton)
						.click();

					// Verify that the success form is not displayed
					cy.get(practiceForm.modal)
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

	context('Successful submission', () => {

		it('Must be able to submit the form with only the required values populated', () => {

			cy.fixture('practice-form/default-values.json').then(formValues => {

				// Fill the form with only the required values
				practiceForm.fill(formValues);

				// Submit the completed form and verify that the table contains the submitted values
				cy.get(practiceForm.submitButton)
					.click();
				practiceForm.validateSubmission(formValues);

			});

		});

		it('Must be able to submit the form with all values populated', () => {

			cy.fixture('practice-form/default-values.json').then(defaultValues => {
				cy.fixture('practice-form/additional-values.json').then(additionalValues => {

					let formValues = Object.assign(additionalValues, defaultValues);

					// Fill the form with all values
					practiceForm.fill(formValues);

					// Submit the completed form and verify that the table contains the submitted values
					cy.get(practiceForm.submitButton)
						.click();
					practiceForm.validateSubmission(formValues);

				});

			});

		});

	});

});