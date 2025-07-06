// backend/utils/pdfParser.js
// import pdfParse from 'pdf-parse';

// export const parsePDF = async (buffer) => {
//   try {
//     const data = await pdfParse(buffer);
//     const lines = data.text.split('\n');
//     // Process lines into structured transaction data
//     const transactions = lines.map(line => {
//       const [date, category, amount] = line.split(',');
//       return {
//         date: new Date(date),
//         category,
//         amount: parseFloat(amount),
//         type: parseFloat(amount) < 0 ? 'Expense' : 'Income'
//       };
//     });
//     return transactions;
//   } catch (err) {
//     console.error('PDF parsing failed:', err.message);
//     return [];
//   }
// };


// backend/utils/pdfParser.js
import pdfParse from 'pdf-parse';

export const parsePDF = async (buffer) => {
  try {
    const data = await pdfParse(buffer); // buffer from upload
    const lines = data.text.split('\n');
    const transactions = lines.map((line) => {
      const [date, category, amount] = line.split(',');
      return {
        date: new Date(date),
        category: category?.trim() || 'Unknown',
        amount: parseFloat(amount),
        type: parseFloat(amount) < 0 ? 'Expense' : 'Income'
      };
    });
    return transactions;
  } catch (err) {
    console.error('PDF parsing failed:', err.message);
    return [];
  }
};
