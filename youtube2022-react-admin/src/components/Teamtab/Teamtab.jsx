import React from 'react'
import "./teamtab.scss"
import {useState} from "react"

export const Teamtab = () => {

    const [activeTab, setActiveTab] = useState(1);

    const toggleTab = (id)=>{

        setActiveTab(id);

    }

  return (
    <div className="Teamtab">
      <div className="Head">
        <span>Team</span>
        <button>Invite</button>
      </div>
      <div className="teamcontent">
        <div className="Tabnames">
          <button onClick={() => toggleTab(1)}>Members</button>
          <button onClick={() => toggleTab(2)}>Guests</button>
          <hr />
        </div>

        <div className={activeTab === 1 ? 'ContentMembers' : 'inactiveTab'}>
          <p>THIS IS THE Members TAB</p>
        </div>

        <div className={activeTab === 2 ? 'ContentGuests' : 'inactiveTab'}>
          <p>THIS IS THE Guests TAB</p>
        </div>
      </div>
    </div>
  )
}
