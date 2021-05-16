import * as alertsPage from '../pages/alerts';

import testCases from '../fixtures/test-data/alerts.json';

context('Alerts', () => {

	beforeEach(() => {

		// Visit the alerts page
		cy.visitPage(alertsPage.url, alertsPage.pageTitle);

	});

	testCases.forEach(testCase => {

		it(testCase.scenario, () => {

			// Click the desired alert button and wait for alert
			cy.get(alertsPage[testCase.button])
				.click()
				.wait(testCase.delay);
	
			// Verify and accept alert (cypress automatically accepts alerts)
			cy.on(testCase.event, text => {
				expect(text).to.be.equal(testCase.alertText);
			});
	
		});

	});

});