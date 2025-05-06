import React from 'react';
import KioskNavBar from "../KioskNavBar";
import KioskHeader from "../KioskHeader";
import KioskMyInfo from "./KioskMyInfo";

function KioskMyInfoPage() {
    return (
        <>
            <KioskHeader isNextPage={false} pageName="회원 정보 관리" isOrderPage={false}/>
            <div className="kiosk-main-container" style={{padding: "15px", paddingTop: '70px'}}>
                <KioskMyInfo />
            </div>
            <KioskNavBar/>
        </>
    );
}

export default KioskMyInfoPage;
