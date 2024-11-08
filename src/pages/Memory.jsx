import React, { useEffect, useState } from "react";
import "../styles/Homepage.css";
import "../styles/Memory.css";
import sample from "../images/sample.jpg";
import nitro from "../images/nitro.jpg";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";

const Memory = () => {
  const { memoryTitle } = useParams();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      const q = query(
        collection(db, "memory"),
        where("title", "==", memoryTitle)
      );
      const querySnapshot = await getDocs(q);

      const fetchedImages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setImages(fetchedImages);
    };

    getImages();
  }, [memoryTitle]);

  return (
    <>
      {images.map((image) => (
        <div className="memoryPage">
          <div className="memoryThumb"></div>

          <div className="description">
            <p>{image.description}</p>
          </div>

          <div className="images">
            {image.imageURLs.map((url, index) => (
              <img key={index} src={url} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Memory;
