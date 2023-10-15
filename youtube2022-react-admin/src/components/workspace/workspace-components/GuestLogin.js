import React, { Component } from 'react'
import './ShareButton.css'

class GuestLogin extends Component {
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
          Guest
        </button>

        {isVisible && (
          <div className="share-popup-container">
            <div className="share-popup-content" style={{width:'25vw'}}>
              <button
                className="share-popup-close-button"
                onClick={this.closePopup}
                style={{marginLeft:'348px'}}
              >
                &times; {/* The 'x' character for close */}
              </button>
              <img src="images/logo.png" alt="Logo" />
              <h2>Welcome to MarkUp</h2>
              <h5 style={{ color: 'grey', fontWeight: '100' }}>
                No signup required. Just provide a little info to let <br />{' '}
                your team know who the feedback is from.
              </h5>
              <input
                className="share-popup-input"
                type="email"
                placeholder="Name"
                style={{ width: '20vw', padding: '15px 10px', margin: '10px' }}
              />
              <input
                className="share-popup-input"
                type="email"
                placeholder="Email*(Optional)"
                style={{ width: '20vw', padding: '15px 10px', margin: '10px' }}
              />
              <button
                className="share-popup-send-button"
                style={{ width: '21.5vw',marginBottom:'20px',marginTop:'10px' }}
              >
                Continue as Guest
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default GuestLogin
