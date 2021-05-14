/* Page element selectors */
/* Basic page attributes */
const url = 'automation-practice-form';
const pageHeader = '.main-header';
const pageTitle = 'Practice Form';

export function visit() {
	// Visit practice form page and verify page title
	cy.visit(url);
	cy.get(pageHeader)
		.should('contain', pageTitle);
}