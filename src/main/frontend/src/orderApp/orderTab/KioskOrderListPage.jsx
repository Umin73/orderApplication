import React from 'react';
import KioskNavBar from "../KioskNavBar";
import KioskHeader from "../KioskHeader";
import KioskOrderList from "./KioskOrderList";

function KioskSelectStorePage() {

    return (
        <>
            <KioskHeader isNextPage={true} pageName="주문하기"/>
            <div className="kiosk-main-container" style={{padding: "15px", paddingTop: '70px'}}>
                <KioskOrderList />
            </div>
            <KioskNavBar/>
        </>
    );
}

export default KioskSelectStorePage;
