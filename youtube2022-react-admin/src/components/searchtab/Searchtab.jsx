import React from 'react'
import "./searchtab.scss"

export const Searchtab = () => {
  return (
    <div className="searchtab-bar">
      <div className="search">
        <div className="search-go">
          <input
            type="text"
            placeholder="Enter a URL here"
          />
          <button>Go</button>
        </div>
        <div className='search-or'>or</div>

        <button className="upload">Upload</button>
      </div>

      <div className="invite">
        <button>Invite</button>
      </div>
    </div>
  )
}