/* Table elements */
export const table = '.table';
export const headerRow = 'thead';
export const tableBody = 'tbody';
export const tableRow = 'tr';

/**
 * Returns the index of a column given the column header
 * @param {string} header 
 * @returns 
 */
export function getTableColumn(header) {

	return cy.get(headerRow)
		.contains(header)
		.invoke('index')
		.then(i => {
			return i + 1;
		});

}

/**
 * Returns the index of a row in a column given a matching value
 * @param {int} column 
 * @param {string} rowValue 
 * @returns 
 */
export function getTableRow(column, rowValue) {

	return cy.get(`${tableBody} > ${tableRow} > :nth-child(${column})`)
		.contains(rowValue)
		.parent()
		.invoke('index')
		.then(i => {
			return i + 1;
		})

}

/**
 * Returns the DOM element for the cell defined by the specified row label and target column
 * @param {string} indexColumn 
 * @param {string} indexValue 
 * @param {string} targetColumn 
 * @returns 
 */
export function getCell(indexColumn, indexValue, targetColumn) {
	getTableColumn(targetColumn).as('target');
	return getTableColumn(indexColumn).then(iCol => {
			getTableRow(iCol, indexValue).then(row => {
			cy.get('@target').then(col => {
				return cy.get(`${tableBody} > :nth-child(${row}) > :nth-child(${col})`);
			})
		})
	});
}