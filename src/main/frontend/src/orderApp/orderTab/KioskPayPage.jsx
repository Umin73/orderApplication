import React from 'react';
import KioskNavBar from "../KioskNavBar";
import KioskHeader from "../KioskHeader";
import KioskPay from "./KioskPay";

function KioskPayPage() {
    return (
        <>
            <KioskHeader isNextPage={true} pageName="주문하기"/>
            <div className="kiosk-main-container" style={{padding: "15px", paddingTop: '70px'}}>
                <KioskPay />
            </div>
            <KioskNavBar/>
        </>
    );
}

export default KioskPayPage;
