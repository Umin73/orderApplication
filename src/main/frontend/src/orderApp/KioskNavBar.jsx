import React from "react";
import "./KioskNavBar.css"


export default function KioskNavBar() {
    return (
        <div className="kiosk-nav-bar-container">
            <div className="kiosk-nav-bar-items">
                <div className="kiosk-nav-bar-item">
                    HOME
                </div>
                <div className="kiosk-nav-bar-item">
                    ORDER
                </div>
                <div className="kiosk-nav-bar-item">
                MY
                </div>
            </div>
        </div>
    );
}