import React from "react";
import { Link } from 'react-router-dom';
import "./KioskNavBar.css"

const containerStyle={
    width:"100%",
    height:"60px",
  //margin:"10px",
   display:"flex",
    //flexDirection:"column",
   //alignItems:"center",
   padding:"0 5px",
   boxSizing:"border-box",

};

const itemContainerStyle={
display:"flex",
alignItems:"center",
justifyContent:"space-around", //균등 간격 배분
width:"100%",
height:"100%",
};


//아이콘과 텍스트를 세로로 배치
const linkitemStyle={
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    textDecoration:"none",
    color:"#333",
};



    export default function KioskNavBar() {

    return (
        <div className="kiosk-nav-bar-container" style={containerStyle}>
            <div className="kiosk-nav-bar-items" style={itemContainerStyle}>

                <Link className="kiosk-nav-bar-item" to="/kiosk/main" style={linkitemStyle}>
                    <img src={process.env.PUBLIC_URL + '/home.png'} alt="홈아이콘" />
                    <span>Home</span>
                    </Link>

                <Link className="kiosk-nav-bar-item" to="/kiosk/order" style={linkitemStyle}>
                    <img src={process.env.PUBLIC_URL + '/PAY.png'} alt="오더아이콘" />
                    <span>PAY</span>
                </Link>

                <Link className="kiosk-nav-bar-item" to="/kiosk/order" style={linkitemStyle}>
                    <img src={process.env.PUBLIC_URL + '/Order.png'} alt="오더아이콘"  />
                    <span>ORDER</span>
                </Link>

                <Link className="kiosk-nav-bar-item" to="/kiosk/my-info" style={linkitemStyle}>
                    <img src={process.env.PUBLIC_URL + '/user.png'} alt="마이페이지아이콘"   />
                    <span>MY</span>
                </Link>
            </div>
        </div>
    );
}