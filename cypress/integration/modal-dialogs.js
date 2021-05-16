import * as dialogs from '../pages/modal-dialogs';
import * as modal from '../pages/components/modals';

context('Modals', () => {

	beforeEach(() => {

		// Navigate to the modals page
		cy.visitPage(dialogs.url, dialogs.pageTitle);

	});

	it('Must be able to open and close the small modal', () => {

		// Open the small modal and verify it's content
		cy.get(dialogs.smallModal)
			.click();

		cy.get(modal.content)
			.should('be.visible')
			.find(modal.title)
			.invoke('text')
			.should('equal', 'Small Modal');

		cy.get(modal.content)
			.find(modal.body)
			.invoke('text')
			.should('equal', 'This is a small modal. It has very less content');

		// Close the small modal and verify that it is no longer displayed
		cy.get(dialogs.smallCloseButton)
			.click();

		cy.get(modal.content)
			.should('not.exist');

	});

});