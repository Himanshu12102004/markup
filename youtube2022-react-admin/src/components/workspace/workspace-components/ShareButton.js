import React, { Component } from 'react'
import './ShareButton.css'

class ShareButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false, // Initially, the popup is hidden
    }
  }

  togglePopup = () => {
    // Toggle the visibility of the popup
    this.setState((prevState) => ({ isVisible: !prevState.isVisible }))
  }

  closePopup = () => {
    // Close the popup
    this.setState({ isVisible: false })
  }

  render() {
    const { isVisible } = this.state

    return (
      <div>
        <button className="share-popup-send-button" onClick={this.togglePopup}>
          Share
        </button>

        {isVisible && (
          <div className="share-popup-container">
            <div className="share-popup-content">
              <button
                className="share-popup-close-button"
                onClick={this.closePopup}
              >
                &times; {/* The 'x' character for close */}
              </button>
              <h2>Share this MarkUp</h2>
              <div style={{ padding: '20px' }}>
                <div className="send-flex-box">
                  <input
                    className="share-popup-input"
                    type="email"
                    placeholder="Add email"
                  />
                  <button className="share-popup-send-button">Send</button>
                </div>
              </div>
              <div className="share-bottom">
                <div className="send-flex-box">
                  <h3 style={{ fontWeight: '200' }}>Share link</h3>
                  <div style={{ fontSize: '16px', color: 'grey' }}>
                    Anyone with the link has access{' '}
                    <label class="custom-checkbox">
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
                <div className="send-flex-box" style={{marginTop:'20px',backgroundColor:'white'}}>
                  <input
                    className="share-popup-input"
                    type="email"
                    placeholder="Copy the link"
                  />
                  <button className="share-popup-send-button">Copy</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default ShareButton
