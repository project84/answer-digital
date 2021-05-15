// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import dayjs from 'dayjs';
import * as datePicker from '../pages/components/date-picker';

/** 
 * Select a date using the subject date picker
 * @param {string} targetDate
 */
Cypress.Commands.add(
	'selectDate',
	{
		prevSubject: true
	},
	(subject, targetDate) => {

		// Open date picker and store current date
		cy.wrap(subject)
			.click()
			.invoke('val').then(date => {
				cy.wrap(dayjs(date), { log: false }).as('currentDate');
			});

		cy.wrap(dayjs(targetDate), { log: false }).then(targetDate => {
			cy.get('@currentDate').then(currentDate => {

				// Navigate to correct year if required
				if (targetDate.year() != currentDate.year()) {
					cy.get(datePicker.yearSelect)
						.select(targetDate.format('YYYY'));
				}

				// Navigate to correct month if required
				if (targetDate.month() != currentDate.month()) {
					cy.get(datePicker.monthSelect)
						.select(targetDate.format('MMMM'));
				}

				// Select date from calendar
				cy.get(datePicker.calendar)
					.children()
					.find(datePicker.day + targetDate.date().toString().padStart(3, 0))
					.not(datePicker.outsideMonth)
					.click();

			});
		});

	}
)