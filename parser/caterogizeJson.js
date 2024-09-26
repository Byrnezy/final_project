// const fs = require('fs');
// const path = require('path');
// const outputPath = path.join(__dirname, '../JSONS/groupedRows.json');

function groupRow(rows) {
    try {

        // const rawData = fs.readFileSync(inputPath, 'utf8');
        // const rows = JSON.parse(rawData);

        // // Group data by requirements
        const groupedData = rows.reduce((acc, row) => {
            const requirement = row.Requirement;

            if (!acc[requirement]) {
                acc[requirement] = []; 
            }
            acc[requirement].push(row);
            return acc;
        }, {});

        // 
        const result = Object.entries(groupedData).map(([requirement, rows]) => ({
            requirement,
            rows
        }));

        if (result.length > 0) {
            return JSON.stringify(result, null, 2);
            // fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
            //console.log('Grouped data written to:', outputPath);
        } else {
            console.error('No data found to write.');
            return null;
        }

    } catch (error) {
        console.error('Error processing the JSON file:', error);
        return null;
    }
}

module.exports = groupRow;