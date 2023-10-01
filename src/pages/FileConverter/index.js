import download from "downloadjs";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Fileconverter = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);
  const [fileSize, setFileSize] = useState("No file chosen");
  const { theme } = useSelector((state) => state.theme);
  const handleConvert = () => {
    if (!selectedFile) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          setConvertedFile(blob);
        }, "image/png"); // Change 'image/png' to your desired output format
      };
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleDownload = () => {
    if (convertedFile) {
      download(convertedFile, "converted_image.png");
    }
  };

  // Dynamically set the label text
  const fileInputLabel = selectedFile ? selectedFile.name : "Choose File";
  const calculateFileSize = (size) => {
    if (size < 1024) {
      return size + " B";
    } else if (size < 1024 * 1024) {
      return (size / 1024).toFixed(2) + " KB";
    } else {
      return (size / (1024 * 1024)).toFixed(2) + " MB";
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const fileSize = calculateFileSize(file.size);
      setFileSize(fileSize);
    } else {
      setFileSize("No file chosen");
    }
  };
  return (
    <div
      className={`${
        theme === "dark" ? "dark-theme FileConverter" : "FileConverter"
      }`}
    >
      <h1 className="title">Image File Converter</h1>
      <div className="btnss">
        <label className="file-input-label">
          <input
            type="file"
            className="file-input"
            accept=".jpg, .jpeg, .png"
            onChange={handleFileChange}
          />
          {fileInputLabel}
        </label>
        <button className="convert-button" onClick={handleConvert}>
          Convert to PNG
        </button>
        <div
          className="download-btn"
          data-tooltip={`Size: ${fileSize}`}
          onClick={handleDownload}
        >
          <div className="download-btn-wrapper">
            <div className="text">Download</div>
            <span className="icon-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="2em"
                height="2em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </div>

      {convertedFile && (
        <div>
          <h2 className="converted-title">Converted Image:</h2>
          <img
            src={URL.createObjectURL(convertedFile)}
            alt="Converted"
            className="converted-image"
          />
        </div>
      )}
    </div>
  );
};

export default Fileconverter;
