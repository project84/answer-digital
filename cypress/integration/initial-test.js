it('Must navigate to the demo QA site', () => {

	// Visit base URL and verify 
	cy.visit('/');
	cy.url()
		.should('contain', 'demoqa');

});