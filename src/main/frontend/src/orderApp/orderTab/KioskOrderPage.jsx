import React from 'react';
import KioskNavBar from "../KioskNavBar";
import KioskHeader from "../KioskHeader";
import {useLocation} from "react-router-dom";


function KioskOrderPage() {
    return (
        <>
            <KioskHeader isNextPage={true} pageName="결제하기"/>
            <div className="kiosk-main-container" style={{padding: "15px", paddingTop: '70px'}}>

            </div>
            <KioskNavBar/>
        </>
    );
}

export default KioskOrderPage;
