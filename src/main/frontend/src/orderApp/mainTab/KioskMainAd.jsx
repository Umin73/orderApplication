import React from "react";


export default function KioskMainAd() {
    return (
        <div style={{width:"100%", padding:"20px 0", display:"flex", alignItems:"center"}}>
            <img src={process.env.PUBLIC_URL + '/ad/starbucks_ad_1.jpg'} alt="logo" style={{width: '100%', borderRadius:"10px"}}/>
        </div>
    );
}