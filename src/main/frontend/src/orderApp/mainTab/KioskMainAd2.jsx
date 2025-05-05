import React,{useEffect,useState} from "react";
import axios from "axios";
import axiosInstance from "../../axiosInstance";

const pStyle={
    fontSize:"20px",
    fontWeight:"bold",
    paddingLeft:"15px",
    marginTop:"10px",
};

 const recommenuContainerStyle={
  display:"flex",
     flexDirection:"row",
     justifyContent:"flex-start", //아이템을 위쪽 기준으로 정렬
     marginTop:"20px",
     marginBottom:"10px",
     overflowX:"auto", //아이템이 많을 시 가로로 스크롤 허용
     gap:"15px",
  //flexWrap:"wrap",
 };
const recommenuItemStyle={
    display:"flex",
    flexDirection: "column",
    alignItems:"center",
    marginBottom:"10px",
    width:"fit-content", //요소의 너비를 내부 내용물에 맞게 줄임
    //padding:"15px",
};
const recommendStyle={
    width:"100px",
    height:"100px",
    borderRadius:"50%",
    //objectFit:"cover", //이미지가 영역 비율 유지하며 채움
    marginBottom:"5px",
    //gap:"10px",
}
const textStyle={
 fontSize:"16px",
 width:"100px",
 textAlign:"center",
wordBreak:"keep-all",
};

const KioskMainAd2=()=> {
    const [user,setUser]=useState(null);

    useEffect(()=> {
        const fetchUser=async()=> {
            const token=localStorage.getItem("token");
            console.log("token:",token);

            try{
                const response=await axiosInstance.get('/user/me');
                setUser(response.data);
            } catch (error) {
                console.error("사용자 정보를 불러오는 데 실패했습니다:",error);
            }
        };
        fetchUser();
    },[]);


    return(
        <div>
            <div style={pStyle}>{
                user && <p>{user.username}님을 위한 추천 메뉴</p> } </div>
        <div className="kiosk-recommend-container" style={recommenuContainerStyle}>

            <div className="kiosk-reccommend-item" style={recommenuItemStyle}>
            <img src={process.env.PUBLIC_URL + '/ad/americano.png'} alt="추천메뉴1" style={recommendStyle}/>
            <span style={textStyle}>아메리카노</span>
            </div>
            <div className="kiosk-reccommend-item" style={recommenuItemStyle}>
            <img src={process.env.PUBLIC_URL + '/ad/signitureChocolate.png'} alt="추천메뉴2" style={recommendStyle}/>
            <span style={textStyle}>시그니처 초코라떼</span>
            </div>
            <div className="kiosk-reccommend-item" style={recommenuItemStyle}>
                <img src={process.env.PUBLIC_URL + '/ad/peachice.png'} alt="추천메뉴1" style={recommendStyle}/>
                <span style={textStyle}>복숭아 아이스티</span>
            </div>
            <div className="kiosk-reccommend-item" style={recommenuItemStyle}>
                <img src={process.env.PUBLIC_URL + '/ad/strawberrylatte.png'} alt="추천메뉴1" style={recommendStyle}/>
                <span style={textStyle}>스타벅스 딸기라떼</span>
            </div>
        </div>
        </div>
    );
}

export default KioskMainAd2;
