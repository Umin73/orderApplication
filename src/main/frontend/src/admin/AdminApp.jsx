import React,{useState} from 'react';
import MemberList from "../Userdirectory/MemberList";
import ProductList from "../Productdirectory/ProductList";
import Sidebar from "../Sidedirectory/Sidebar";



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


function AdminApp() {
    //현재 선택된 메뉴를 저장할 상태
    const [selectedMenu, setSelectedMenu] = useState('회원관리');
//메뉴 항목을 클릭했을 때 호출된 함수
    const handleMenuSelect = (menuName) => {
        setSelectedMenu(menuName);
    };

//선택된 메뉴에 따라 보여줄 컴포넌트를 결정하는 함수
    const renderContent=()=>{
        switch(selectedMenu) {
            case '회원관리':
                return<MemberList/>;
            case '상품관리':
                return<ProductList/>;
            case '주문관리':
                //return </>;
                return<div>주문 관리 페이지 내용</div>;
            default:
                return<div>메뉴를 선택해주세요</div>
        }
    }



    return (
        <div style={appLayoutStyle}>
            <div style={sidebarAreaStyle}>
                <Sidebar selectedMenu={selectedMenu} onMenuSelect={handleMenuSelect} />
            </div>
            <div style={contentAreaStyle}>
                <h1>키오스크 관리자 화면: {selectedMenu}</h1>
                {/*{selectedMenu === '회원 관리'}&& <MemberList/>*/}
                {/*{selectedMenu === '상품 관리'}&& <div><h2>상품 관리</h2></div>*/}
                {/*{selectedMenu === '주문 관리'}&& <div><h2>주문 관리</h2></div>*/}
                {renderContent()}
            </div>
        </div>


    );
}

export default AdminApp;