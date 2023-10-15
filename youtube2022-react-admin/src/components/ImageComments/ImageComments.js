import React, {
  Component,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import axios from "axios";
import "./ImageComments.css";
import { MyContext } from "../../App";
import { fabric } from "fabric";
import DownloadIcon from "@mui/icons-material/Download";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

function ImageComments() {
  const [comments, setComments] = useState([]); // An array to store comments
  const [editedCommentIndex, setEditedCommentIndex] = useState(null); // Index of the comment being edited
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown menu state
  const [showCommentPopup, setShowCommentPopup] = useState(false); // Add this state variable
  const [hoveredCommentIndex, setHoveredCommentIndex] = useState(null); // Index of the currently hovered comment
  const [isFullscreen, setIsFullscreen] = useState(false);
  const imageRightbarRef = useRef(null);
  const [selectedScale, setSelectedScale] = useState("100%"); // Initialize with 100% scale
  const { currentImg } = useContext(MyContext); // Replace with the actual image source
  const [canvas, setCanvas] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#000"); // Default color

  useEffect(() => {
    const parentContainer = document.getElementById("image-container");
    const initializeCanvas = () => {
      const canvas = new fabric.Canvas("canvas", {
        isDrawingMode: false,
      });

      canvas.freeDrawingBrush.color = selectedColor; // Set default brush color
      canvas.freeDrawingBrush.width = 5; // Set default brush width

      setCanvas(canvas);

      // Dynamically adjust canvas size based on parent container size
      updateCanvasSize(canvas, parentContainer);

      // Listen for window resize events and adjust canvas size accordingly
      window.addEventListener("resize", () => {
        updateCanvasSize(canvas, parentContainer);
      });
    };

    const updateCanvasSize = (canvas, parentContainer) => {
      const containerWidth = parentContainer.clientWidth;
      const containerHeight = parentContainer.clientHeight;

      // Adjust canvas size based on the container size
      canvas.setWidth(containerWidth);
      canvas.setHeight(containerHeight);

      // Make sure to render the canvas after updating its size
      canvas.renderAll();
    };

    // Initialize the canvas when the component mounts
    initializeCanvas();
    window.addEventListener("resize", updateCanvasSize);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", () => {
        updateCanvasSize(canvas, parentContainer);
      });
    };
  }, []);

  const handleDrawingModeChange = (drawingMode) => {
    if (canvas) {
      if (drawingMode === "drawing") {
        canvas.isDrawingMode = true; // Enable drawing mode
        canvas.interactivity = true; // Enable interactions
        canvas.forEachObject((obj) => {
          obj.selectable = true; // Make all objects on the canvas selectable
        });
      } else {
        canvas.isDrawingMode = false; // Disable drawing mode
        canvas.interactivity = false; // Disable interactions
        canvas.discardActiveObject(); // Deselect any active object
        canvas.forEachObject((obj) => {
          obj.selectable = false; // Make all objects on the canvas unselectable
        });
      }
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    if (canvas) {
      canvas.freeDrawingBrush.color = color;
    }
  };

  function enterFullscreen() {
    if (imageRightbarRef.current && !isFullscreen) {
      if (imageRightbarRef.current.requestFullscreen) {
        imageRightbarRef.current.requestFullscreen();
      } else if (imageRightbarRef.current.mozRequestFullScreen) {
        imageRightbarRef.current.mozRequestFullScreen();
      } else if (imageRightbarRef.current.webkitRequestFullscreen) {
        imageRightbarRef.current.webkitRequestFullscreen();
      } else if (imageRightbarRef.current.msRequestFullscreen) {
        imageRightbarRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
    }
  }

  // Function to handle exiting fullscreen
  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsFullscreen(false);
  }
  useEffect(() => {
    console.log(comments);
  }, [comments]);
  useEffect(() => {
    // Function to handle the Escape key press to exit fullscreen
    function handleKeyPress(event) {
      if (event.key === "Escape" && isFullscreen) {
        exitFullscreen();
      }
    }

    // Add event listeners for entering and exiting fullscreen
    document.addEventListener("keydown", handleKeyPress);

    // Cleanup by removing event listeners when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isFullscreen]);

  function toggleFullscreen() {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  }

  const handleImageClick = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const imageWidth = e.target.width;
    const imageHeight = e.target.height;

    // Check if drawing mode is enabled
    if (!canvas.isDrawingMode) {
      // Calculate the position of the comment box
      const commentX = offsetX >= imageWidth / 2 ? offsetX - 238 : offsetX + 30;
      const commentY = offsetY >= imageHeight / 2 ? offsetY - 80 : offsetY + 30;

      const newComment = {
        x: commentX,
        y: commentY,
        x1: offsetX - 15,
        y1: offsetY - 15,
        text: "", // Default text
        editing: true, // Initially in edit mode
      };

      // Update the state with the new comment
      setComments((prevComments) => [...prevComments, newComment]);
    }
  };

  const handleCommentClick = (index) => {
    // Toggle the editing state of the clicked comment
    const updatedComments = [...comments];
    updatedComments[index].editing = !updatedComments[index].editing;
    setComments(updatedComments);
    setEditedCommentIndex(index);
  };

  const handleCommentChange = (event, index) => {
    const { value } = event.target;

    // Update the text of the edited comment
    const updatedComments = [...comments];
    updatedComments[index].text = value;

    setComments(updatedComments);
  };

  const handlePostComment = (index) => {
    // Reset the index of the comment being edited
    console.log("yes you did it");
    setComments((prevComments) => {
      return prevComments.map((comment, i) => {
        if (i == index) {
          console.log("hello");
          axios
            .post(
              "http://localhost:8000/api/images/postcomment",
              {
                imageFilter: currentImg,
                comment,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
        return {
          ...comment,
          editing: i === index ? false : comment.editing, // Only update the edited comment's editing state
        };
      });
    });

    // Update the comment with author and time
    setComments((prevComments) => {
      const updatedComments = [...prevComments];
      const editedComment = updatedComments[index];
      editedComment.author = "Author"; // Replace 'Author' with the actual author's name
      editedComment.time = new Date().toLocaleTimeString(); // Add the current time

      return updatedComments;
    });

    setEditedCommentIndex(null);
    setShowCommentPopup(false); // Hide the comment-popup
  };

  const handleKeyPress = (event, index) => {
    if (event.key === "Enter") {
      // Prevent line break in the input field
      event.preventDefault();

      // Post the comment when Enter key is pressed
      handlePostComment(index);
    }
  };

  const handleDeleteComment = (index) => {
    // Delete the comment at the specified index
    setComments((prevComments) => prevComments.filter((_, i) => i !== index));
  };

  const handleCopyLink = (index) => {
    // You can implement the logic to copy the comment link here.
    // For simplicity, I'll demonstrate copying the comment's index.
    const commentLink = `${window.location.href}#comment-${index + 1}`;
    navigator.clipboard.writeText(commentLink);
    alert(`Comment link copied: ${commentLink}`);
  };

  const toggleDropdown = (index) => {
    // Toggle the dropdown menu for the comment at the specified index
    setComments((prevComments) =>
      prevComments.map((comment, i) => ({
        ...comment,
        isDropdownOpen: i === index ? !comment.isDropdownOpen : false,
      }))
    );
  };

  const handleCommentMouseEnter = (index) => {
    // Set the index of the comment being hovered over
    setHoveredCommentIndex(index);
    // Show the comment-popup when hovering over the comment-index span
    setShowCommentPopup(true);
  };

  const handleCommentMouseLeave = () => {
    // Reset the index of the hovered comment
    setHoveredCommentIndex(null);
    // Hide the comment-popup when not hovering over the comment-index span
    setShowCommentPopup(false);
  };

  function handleImageDownload() {
    const imageSrc = currentImg; // Replace with the actual image source
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "image_filename"; // You can specify the filename here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleScaleChange = (event) => {
    const newScale = event.target.value;
    setSelectedScale(newScale);
  };

  return (
    <div
      className={`image-comments-container ${isFullscreen ? "fullscreen" : ""}`}
    >
      <div
        className={`image-rightbar ${isFullscreen ? "fullscreen" : ""}`}
        ref={imageRightbarRef}
      >
        <div className="info-bar">
          <div className="info-top">
            <div className="info-left">
              {/* Display image information */}
              <span className="image-info">Your Image</span>
              <span className="image-info">
                PNG {/* Replace with the actual format */}
              </span>
              <span className="image-info">
                1024 KB {/* Replace with the actual size */}
              </span>
            </div>
            <div className="info-right">
              {/* Scale Dropdown */}
              <select
                className="scale-dropdown"
                value={selectedScale}
                onChange={handleScaleChange}
              >
                <option value="25%">25%</option>
                <option value="50%">50%</option>
                <option value="75%">75%</option>
                <option value="100%">100%</option>
                <option value="125%">125%</option>
                <option value="150%">150%</option>
                <option value="175%">175%</option>
                <option value="200%">200%</option>
              </select>
              {/* Download Button */}
              <button className="download-button" onClick={handleImageDownload}>
                <DownloadIcon />
              </button>
              {/* Fullscreen Button */}
              <button className="fullscreen-button" onClick={toggleFullscreen}>
                {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </button>
            </div>
          </div>
          <div className="info-bottom">
            <button
              onClick={() => handleDrawingModeChange("drawing")}
              className="EnableDrawingButton"
            >
              Enable Drawing
            </button>
            <button
              onClick={() => handleDrawingModeChange("")}
              className="DisableDrawingButton"
            >
              Disable Drawing
            </button>
            <div className="ColorButtons">
              <button
                onClick={() => handleColorChange("red")}
                className="ColorButton"
                style={{ background: "red" }}
              ></button>
              <button
                onClick={() => handleColorChange("green")}
                className="ColorButton"
                style={{ background: "green" }}
              ></button>
              <button
                onClick={() => handleColorChange("blue")}
                className="ColorButton"
                style={{ background: "blue" }}
              ></button>
              <button
                onClick={() => handleColorChange("black")}
                className="ColorButton"
                style={{ background: "black" }}
              ></button>
              <button
                onClick={() => handleColorChange("white")}
                className="ColorButton"
                style={{ background: "white" }}
              ></button>
            </div>
          </div>
        </div>
        <div className="image-container-overlay">
          <div
            className="image-container"
            id="image-container"
            style={{ transform: `scale(${parseFloat(selectedScale) / 100})` }}
          >
            <img src={currentImg} alt="Your Image" />
            <div className="canvas-container" onClick={handleImageClick}>
              <canvas id="canvas"></canvas>
            </div>
            {comments.map((comment, index) => (
              <>
                <span
                  className="comment-index"
                  style={{ left: comment.x1, top: comment.y1 }}
                  onMouseEnter={() => handleCommentMouseEnter(index)}
                  onMouseLeave={() => handleCommentMouseLeave(index)}
                >
                  {index + 1}
                </span>
                {comment.editing || hoveredCommentIndex === index ? (
                  <div
                    key={index}
                    className="comment-popup"
                    style={{ left: comment.x, top: comment.y }}
                  >
                    {comment.editing ? (
                      <>
                        <input
                          type="text"
                          placeholder="Add a Comment"
                          value={comment.text}
                          onChange={(event) =>
                            handleCommentChange(event, index)
                          }
                          onKeyPress={(event) => handleKeyPress(event, index)}
                        />
                        <button
                          onClick={() => handlePostComment(index)}
                          className="comment-popup-button"
                        >
                          Post
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="comment-content">
                          <strong>{comment.author}:</strong>
                          <br />
                          {comment.time}
                        </div>
                        <div className="comment-text">{comment.text}</div>
                      </>
                    )}
                  </div>
                ) : null}
              </>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar to display comments */}
      <div className="comment-sidebar">
        <h3>Comments</h3>
        <hr />
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <div className="comment-dropdown">
                <button
                  className="dropdown-button"
                  onClick={() => toggleDropdown(index)}
                >
                  <span className="dots">&#8230;</span>
                </button>
                {comment.isDropdownOpen && (
                  <div className="dropdown-content">
                    <button
                      onClick={() => handleCommentClick(index)}
                      className="comment-popup-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComment(index)}
                      className="comment-popup-button"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleCopyLink(index)}
                      className="comment-popup-button"
                    >
                      Copy Link
                    </button>
                  </div>
                )}
              </div>
              <span className="comment-index-sidebar">{index + 1}</span>

              <div className="comment-content">
                <strong>{comment.author}:</strong>
                <br />
                {comment.time}
              </div>
              <div className="comment-text">{comment.text}</div>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ImageComments;
