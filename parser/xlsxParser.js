const XLSX = require('xlsx');
// const fs = require('fs');
// const path = require('path');
// const outputPath = path.join(__dirname, '../JSONS/rows.json');
//const worksheetLogPath = path.join(__dirname, './JSONS/worksheet.json'); // Path for logging worksheet data

function parseXLSX(workbook) {

    try {
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        // //DEBUGGING
        // fs.writeFileSync(worksheetLogPath, JSON.stringify(worksheet, null, 2));
        // console.log('Worksheet data logged to:', worksheetLogPath);
        // // Log the worksheet object directly for debugging
        // console.log('Worksheet:', JSON.stringify(worksheet, null, 2));

        //The XLSX has a merged first row which screws with the parsing
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        const newWorksheet = {};
        for (let R = 1; R <= range.e.r; R++) {
            for (let C = range.s.c; C <= range.e.c; C++) {
                const cell = worksheet[XLSX.utils.encode_cell({ r: R, c: C })];
                if (cell) {
                    newWorksheet[XLSX.utils.encode_cell({ r: R - 1, c: C })] = cell;
                }
            }
        }
        newWorksheet['!ref'] = XLSX.utils.encode_range({
            s: { r: 0, c: 0 },
            e: { r: range.e.r - 1, c: range.e.c }
        });

        const rows = XLSX.utils.sheet_to_json(newWorksheet, {
            header: 1,
            blankrows: false,
            raw: false
        });

        if (rows.length > 0) {
            const headers = rows[0];
            //console.log('Headers:', headers);
            const dataRows = rows.slice(1);

            const result = dataRows.map(row => {
                return headers.reduce((acc, header, index) => {
                    acc[header] = row[index];
                    return acc;
                }, {});
            });

            // console.log('Extracted Rows:', JSON.stringify(result, null, 2));

            if (result.length > 0) {
                //Was debugging merged row parsing issue
                //fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
                // console.log('Data written to:', outputPath);
                return JSON.stringify(result, null, 2); 
            } else {
                console.error('No data found to write.');
                return null;    
            }
        } else {
            console.error('No rows found. Please check the range or content of the Excel sheet.');
            return null;
        }

    } catch (error) {
        console.error('Error reading the Excel file:', error);
        return null;
    }
}

module.exports = parseXLSX;