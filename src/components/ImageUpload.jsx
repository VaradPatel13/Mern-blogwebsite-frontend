// src/components/ImageUpload.jsx (NEW FILE)

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X } from 'lucide-react';

const ImageUpload = ({ onFileChange }) => {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onFileChange(file);
    }
  }, [onFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.webp'] },
    multiple: false,
  });

  const removeImage = (e) => {
    e.stopPropagation();
    setPreview(null);
    onFileChange(null);
  };

  return (
    <div
      {...getRootProps()}
      className={`relative w-full p-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-200
        ${isDragActive ? 'border-amber-500 bg-amber-50' : 'border-gray-300 hover:border-amber-400'}`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <>
          <img src={preview} alt="Cover preview" className="w-full h-48 object-cover rounded-lg" />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-red-100"
          >
            <X className="w-5 h-5 text-red-500" />
          </button>
        </>
      ) : (
        <div className="text-center text-gray-500">
          <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2">
            <span className="font-semibold text-amber-600">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs">PNG, JPG, JPEG, or WEBP</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;