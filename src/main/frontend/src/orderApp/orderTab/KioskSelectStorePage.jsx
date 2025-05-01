import React from 'react';
import KioskNavBar from "../KioskNavBar";
import KioskHeader from "../KioskHeader";
import NearByStore from "./NearByStore";

function KioskSelectStorePage() {

    return (
        <>
            <KioskHeader isNextPage={false} pageName="매장선택"/>
            {/*<div style={{marginTop: '70px', backgroundColor:'#DBDBDB', padding: '6px'}}>*/}
            {/*    <p style={{fontSize: '12px', paddingLeft: '20px', marginBottom:'0', marginTop:'0'}}>내 위치로부터 반경 2km 이내의 매장입니다.</p>*/}
            {/*</div>*/}
            <div className="kiosk-main-container" style={{padding: "15px", paddingTop: '70px'}}>
                <NearByStore/>
            </div>
            <KioskNavBar/>
        </>
    );
}

export default KioskSelectStorePage;
