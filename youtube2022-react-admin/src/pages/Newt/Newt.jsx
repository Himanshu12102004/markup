import React, { useState, useEffect } from "react";
import axios from "axios";

const Newt = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSelectedFile(null);
      loadImages();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const loadImages = async () => {
    try {
      const response = await axios.get("/images");
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div>
      <h1>Image Upload and Retrieval</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadImage}>Upload</button>
      <div>
        {images.map((image) => (
          <div key={image._id}>
            <img src={image.path} alt={image.originalname} width="200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Newt;
