import * as alertsPage from '../pages/alerts';

context('Alerts', () => {

	beforeEach(() => {

		// Visit the alerts page
		cy.visitPage(alertsPage.url, alertsPage.pageTitle);

	});

	it('Must see that the second alert is displayed after a five second delay', () => {

		// Click the desired alert button and wait for alert
		cy.get(alertsPage.delayAlertButton)
			.click()
			.wait(5000);

		// Verify and accept alert (cypress automatically accepts alerts)
		cy.on('window:alert', text => {
			expect(text).to.be.equal('This alert appeared after 5 seconds');
		});

	});

});