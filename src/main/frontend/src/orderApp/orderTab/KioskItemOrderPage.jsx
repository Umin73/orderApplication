import React from 'react';
import KioskNavBar from "../KioskNavBar";
import KioskHeader from "../KioskHeader";

function KioskItemOrderPage() {

    return (
        <>
            <KioskHeader isNextPage={true} pageName=""/>
            <div className="kiosk-main-container" style={{padding: "15px", paddingTop: '70px'}}>

            </div>
            <KioskNavBar/>
        </>
    );
}

export default KioskItemOrderPage;
