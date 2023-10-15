import React, { useState } from 'react'
import './ShareButton.css'

function UploadButton() {
  const [isVisible, setIsVisible] = useState(false)

  const togglePopup = () => {
    // Toggle the visibility of the popup
    setIsVisible((prevIsVisible) => !prevIsVisible)
  }

  const closePopup = () => {
    // Close the popup
    setIsVisible(false)
  }

  return (
    <div>
      <button className="share-popup-send-button" onClick={togglePopup}>
        Upload
      </button>

      {isVisible && (
        <div className="share-popup-container">
          <div className="share-popup-content">
            <button className="share-popup-close-button" onClick={closePopup}>
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
              style={{ width: '35vw' }}
            />
            <button
              className="share-popup-send-button"
              style={{ marginBottom: '20px' }}
            >
              Browse
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadButton
