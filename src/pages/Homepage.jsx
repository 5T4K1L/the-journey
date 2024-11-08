import React, { useEffect, useState } from "react";
import "../styles/Homepage.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [images, setImage] = useState([]);
  const imageCollection = collection(db, "memory");

  useEffect(() => {
    const getImages = async () => {
      const data = await getDocs(imageCollection);
      setImage(
        data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };

    getImages();
  }, []);

  return (
    <div className="homepage">
      <div className="mainThumbnail">
        <div className="mainText">
          <p>Our Journey — From the Start</p>
        </div>
      </div>

      <a className="memory">
        {images.map((image) => (
          <div key={image.id}>
            <Link to={`/memory/${image.id}/${image.title}`}>
              <div className="memories">
                <div className="imageThumbnail">
                  <img src={image.imageURLs[0]} alt="" />
                  <img src={image.imageURLs[1]} alt="" />
                  <img src={image.imageURLs[2]} alt="" />
                </div>
                <div className="dateTitle">
                  <p>{image.date}</p>
                  <p>{image.title}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </a>
    </div>
  );
};

export default Homepage;
