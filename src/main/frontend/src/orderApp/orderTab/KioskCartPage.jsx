import React from 'react';
import KioskNavBar from "../KioskNavBar";
import KioskHeader from "../KioskHeader";
import {useLocation} from "react-router-dom";
import KioskCart from "./KioskCart";

function KioskCartPage() {
    return (
        <>
            <KioskHeader isNextPage={true} pageName="주문하기"/>
            <div className="kiosk-main-container" style={{padding: "15px", paddingTop: '70px'}}>
                <KioskCart />
            </div>
            <KioskNavBar/>
        </>
    );
}

export default KioskCartPage;
