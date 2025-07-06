import React from 'react';
import Tesseract from 'tesseract.js';

const UploadReceipt = ({ onUploadTransaction }) => {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Tesseract.recognize(file, 'eng', {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        const lines = text.split('\n').map((line) => line.trim()).filter(Boolean);
        const transactions = [];

        for (let i = 0; i < lines.length; i++) {
          const match = lines[i].match(/(\d{1,2}\/\d{1,2}\/\d{4})\s+(.+?)\s+([\d.]+)/);
          if (match) {
            const [, dateStr, category, amountStr] = match;
            const [day, month, year] = dateStr.split('/');
            const date = new Date(`${year}-${month}-${day}`);
            const amount = parseFloat(amountStr);

            if (!isNaN(amount) && !isNaN(date.getTime())) {
              transactions.push({
                date,
                type: 'Expense',
                category,
                amount,
                note: 'Uploaded via OCR',
              });
            }
          }
        }

        if (transactions.length > 0) {
          // ✅ Save to backend
          fetch('https://financetracker-sand.vercel.app/api/transactions/bulk', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ transactions }),
          })
            .then((res) => res.json())
            .then((data) => {
              onUploadTransaction(data); // assuming data returns saved transactions
              alert(`✅ ${data.length} transaction(s) added from receipt!`);
            })
            .catch((err) => {
              console.error('❌ Failed to save to DB:', err);
              alert('❌ Failed to save transactions to database.');
            });
        } else {
          alert('❌ No valid transactions found from image.');
        }
      })
      .catch((err) => {
        console.error('OCR Error:', err);
        alert('❌ Failed to process the receipt.');
      });
  };

  return (
    <div className="upload-box">
      <h3>Upload a Receipt</h3>
      <p>Extract expenses from a scanned receipt image (JPG/PNG)</p>
      <input type="file" accept=".jpg,.png" onChange={handleFile} />
    </div>
  );
};

export default UploadReceipt;
