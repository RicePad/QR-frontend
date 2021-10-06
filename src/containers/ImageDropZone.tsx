/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';
import { uploadImage } from '../apis';

interface DropzoneProps {
    value: string
    onChange: any
}

const Dropzone = styled.div`
    border: 1px dashed #ced4d9;
    border-radius: 5px;
    color: #6c757d;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 142px;
    img {
    height: 140px;
    }
`;

const ImageDropzone: React.FC<DropzoneProps> = ({ value, onChange }) => {
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);

    setLoading(true);
    uploadImage(acceptedFiles[0])
      .then((json) => onChange(json.url))
      .finally(() => setLoading(false));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/*',
  });

  return (
    <Dropzone {...getRootProps()}>
      <input {...getInputProps()} />
      {
                value ? (
                  <img src={value} alt="qr-menu" />
                ) : loading ? (
                  <Spinner variant="standard" animation="border" role="status" />
                ) : (
                  <span>Drag & drop file here, or click to select file</span>
                )
            }
    </Dropzone>
  );
};

export default ImageDropzone;
