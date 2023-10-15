import React, { useContext, useEffect, useState } from "react";
import { Searchtab } from "../searchtab/Searchtab";
import "./workspace.scss";
import "./workspace-components/ShareButton.css";
import axios from "axios";
import ImageComments from "../commentsAdd/ImageComments";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import "./workspace-components/DashboardImage.css"; // Import the CSS for styling
import GuestLogin from "./workspace-components/GuestLogin";
import "./workspace-components/ImageCard.css";
import ShareButton from "./workspace-components/ShareButton";

export const Workspace = () => {
  const [image, setImage] = useState("");
  const [allImage, setAllImage] = useState([]);
  const [finalimag, setfinalimag] = useState("");
  const { currentImg, setCurrentImg } = useContext(MyContext);
  const [isVisible, setIsVisible] = useState(false);
  const navigator = useNavigate();
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const [gridSize, setGridSize] = React.useState(6); // Default grid size

  const handleGridSizeChange = (newSize) => {
    setGridSize(newSize);
  };

  const togglePopup = () => {
    // Toggle the visibility of the popup
    setIsVisible((prevIsVisible) => !prevIsVisible);
  };

  const closePopup = () => {
    // Close the popup
    setIsVisible(false);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("photo", selectedFile);
      try {
        console.log("nice");
        const token = localStorage.getItem("token");
        console.log(token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const response = await axios.post(
          "http://localhost:8000/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data && response.data.photo) {
          // Check if 'photo' property exists in response.data
          console.log(response);
          // setAllImage([...allImage, { src: response.data.photo }]);
        } else {
          console.error(
            "Error: 'photo' property not found in the response data"
          );
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.log("what?");
    }
  };

  function convertToBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };

    reader.onerror = (error) => {
      console.log("error", error);
    };
  }
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  function send(e) {
    setCurrentImg(e.target.currentSrc);
    navigator("/ImageComments");
    // console.log();
  }

  async function getImage() {
    await axios
      .get("http://localhost:8000/api/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        localStorage.getItem("token", response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        console.log(response);
        setAllImage(response.data.body);
      });
  }
  useEffect(() => {
    getImage();
  }, []);

  useEffect(() => {
    console.log(allImage);
  }, [allImage]);
  const ImageCard = (props) => {
    // Destructure the props for easy access
    const { title, time, imageSrc, shareCount, gridSize } = props;

    return (
      <div className={`imagecard ${gridSize}`}>
        <div className="imagecard-overlay">
          <button className="imagecard-button">Open</button>
          <img
            src={imageSrc}
            alt="Card Image"
            className="imagecard-image"
            onClick={send}
          />
        </div>
        <div className="imagecard-content">
          <h2 className="imagecard-title">{title}</h2>{" "}
          {/* Use the title prop */}
          <h2 className="imagecard-time">{time}</h2> {/* Use the time prop */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <time className="imagecard-title">{shareCount}</time>{" "}
            {/* Use the shareCount prop */}
            <div className="imagecard-share">
              <ShareButton /> {/* Include the ShareButton component */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="workspace">
      <div className="searchtab">
        <div className="searchtab-bar">
          <div className="search">
            <div className="search-go">
              <input type="text" placeholder="Enter a URL here" />
              <button>Go</button>
            </div>
            <div className="search-or">or</div>

            <div style={{ marginTop: "7px" }}>
              <button className="share-popup-send-button" onClick={togglePopup}>
                Upload
              </button>

              {isVisible && (
                <div className="share-popup-container">
                  <div className="share-popup-content">
                    <button
                      className="share-popup-close-button"
                      onClick={closePopup}
                    >
                      &times; {/* The 'x' character for close */}
                    </button>
                    <h2>
                      Drag and drop Images,
                      <br />
                      Videos, PDFs and more
                    </h2>
                    <img
                      src="images/Upload.png"
                      alt="upload"
                      style={{ width: "35vw" }}
                    />
                    <div className="upload-button-overlay">
                      <input
                        accept="image/*"
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                      />
                      {image == "" || image == null ? (
                        ""
                      ) : (
                        <img width={100} height={100} src={image} />
                      )}

                      <button
                        className="share-popup-send-button"
                        style={{ marginBottom: "20px" }}
                        onClick={handleUpload}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="invite">
            <button>Invite</button>
          </div>
        </div>
        <hr />
      </div>

      <div className="mainsection" style={{ width: "auto" }}>
        <div className="dashboard-container">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <GuestLogin />
            <div className="thumbnail-grid">
              <h3>Grid Size</h3>
              <button
                className="grid-button"
                onClick={() => handleGridSizeChange("grid-3")}
              >
                3
              </button>
              <button
                className="grid-button"
                onClick={() => handleGridSizeChange("grid-6")}
              >
                6
              </button>
              <button
                className="grid-button"
                onClick={() => handleGridSizeChange("grid-9")}
              >
                9
              </button>
            </div>
          </div>
          <div className="image-cards">
            {allImage.map((data, key) => (
              <ImageCard
                key={key}
                title="Title"
                time="5 days Ago"
                imageSrc={data.photo}
                shareCount="10"
                gridSize={gridSize}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
