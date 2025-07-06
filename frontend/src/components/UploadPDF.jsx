import React from 'react';

const UploadPDF = ({ onUpload }) => {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // TODO: Hook up backend parsing logic
    alert(`PDF upload not implemented yet: ${file.name}`);
  };

  return (
    <div className="upload-box">
      <h3>Upload PDF Transaction History</h3>
      <p>Upload .pdf bank/statement files (tabular format)</p>
      <input type="file" accept=".pdf" onChange={handleFile} />
    </div>
  );
};

export default UploadPDF;



