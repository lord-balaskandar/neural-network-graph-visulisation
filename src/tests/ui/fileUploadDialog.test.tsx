import { render, screen } from '@testing-library/react';
import FileUploadDialog from '../../ui/fileUploadDialog/fileUploadDialog';
import { useState } from 'react';

test('fileUpload', () => {
  render(
    <FileUploadDialog
      openModal={true}
      setOpenModal={() => {}}
      setNodes={() => {}}
      setEdges={() => {}}
    />
  );
  const linkElement = screen.getByText(
    /Please select a JSON file to upload and use with the solution./
  );
  expect(linkElement).toBeInTheDocument();
});
