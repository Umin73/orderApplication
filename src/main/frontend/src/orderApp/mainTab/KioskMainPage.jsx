import React from 'react';
import KioskNavBar from "../KioskNavBar";
import KioskMainRewardCard from "./KioskMainRewardCard"
import KioskMainAd from "./KioskMainAd";

function KioskMainPage() {


    return (
        <>
            <div className="kiosk-main-container" style={{padding: "15px"}}>
                <KioskMainRewardCard />
                <KioskMainAd />
            </div>
            <KioskNavBar />
        </>
    );
}

export default KioskMainPage;
