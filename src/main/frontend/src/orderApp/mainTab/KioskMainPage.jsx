import React, {useState,useEffect} from 'react';
import KioskNavBar from "../KioskNavBar";
import KioskMainRewardCard from "./KioskMainRewardCard"
import KioskMainAd from "./KioskMainAd";
import KioskMainAd2 from "./KioskMainAd2";

const scrollToTopButtonStyle = {
    position: 'fixed',     // 화면 스크롤에 관계없이 위치 고정
    bottom: '80px',        // 화면 하단으로부터의 거리 (NavBar 높이 고려하여 조정 필요)
    right: '30px',         // 화면 오른쪽으로부터의 거리
    zIndex: 1000,          // 다른 요소들보다 위에 표시되도록 z-index 설정
    cursor: 'pointer',     // 마우스 오버 시 커서 모양 변경
    backgroundColor: 'rgba(0, 123, 255, 0.7)', // 배경색 (예: 파란색, 약간 투명하게)
    color: 'white',        // 아이콘/텍스트 색상
    border: 'none',        // 테두리 없음
    borderRadius: '50%',   // 원형 버튼으로 만들기
    width: '50px',         // 버튼 너비
    height: '50px',        // 버튼 높이
    fontSize: '24px',      // 아이콘/텍스트 크기
    display: 'flex',       // 내부 요소(아이콘/텍스트) 중앙 정렬을 위해 flex 사용
    alignItems: 'center',  // 수직 중앙 정렬
    justifyContent: 'center',// 수평 중앙 정렬
    boxShadow: '0 2px 5px rgba(0,0,0,0.3)', // 약간의 그림자 효과 (선택 사항)
    transition: 'opacity 0.3s ease-in-out', // 나타나고 사라질 때 부드러운 효과 (선택 사항)
};

function KioskMainPage() {

    const [showScrollButton, setShowScrollButton]=useState(false);
    const navBarHeight = 60;
    const bottomPadding = navBarHeight + 20;


    //페이지를 맨 위로 부드럽게 스크롤하는 함수
    const scrollToTop=()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
            });
    };

    const checkScrollTop=()=>{
        //사용자가 일정 픽셀이상 아래로 스크롤했는지 확인
        if(!showScrollButton&&window.scrollY>500) {
            setShowScrollButton(true); //200px 넘게 스크롤하면 버튼 표시
        } else if(showScrollButton &&window.scrollY <=500){
            setShowScrollButton(false);
        }
    };

     {/*checkScrollTop은 현재 페이지의 스크롤 위치를 확인하고 "맨 위로 가기" 버튼을 보여줄지 말지를 결정하는 역할 */}
    useEffect(()=>{
        window.addEventListener("scroll", checkScrollTop);
        //컴포넌트가 언마운트될 때
        return()=>{
            window.removeEventListener("scroll",checkScrollTop);
        };

    },[showScrollButton]);





    return (
           <>
            <div className="kiosk-main-container" style={{padding: "15px", paddingBottom: `${bottomPadding}px`}}>
                <KioskMainRewardCard />
                <KioskMainAd2/>
                <KioskMainAd />
            </div>


            {/*showScrollButton 상태가 true일때만 버튼 렌더링*/}
            {showScrollButton &&(
                <button onClick={scrollToTop}  style={scrollToTopButtonStyle}
                        aria-label="맨 위로 스크롤"></button>
            )}
                    <KioskNavBar />
            </>

    );
}

export default KioskMainPage;
