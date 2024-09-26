const parseXLSX = require('./xlsxParser'); 
const groupRow = require('./caterogizeJson'); 
const path = require('path');
const XLSX = require('xlsx');

const outputPath = path.join(__dirname, '../JSONS/groupedRows.json');
const workbookPath = path.join(__dirname, './Test.xlsx'); // Path for logging worksheet data


const workbook = XLSX.readFile(workbookPath);

if (workbook !== null){
parsedJSON = parseXLSX(workbook);
};
if (parsedJSON !== null){
    groupedRequirements = groupRow(JSON.parse(parsedJSON));
}

