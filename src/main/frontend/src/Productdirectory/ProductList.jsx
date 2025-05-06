import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import ProductModify from "../Productdirectory/ProductModify";

// 스타일 - MemberList와 통일
const tableStyle = {
    width: "80%",
    margin: "20px",
    border: "1px solid black",
    fontFamily: "sans-serif",
};

const thStyle = {
    border: '1px solid #ddd',
    padding: '10px 12px',
    textAlign: 'center',
};

const tdStyle = {
    border: '1px solid #ddd',
    padding: '20px 12px',
    textAlign: 'center',
};

const h2Style = {
    textAlign: 'center',
    marginBottom: '10px',
};

const pStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#555',
};

const BtnContainStyle = {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "10%",
    marginBottom: "10px"
};

const newproductStyle = {
    width: "150px",
    height: "50px",
    backgroundColor: "#DDF1E9",
    border: "1px solid white",
    fontWeight: "bold",
    fontFamily: "sans-serif",
    borderRadius: "10px",
    cursor: "pointer"
};

const deleteButtonStyle = {
    backgroundColor: "#ff6b6b",
    border: "none",
    color: "white",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold"
};

function ProductList() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    const fetchItems = () => {
        axiosInstance.get('/item/list')
            .then(response => {
                console.log(response.data);
                setItems(response.data);
            })
            .catch(error => {
                console.error('상품 리스트 가져오기 실패:', error);
            });
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleRegisterClick = () => {
        navigate("/product-register");
    };

    const handleDelete = async (itemId) => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            await axiosInstance.delete(`/item/delete/${itemId}`);
            setItems(prevItems => prevItems.filter(item => item.id !== itemId)); // item.id 기준
            alert("삭제되었습니다.");
        } catch (error) {
            console.error("삭제 실패:", error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    return (
        <div>
            <h2 style={h2Style}>상품 목록</h2>
            <p style={pStyle}>총 {items.length}개의 상품이 있습니다.</p>
            <div style={BtnContainStyle}>
                <button style={newproductStyle} onClick={handleRegisterClick}>상품 등록</button>
            </div>
            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={thStyle}>카테고리</th>
                    <th style={thStyle}>상품명</th>
                    <th style={thStyle}>판매가</th>
                    <th style={thStyle}>등록일</th>
                    <th style={thStyle}>수정</th>
                    <th style={thStyle}>삭제</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={index}>
                        <td style={tdStyle}>{item.itemCategory}</td>
                        <td style={tdStyle}>{item.itemName}</td>
                        <td style={tdStyle}>{item.itemPrice}</td>
                        <td style={tdStyle}>{item.itemUpdateDateTime}</td>
                        <td style={tdStyle}>
                            <ProductModify item={item} />
                        </td>
                        <td style={tdStyle}>
                            <button
                                style={deleteButtonStyle}
                                onClick={() => handleDelete(item.id)}
                            >
                                삭제
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;
