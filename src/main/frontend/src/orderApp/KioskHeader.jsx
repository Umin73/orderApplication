import React from "react";
import {useNavigate} from 'react-router-dom';
import "./KioskHeader.css";
import { SlArrowLeft, SlBasket  } from "react-icons/sl";

export default function KioskHeader({ isNextPage, pageName, isOrderPage=true }) {
    const navigate = useNavigate();

    return (
        <div className="kiosk-header-container">
            <div className="kiosk-header-left-section">
                {isNextPage && (
                    <SlArrowLeft
                        className="kiosk-header-icon"
                        onClick={() => navigate(-1)}
                    />
                )}
            </div>
            <div className="kiosk-header-center-section">
                <p className="kiosk-header-title-text">{pageName}</p>
            </div>
            <div className="kiosk-header-right-section">
                {isOrderPage && (
                    <SlBasket className="kiosk-header-icon"
                              onClick={()=>navigate("/kiosk/cart")} />
                )}
            </div>
        </div>
    );
}
