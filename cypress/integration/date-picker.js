import dayjs from 'dayjs';

import * as datePickerPage from '../pages/date-picker';
import * as datePicker from '../pages/components/date-picker';

context('Date picker', () => {

	beforeEach(() => {

		// Navigate to the date picker page
		cy.visitPage(datePickerPage.url, datePickerPage.pageTitle);

	});

	it('Must be able to select a date using the date picker', () => {

		cy.wrap(dayjs().add(1, 'month')).then(targetDate => {

			// Select the date in one months time from the date picker
			datePicker.selectDate(datePickerPage.dateInput, targetDate.toString());

			// Verify that the selected date is display in the input field
			cy.get(datePickerPage.dateInput)
				.invoke('val')
				.should('equal', targetDate.format('MM/DD/YYYY'));

		});

	});

});