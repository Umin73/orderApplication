import React,{useState} from "react";

const sidebarContainterStyle={
    paddingTop:'20px',

}
const menuItemStyle={
    padding:'12px 20px',
    cursor:'pointer',
    fontSize:'16px',
    backgroundColor:'#ddd',
}

//선택된 메뉴
const selectedMenuItemStyle= {
    ...menuItemStyle,
    backgroundColor:'#e0e0e0',
    fontWeight:'bold',
}


function Sidebar({selectedMenu,onMenuSelect}) {
    const menuItems=['회원관리', '상품관리', '주문관리'];

    return(
        //onSelectMemu 함수를 호출하고 해당 메뉴의 이름을 전달
        <div style={sidebarContainterStyle}>
            <ul>
                {menuItems.map((item)=>(<li key={item}
                style={selectedMenu=== item ? selectedMenuItemStyle:
                menuItemStyle} onclick={()=>onMenuSelect(item)}>{item}</li>
                ))}
            </ul>
        </div>

    );
}

export default Sidebar;