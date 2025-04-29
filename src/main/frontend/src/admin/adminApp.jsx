import React,{useState} from 'react';
import MemberList from "./Userdirectory/MemberList";
import Sidebar from "./Sidedirectory/Sidebar";



//전체 앱 레이아웃 스타일
const appLayoutStyle= {
    display:'flex',
    minHeight:'100vh' // 앱 전체 최소 높이
}
// 사이드바 영역 스타일
const sidebarAreaStyle= {
    width:'200px',
    borderRight:'1px solid #ccc' //구분선
}
//메인 콘텐츠 영역 스타일
const contentAreaStyle={
    flexGrow:1, //남은 공간 모두 차지
    padding:'20px',
}


function App() {
    //현재 선택된 메뉴를 저장할 상태
    const [selectedMenu, setSelectedMenu] = useState('회원관리');
//메뉴 항목을 클릭했을 때 호출된 함수
    const handleMenuSelect = (menuName) => {
        setSelectedMenu(menuName);
    };



    return (
        <div style={appLayoutStyle}>
            <div style={sidebarAreaStyle}>
                <Sidebar selectedMenu={selectedMenu} onMenuSelect={handleMenuSelect}/>
            </div>
            <div style={contentAreaStyle}>
                <h1>키오스크 관리자 화면</h1>
                {selectedMenu === '회원 관리'}&& <MemberList/>
                {/*{selectedMenu === '상품 관리'}&& <div><h2>상품 관리</h2></div>*/}
                {/*{selectedMenu === '주문 관리'}&& <div><h2>주문 관리</h2></div>*/}

            </div>
        </div>



    );