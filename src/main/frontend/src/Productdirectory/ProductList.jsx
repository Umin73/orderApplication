import React, {useEffect, useState} from "react";
import Sidebar from "../Sidedirectory/Sidebar";
import ProductModify from "../Productdirectory/ProductModify";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../axiosInstance";

//스타일 객체 정의
const layoutStyle={
    display:"flex",
};
const h2Style={
    display:"flex",
    justifyContent:"center",
    fontSize:"25px",
    paddingTop:"20px",
};

const BtnContainStyle={
    display:"flex",
    justifyContent:"flex-end",
    paddingRight:"180px",
    //paddingTop:"20px",
};
const newproductStyle={
    width:"150px",
    height:"60px",
    backgroundColor:"#DDF1E9",
    border:"1px solid white",
    fontWeight:"bold",
    fontFamily: "sans-serif",
    borderRadius:"10px",
}
const sidebarStyle={
    width:"200px",
    height:"100vh",
}

const mainContentStyle={
    flex:1,
    padding:"10px",
    marginLeft:"60px",
    marginRight:"40px",
}
const tableStyle = {
    width: "90%",
    margin: "20px",
    border: "1px solid black",
    fontFamily: "sans-serif",
    tableLayout: "fixed",
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
    width:"20px",
    border:'1px solid #ddd',
    padding:'20px 12px',  //기존 패딩 유지
    textAlign:'center',
};

function ProductList() {
    const [items, setItems]=useState([]);
    const navigate=useNavigate();

    const handleRegisterClick=()=>{
        navigate("/product-register");
    };
    
    //백엔드와 상호작용
    useEffect(()=> {
        //컴포넌트가 처음 렌더링될 때 백엔드에서 회원 리스트를 가져옴
        axiosInstance.get('/item/list')
            .then(response=> {
                console.log(response.data);
                setItems(response.data);
            })
            .catch(error=> {
                console.error('상품 리스트 가져오기 실패:',error);
            });
    }, []);

    return(

        <div>
            <h2 style={h2Style}>상품 관리</h2>
            <div style={BtnContainStyle}>
            <button style={newproductStyle} onClick={handleRegisterClick}>상품 등록</button>
            </div>
            <div style={layoutStyle}>
                <div style={sidebarStyle}>
                <Sidebar/>
            </div>
             <div style={mainContentStyle}>
            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={thStyle}>카테고리</th>
                    <th style={thStyle}>상품명</th>
                    <th style={thStyle}>판매가</th>
                    <th style={thStyle}>상품등록일</th>
                    <th style={thStyle}>상품상세조회</th>
                    <th style={thStyle}>수정</th>
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
                        <td style={tdStyle}>
                            <ProductModify  itemId={item.id} />
                        </td>

                    </tr>
                ))}
                </tbody>

            </table>
        </div>
            </div>
        </div>
    );
}

export default ProductList;