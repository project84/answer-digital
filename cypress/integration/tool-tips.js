import * as toolTips from '../pages/tool-tips';

import testCases from '../fixtures/test-data/tool-tips.json'

context('Tool tips', () => {

	beforeEach(() => {

		// Visit the tool tips page
		cy.visitPage(toolTips.url, toolTips.pageTitle);

	});

	testCases.forEach(testCase => {

		it(`Must see the correct message when hovering over the ${testCase.label}`, () => {

			// Hover over the desired element
			cy.get(toolTips[testCase.selector])
				.trigger('mouseover');
	
			// Verify that the hover text is displayed and correct
			cy.get(toolTips.hoverText)
				.should('be.visible')
				.invoke('text')
				.should('equal', testCase.text);
	
		});

	});

});