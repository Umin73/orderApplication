import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const image1Style={
    width: '800px',
    height:"600px",
    borderRadius:"10px",
    marginTop:"20px",
    marginBottom:"50px",
};

//const image2Style={
//    width: '840px',
//    height:"600px",
//    borderRadius:"10px",
//    marginTop:"20px",
//    marginBottom:"50px",
//};

//모든 슬라이드에 스타일 적용
const slideStyle={
  width:"100%",
  height:"410px",
  borderRadius:"10px",
  marginTop:"49px",
  marginBottom:"30px",

};

const sliderContainerStyle = {
    width: '840px',
    margin: '20px auto 50px auto', // 위아래 마진 및 좌우 자동 마진으로 가운데 정렬
    overflow: 'hidden',
    borderRadius: "10px",
};


export default function KioskMainAd() {
    //슬라이드
    const settings={
        dots:false,
        infinite:true,
        speed:500,
        slideToShow:1,
        slideToScroll:1,
        autoplay:true,
        autoplaySpeed:3000,
        arrows:false,       // 이전 다음 화살표 숨기기
        adaptiveHeight:"true"
    };

    //광고 이미지 소스 배열
    const adImages=[
        '/ad/starbucks_ad_1.jpg',
        '/ad/starbucks_ad_2.jpg',
        '/ad/starbucks_ad_3.jpg',
        '/ad/starbucks_ad_4.jpg',];

    return (
        <div>
            <Slider {...settings}>
                {adImages.map((imgSrc,index)=>(
        <div key={index} style={{width:"100%", padding:"20px 0", display:"flex", alignItems:"center"}}>
            {/*<img src={process.env.PUBLIC_URL + '/ad/starbucks_ad_1.jpg'} alt="logo" style={image1Style}/>*/}
            <img src={process.env.PUBLIC_URL + imgSrc} alt={`광고${index+1}`} style={slideStyle}/>

        </div>
                    ))}
            </Slider>
        </div>
    );
}