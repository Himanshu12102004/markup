import React from 'react'
import './DashboardImage.css' // Import the CSS for styling
import GuestLogin from './GuestLogin'
import ImageCard from './ImageCard'


const DashboardImage = () => {
  // Define an array of data for your image cards (you can replace this with your data)
 
  const [gridSize, setGridSize] = React.useState(6); // Default grid size

  const handleGridSizeChange = (newSize) => {
    setGridSize(newSize);
  };

  return (
    <div className="dashboard-container">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <GuestLogin />
        <div className="thumbnail-grid">
          <h3>Grid Size</h3>
          <button
            className="grid-button"
            onClick={() => handleGridSizeChange('grid-3')}
          >
            3
          </button>
          <button
            className="grid-button"
            onClick={() => handleGridSizeChange('grid-6')}
          >
            6
          </button>
          <button
            className="grid-button"
            onClick={() => handleGridSizeChange('grid-9')}
          >
            9
          </button>
        </div>
      </div>
      <div className="image-cards">
        {imageCardData.map((data,key) => (
          <ImageCard
            key={key}
            title='Title'
            time='5 days Ago'
            imageSrc={data.photo}
            shareCount='10'
            gridSize={gridSize}
          />
        ))}
      </div>
    </div>
  )
}

export default DashboardImage