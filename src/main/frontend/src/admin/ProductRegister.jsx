import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

const productRegisterContainerStyle={
    width:"90%",
    margin:"20px",
    padding:"20px",
    border:"solid 2px #ccc",
    borderRadius:"10px",
    backgroundColor:"#5AAE8A",

};

const checkbokGroupStyle={
 fontSize:"20px",
 //border:"1px solid #ffffff",
 margin:"25px",
 padding:"10px",
 display:"flex",
 justifyContent:"flex-end",
}

const h2Style={
    display:"flex",
    justifyContent:"center",
    AlignItems:"center",
};

const submitStyle={
   border:"1px solid #ffffff",
   backgroundColor:"#DDF1E9",
    fontSize:"25px",
    display:"flex",
    justifyContent:"space-between",
};

const check1Style={
 width:"20%",
 marginLeft:"60px",
};

const check2Style={
    //padding:"30px",
    //:"10px",
    width:"20%",
    marginLeft:"100px",
}

const check3Style={
    width:"20%",
    marginLeft:"30px",
}

const itemStyle={
    display:"flex",
};

const inputStyle={
    width:"30%",
    backgroundColor:"#F4F4F4",
};

const selectStyle={
    backgroundColor:"#F4F4F4",
    width:"10%",
    fontSize:"25px",
    flexGrow:1,
};


//flex를 통해 자식 요소 가로로 정렬
const textareaContainerStyle={

    border:"1px solid #ffffff",
    display:"flex",
    flexWrap:"wrap",
    //gap:"20px",
    //flexDirection:"column",

}

const textareaitem1Style={
    width:"50%",
    fontSize:"25px",
    display:"flex",
    flexDirection:"column",
    //alignItems:"center",

}

const textareaitem2Style={
    width:"50%",
    height:"500px",
    //paddingLeft:"10px",
    fontSize:"25px",
    display:"flex",
    flexDirection:"column",


}
// 상품 설명
const itemboxStyle={
  width:"100%",
  height:"500px",
    padding: "0"


};

const label1Style={
    width:"100%",
    backgroundColor:"#DDF1E9",
    display:"flex",
    justifyContent:"flex-start",

};

const label2Style={
  width:"100%",
  display:"flex",
  justifyContent:"flex-start",
  // paddingRight:"172px",
    backgroundColor:"#DDF1E9",
  alignItems:"center",


};

const buttonWrapperStyle={
    display:"flex",
    justifyContent:"flex-start",
    paddingLeft:"300px",
    alignItems:"center",
    marginTop:"20px",
}

const itemBtnStyle={
    width:"200px",
    height:"80px",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    fontSize:"18px",
    color:"#ffffff",
    backgroundColor:"#285F43",
    borderRadius:"10px",
};

const previewStyle={
    width:"420px",
    height:"440px",
    //paddingRight:"400px",
};

const previewContainerStyle={
//marginTop:"120px",
width:"100px",
height:"10px",
};

function ProductRegister() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        itemName: '',
        itemCategory: '커피',
        itemPrice: '',
        itemRecommend: 0,
        itemNew: 0,
        itemImageUrl: '',
        itemDescription: '',
    });

    const [imageFile, setImageFile] = useState(null);
    const [previewUrl,setPreviewUrl]=useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = (type === "checkbox") ? (checked ? 1 : 0) : value;
        setFormData(prev => ({ ...prev, [name]: val }));
    };

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        setImageFile(selectedFile);

        if(selectedFile) {
            const preview = URL.createObjectURL(selectedFile);
            setPreviewUrl(preview);
        }
    };


    const handleImageUpload = async () => {
        if (!imageFile) return null;

        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await axios.post('/item/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data.imageUrl; // 서버는 imageUrl 반환해야 함
        } catch (error) {
            alert('이미지 업로드 실패');
            console.error(error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const uploadedImageUrl = await handleImageUpload();

        if (!uploadedImageUrl) return;

        const payload = {
            ...formData,
            itemPrice: parseInt(formData.itemPrice),
            itemImageUrl: uploadedImageUrl,
            itemUpdateDateTime: new Date().toISOString(),
        };

        try {
            const response = await axios.post('/item/add', payload);
            alert('상품이 성공적으로 등록되었습니다!');
            console.log(response.data);
            navigate("/admin");

        } catch (error) {
            alert('상품 등록 실패');
            console.error(error);
        }
    };


    return (
        <div className="product-register-container" style={productRegisterContainerStyle}>
            <h2 style={h2Style}><span>상품 등록</span></h2>
        <div className="checkbok-group" style={checkbokGroupStyle}>
            <label>
                <input type="checkbox" name="itemRecommend" checked={formData.itemRecommend === 1} onChange={handleChange}/>
                추천 상품
            </label>

            <label>
                <input type="checkbox" name="itemNew" checked={formData.itemNew === 1} onChange={handleChange}  />
                신상품
            </label>
        </div>

            <form onSubmit={handleSubmit}>
                <div style={submitStyle}>
                   <span style={check1Style}>카테고리</span>
                    <span style={check2Style}>상품명</span>
                    <span  style={check3Style}>가격</span>
                </div>
               <div style={itemStyle}>
                <label></label>
                <select name="itemCategory" value={formData.itemCategory} onChange={handleChange} style={selectStyle}>
                    <option value="커피">커피</option>
                    <option value="티">티</option>
                    <option value="블렌디드">블렌디드</option>
                    <option value="프라푸치노">프라푸치노</option>
                    <option value="기타">기타</option>
                </select>
                <label></label>
                <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} required style={inputStyle} />
                    <label></label>
                    <input type="number" name="itemPrice" value={formData.itemPrice} onChange={handleChange} required style={inputStyle}/>
            </div>
                <div style={textareaContainerStyle}>
                <div style={textareaitem1Style}>
                    <label style={ label1Style}>상품 이미지</label>

                <input type="file" accept="image/*" onChange={handleImageChange}  />
                    {previewUrl && (
                        <div style={previewContainerStyle}>
                            <img src={previewUrl} alt="미리보기" style={previewStyle} />
                        </div>
                    )}
                </div>
                    {/*상품 설명 아이템*/}
                    <div style={textareaitem2Style}>
                <label style={label2Style}>상품 설명</label>
                <textarea  name="itemDescription" value={formData.itemDescription} onChange={handleChange} style={itemboxStyle} />
                    </div>

                </div>

                <div style={buttonWrapperStyle}>
                <button type="submit" style={itemBtnStyle}>상품 등록</button>
                </div>
            </form>
        </div>
    );
}
export default ProductRegister;
