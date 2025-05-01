import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const modifyStyle={

    padding:"15px 10px ",
    backgroundColor:"#FEE690",
    border:"1px solid white",
};

const modifyContainerStyle={
    paddingLeft:"20px",
    paddingRight:"10px"
};

//props로 itemId를 전달받음
function ProductModify({itemId}) {
    const navigate=useNavigate();
    //버튼 클릭 시 호출 될 함수
    const handleModify=()=> {
        navigate(`/product-update?id=${itemId}`);
    }
    return(
     <div style={modifyContainerStyle}>
     <button style={modifyStyle} onClick={handleModify}>수정</button>
     </div>
    );
};

export default ProductModify;