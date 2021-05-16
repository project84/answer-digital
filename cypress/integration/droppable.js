import * as droppable from '../pages/droppable';

context('Droppable', () => {

	beforeEach(() => {

		// Navigate to the droppable page
		cy.visitPage(droppable.url, droppable.pageTitle);

	});

	it('Must be able to drag the box to the drop area', () => {

		// Navigate to the desired tab
		droppable.selectTab('simple');

		// Move drag box to drop area
		cy.moveElement(droppable.simpleDragBox, droppable.simpleDropBox);

		// Verify drop box indicates success
		cy.get(droppable.simpleDropBox)
			.invoke('text')
			.should('equal', 'Dropped!');

	});

});