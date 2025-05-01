import React,{useState} from "react";

const tableStyle = {
    width: "80%",
    margin: "20px",
    border: "1px solid black",
    fontFamily: "sans-serif",
};
const thTdStyle ={
    border:'1px solid #ddd',
    padding:'10px 12px',
    textAlign:'left',
}


const thStyle = {
    border:'1px solid #ddd',
    padding:'10px 12px',
    textAlign:'center',
};

const tdStyle = {
    border:'1px solid #ddd',
    padding:'20px 12px',  //기존 패딩 유지
    textAlign:'center',
};

function ProductList() {
    const [items, setItems]=useState([]);




    return(
        <div>
            <h2>상품 관리</h2>

            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={thStyle}>카테고리</th>
                    <th style={thStyle}>상품명</th>
                    <th style={thStyle}>판매가</th>
                    <th style={thStyle}>상품등록일</th>
                    <th style={thStyle}>상품상세조회</th>
                </tr>
                </thead>
                <tbody>{/*회원 데이터*/}
                {items.map((item, index)=>(
                    <tr key={index}>

                        <td style={tdStyle}>{item.itemCategory}</td>
                        <td style={tdStyle}>{item.itemName}</td>
                        <td style={tdStyle}>{item.itemPrice}</td>
                        <td style={tdStyle}>{item.itemUpdateDateTime}</td>
                        <td style={tdStyle}>{item.itemDescription}</td>

                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    );
}

export default ProductList;