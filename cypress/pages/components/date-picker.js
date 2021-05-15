import dayjs from 'dayjs';

/* Datepicker elements */
export const yearSelect = '.react-datepicker__year-select';
export const monthSelect = '.react-datepicker__month-select';
export const calendar = '.react-datepicker__month';
export const day = '.react-datepicker__day--';
export const outsideMonth = '.react-datepicker__day--outside-month';

/** 
 * Select a date using the given date picker
 * @param {string} selector
 * @param {string} targetDate
 */
export function selectDate(selector, targetDate) {

	// Open date picker and store current date
	cy.get(selector)
		.click()
		.invoke('val').then(date => {
			cy.wrap(dayjs(date), { log: false }).as('currentDate');
		});

	cy.wrap(dayjs(targetDate), { log: false }).then(targetDate => {
		cy.get('@currentDate').then(currentDate => {

			// Navigate to correct year if required
			if (targetDate.year() != currentDate.year()) {
				cy.get(yearSelect)
					.select(targetDate.format('YYYY'));
			}

			// Navigate to correct month if required
			if (targetDate.month() != currentDate.month()) {
				cy.get(monthSelect)
					.select(targetDate.format('MMMM'));
			}

			// Select date from calendar
			cy.get(calendar)
				.children()
				.find(day + targetDate.date().toString().padStart(3, 0))
				.not(outsideMonth)
				.click();

		});
	});
}