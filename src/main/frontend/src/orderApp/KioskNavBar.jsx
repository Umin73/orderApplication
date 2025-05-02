import React from "react";
import { Link } from 'react-router-dom';
import "./KioskNavBar.css"


export default function KioskNavBar() {

    return (
        <div className="kiosk-nav-bar-container">
            <div className="kiosk-nav-bar-items">
                <Link className="kiosk-nav-bar-item" to="/kiosk/main" style={{ textDecoration: "none", color: "inherit" }}>
                    HOME
                </Link>
                <Link className="kiosk-nav-bar-item" to="/kiosk/order" style={{ textDecoration: "none", color: "inherit" }}>
                    ORDER
                </Link>
                <Link className="kiosk-nav-bar-item" to="/signup" style={{ textDecoration: "none", color: "inherit" }}>
                    MY
                </Link>
            </div>
        </div>
    );
}