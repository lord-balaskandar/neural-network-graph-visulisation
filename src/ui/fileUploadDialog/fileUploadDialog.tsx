import React from 'react';
import './fileUploadDialog.css';

function FileUploadDialog({
  openModal,
  setOpenModal
}: {
  openModal: boolean;
  setOpenModal: Function;
}) {
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e);
  }

  return (
    <>
      <div className="main-container">
        <div className="modal-container">
          <h3>JSON Upload</h3>
          <div>
            Please select a JSON file to upload and use with the solution.
          </div>
          <div>
            <input
              id="file"
              type="file"
              onChange={handleFileChange}
              title="Upload"
            />
            <button onClick={() => setOpenModal(false)}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FileUploadDialog;
