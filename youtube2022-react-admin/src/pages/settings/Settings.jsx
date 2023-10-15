import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { Settingstab } from '../../components/settingstab/Settingstab'
import './settings.scss'

const Settings = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">

        <div className="navbar"><Navbar /></div>
        <div className="workspace"> <Settingstab /></div>
        
      </div>
    </div>
  )
}

export default Settings
