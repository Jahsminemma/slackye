import React from 'react'
import './SidebarOption.css'
import db from "../../../firebase";
import { useHistory } from "react-router-dom"

const SidebarOption = ({ Icon, title, id, uid, addChannelOption, photoURL, color}) => {
    const history = useHistory()

    const selectChannel = () => {
        if (id) {
            history.push(`/room/${id}`)  
        }
        if (uid) {
            history.push(`/user/${uid}`)
        }
        
     }
    const addNewChannel = () => {
        const channelName = prompt("whats your name");
        if (channelName) {
            db.collection("rooms").add({
                name : channelName
            })
        }
    }
    
    
    return (
        <div style={{color:`${color}`}} className="sidebarOption">
             <div className="sidebarOption__details" onClick={addChannelOption ? addNewChannel : selectChannel}>
                {Icon && <Icon src={ `${photoURL}`} alt ={title} className="sidebarOption__icon"/>}
            {Icon ? (
                <h4>{title}</h4>
            ) :
                (
                    <h4 className="sidebarOption__channel">
                        <span className="sidebarOption__hash">#</span>
                            {
                            title?.slice(0, 10) + "..."
                        }
                    </h4>
                    )}
            </div>
        </div>
    )
}

export default SidebarOption
