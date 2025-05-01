import React from "react";


export default function KioskMainRewardCard() {
    return (
        <div style={{boxShadow: "-2px 0 8px rgba(0, 0, 0, 0.2)", width:"100%", padding:"20px 0", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <div style={{margin:"10px"}}>
                <div style={{margin:"10px"}}>
                    스타벅스 카드를 등록하시고<br/>
                    <span style={{color: "#4AA366", fontWeight:"bold"}}>스타벅스 리워드</span> 회원의<br/>
                    다양한 혜택을 누리세요!
                </div>
                <div style={{margin:"10px"}}>
                    <button style={{color: "white", background:"#4AA366", border:"none", borderRadius: "15px", padding: "5px 10px"}}>카드 등록</button>
                </div>
            </div>
            <div>
                <img src={process.env.PUBLIC_URL + '/starbucks_logo2.png'} alt="logo" style={{width: '15vh'}}/>
            </div>
        </div>
    );
}