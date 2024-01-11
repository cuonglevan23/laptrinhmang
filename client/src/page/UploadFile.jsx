import React, { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

const UploadFile = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const storage = getStorage();

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleUpload = async () => {
    if (selectedFiles.length > 0) {
      for (const file of selectedFiles) {
        const storageRef = ref(storage, "uploads/" + file.name);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        setUploadedFiles((prevFiles) => [...prevFiles, { name: file.name, url: downloadURL }]);
      }

      setSelectedFiles([]);
    } else {
      console.error("Chưa chọn file để tải lên.");
    }
  };

  const handleDownload = (url) => {
    window.open(url, "_blank");
  };

  const handleDelete = (index) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  useEffect(() => {
    // Load existing files from Firebase Storage
    const loadFiles = async () => {
      const storageRef = ref(storage, "uploads/");
      const filesList = await listAll(storageRef);

      const filesData = await Promise.all(
        filesList.items.map(async (fileRef) => {
          const downloadURL = await getDownloadURL(fileRef);
          return { name: fileRef.name, url: downloadURL };
        })
      );

      setUploadedFiles(filesData);
    };

    loadFiles();
  }, []); // Run once when the component mounts

  return (
    <div className="bg-darkBlue1 min-h-screen text-slate-400 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4"
          multiple
        />
        {selectedFiles.length > 0 && (
          <div className="mb-4">
            <p className="font-bold">File đã chọn:</p>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index} title={file.name.length > 20 ? file.name : null}>
                  {file.name.length > 20 ? `${file.name.substring(0, 17)}...` : file.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {uploadedFiles.length > 0 && (
          <div className="mt-8 overflow-y-auto max-h-40">
            <p className="font-bold mb-2">Danh sách file đã tải lên:</p>
            <ul>
              {uploadedFiles.map((file, index) => (
                <li key={index} className="mb-2" title={file.name.length > 20 ? file.name : null}>
                  {file.name.length > 20 ? `${file.name.substring(0, 17)}...` : file.name}
                  <button
                    className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDownload(file.url)}
                  >
                    Tải về
                  </button>
                  <button
                    className="ml-2 bg-red hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(index)}
                  >
                    Xóa
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          className="mt-4 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleUpload}
        >
          Tải lên
        </button>
      </div>
    </div>
  );
};

export default UploadFile;
