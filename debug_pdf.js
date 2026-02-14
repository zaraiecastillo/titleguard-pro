const pdf = require('pdf-parse');
console.log('Type of require:', typeof pdf);
console.log('Keys:', Object.keys(pdf));
if (pdf.PDFParse) console.log('Type of PDFParse:', typeof pdf.PDFParse);
if (pdf.default) console.log('Type of default:', typeof pdf.default);
