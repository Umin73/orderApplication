import React from 'react';
import KioskNavBar from "../KioskNavBar";
import KioskHeader from "../KioskHeader";
import {useLocation} from "react-router-dom";

function KioskCartPage() {

    const location = useLocation();
    const {item} = location.state;

    return (
        <>
            <KioskHeader isNextPage={true} pageName=""/>
            <div className="kiosk-main-container" style={{padding: "15px", paddingTop: '70px'}}>
                {/*<KioskItemOrder item={item} />*/}
            </div>
            <KioskNavBar/>
        </>
    );
}

export default KioskCartPage;
