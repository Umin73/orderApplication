import React from "react";

const sidebarContainterStyle = {
    paddingTop: '20px',
};

const menuItemStyle = {
    padding: '12px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    backgroundColor: '#ddd',
};

const selectedMenuItemStyle = {
    ...menuItemStyle,
    backgroundColor: '#e0e0e0',
    fontWeight: 'bold',
};

function Sidebar({ selectedMenu, onMenuSelect }) {
    const menuItems = ['회원관리', '상품관리', '주문관리'];

    return (
        <div style={sidebarContainterStyle}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {menuItems.map((item) => (
                    <li
                        key={item}
                        style={selectedMenu === item ? selectedMenuItemStyle : menuItemStyle}
                        onClick={() => onMenuSelect(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
