import React from 'react'
import "./settingstab.scss"

export const Settingstab = () => {
  return (
    <div className="SettingsTab">
      <span>Settings</span>
      <div className='settingcontainer'>
        <button>Workspace</button>
        <hr />
        <form className="name">
          <label htmlFor="searchQuery"> Workspace Name </label>
          <div className="namein">
            <input type="text" placeholder="Search..." />
            <button type="submit">Search</button>
          </div>
        </form>
        <form className="url">
          <label htmlFor="searchQuery">Workspace URL </label>

          <div className="urlin">
            <input name="Workspace URL" type="text" placeholder="Search..." />
            <button type="submit">Search</button>
          </div>
        </form>

        <button className="icon">Upload Icon</button>
      </div>
    </div>
  )
}
