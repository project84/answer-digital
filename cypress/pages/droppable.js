/* Page element selectors */
/* Basic page attributes */
export const url = 'droppable';
export const pageTitle = 'Droppable';

/* Drag and drop element selectors */
/* Simple tab */
export const simpleDragBox = '#draggable';
export const simpleDropBox = '#droppable';

/**
 * Select the specified tab
 * @param {string} targetTab 
 */
export function selectTab(targetTab) {
	cy.get('#droppableExample-tab-' + targetTab)
		.click();
}
