import React, { useRef, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase"; // Adjust as needed
import "../styles/Homepage.css";
import "../styles/Memory.css";
import "../styles/AddMemory.css";
import { Link, useNavigate } from "react-router-dom";

const AddMemory = () => {
  const textareaRef = useRef(null);

  const navigate = useNavigate();

  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  const uploadMemory = async (e) => {
    e.preventDefault();
    try {
      let thumbnailURL = null;
      const imageURLs = [];

      // Upload thumbnail if a file is selected
      if (file) {
        const storageRef = ref(storage, `thumbnails/${title}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            async () => {
              thumbnailURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      // Upload images if any
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const imageFile = images[i];
          const imageRef = ref(storage, `images/${title}_${i}`);
          const uploadTask = uploadBytesResumable(imageRef, imageFile);

          await new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              null,
              (error) => reject(error),
              async () => {
                const imageDownloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref
                );
                imageURLs.push(imageDownloadURL);
                resolve();
              }
            );
          });
        }
      }

      // Add memory data to Firestore with photo URLs
      const memoryCollection = collection(db, "memory");
      await addDoc(memoryCollection, {
        title,
        date,
        description,
        thumbnailURL, // Add thumbnail URL if available
        imageURLs, // Add image URLs
      });

      navigate("/");
    } catch (error) {
      console.error("Error uploading memory:", error);
    }
  };

  return (
    <div className="addMemoryPage">
      <form onSubmit={uploadMemory}>
        <div className="forms">
          <div className="image">
            <p>Album Thumbnail</p>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <div className="title">
            <p>Title</p>
            <input onChange={(e) => setTitle(e.target.value)} type="text" />
          </div>
          <div className="date">
            <p>Date (MM/DD/YYYY)</p>
            <input onChange={(e) => setDate(e.target.value)} type="text" />
          </div>
          <div className="description">
            <p>Description</p>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              ref={textareaRef}
              onInput={handleInput}
              className="auto-resize-textarea"
              rows="1"
            />
          </div>
          <div className="images">
            <p>Images</p>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={(e) => setImages(Array.from(e.target.files))}
            />
          </div>
          <button type="submit">Upload</button>
        </div>
      </form>
    </div>
  );
};

export default AddMemory;
