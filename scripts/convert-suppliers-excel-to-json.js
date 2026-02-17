const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const inputPath = path.join(__dirname, '..', 'data', 'supplier-list.xlsx');
const outputPath = path.join(__dirname, '..', 'data', 'suppliers.json');

if (!fs.existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  process.exit(1);
}

const workbook = xlsx.readFile(inputPath);
const firstSheetName = workbook.SheetNames[0];
if (!firstSheetName) {
  console.error('No worksheets found in Excel file.');
  process.exit(1);
}

const sheet = workbook.Sheets[firstSheetName];
const rows = xlsx.utils.sheet_to_json(sheet, {
  header: 1,
  raw: false,
  defval: '',
  blankrows: false,
});

if (!rows.length) {
  fs.writeFileSync(outputPath, '[]\n', 'utf8');
  console.log('Rows converted: 0');
  console.log('Preview: []');
  process.exit(0);
}

const headers = rows[0].map((h) => String(h || '').trim());
const dataRows = rows.slice(1);

const result = dataRows
  .map((row) => {
    const obj = {};
    headers.forEach((header, idx) => {
      const key = header || `column_${idx + 1}`;
      obj[key] = row[idx] === undefined ? '' : row[idx];
    });
    return obj;
  })
  .filter((obj) => Object.values(obj).some((value) => String(value).trim() !== ''));

fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8');

console.log(`Rows converted: ${result.length}`);
console.log('Preview:');
console.log(JSON.stringify(result.slice(0, 2), null, 2));
