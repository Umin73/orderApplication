import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams, useNavigate, useLocation} from 'react-router-dom';

// --- 스타일 정의 ---

const productRegisterContainerStyle = {
    width: "90%",
    minHeight: "600px",
    margin: "20px auto",
    padding: "20px",
    border: "solid 1px #ccc",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif",
};

const h2Style = {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
};

const checkbokGroupStyle = {
    fontSize: "16px",
    margin: "15px 0",
    padding: "10px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "20px",
};

const checkboxLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    cursor: 'pointer'
};

const formContainerStyle = {
    width: "100%"
};

// rowBaseStyle에 flexWrap 추가
const rowBaseStyle = {
    width: "100%",
    border: "1px solid #ccc",
    backgroundColor: "#5AAE8A",
    fontSize: "16px",
    marginBottom: "15px",
    padding: "15px",
    borderRadius: "5px",
    boxSizing: 'border-box',
    display: 'flex',       // Flexbox 사용
    flexWrap: 'wrap',      // 내용이 넘치면 다음 줄로
    gap: "20px",           // 아이템 사이 간격
    // justifyContent 와 alignItems 는 wrap 상태에서는 기본값(flex-start)을 사용하는 것이 예측하기 쉬울 수 있음
};

// 컬럼 스타일: 너비를 지정하여 줄바꿈 유도 (flex-basis 사용)
const columnStyle = {
    display: "flex",
    flexDirection: "column",
    // flex: 1だと均等割りになるため、basisで幅を指定
    flexGrow: 1, // 남는 공간은 채우도록 허용
    flexShrink: 1, // 공간이 부족하면 줄어들도록 허용
    flexBasis: 'calc(33.333% - 20px)', // 기본 너비 33.3%, gap 고려하여 빼줌 (gap 20px 기준)
    // 실제로는 브라우저 계산 및 box-sizing에 따라 미세 조정 필요할 수 있음
    minWidth: '100px', // 너무 작아지지 않도록 최소 너비 설정 (선택 사항)
    gap: "5px",
};

// 상품 설명 컬럼은 더 넓게 (선택 사항)
const descriptionColumnStyle = {
    ...columnStyle, // 예시: 2칸 정도 너비

};


const selectStyle = {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "15px",
    backgroundColor: "white",
};

const inputStyle = {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "15px",
};

const fileInputStyle = {
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    backgroundColor: "white",
    marginBottom: "10px",
};


//상품 이미지
const imagePreviewStyle = {
    width:"350px",
    height:"300px",
    maxHeight: '300px',
    marginBottom: '10px',
    marginTop:"20px",
    display: 'block',
    paddingLeft:"10px",
};

//상품 설명
const textareaStyle = {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    minHeight: "370px",
    resize: "vertical",
    width: '90%', // 부모 컬럼 너비에 맞춤
};


//파일 변경/제거 버튼
const removeButtonStyle = {
    fontSize: '12px',
    padding: '3px 8px',
    cursor: 'pointer',
    backgroundColor: '#eee',
    border: '1px solid #ccc',
    borderRadius: '3px',
};


const buttonBaseStyle = {
    display: 'block',
    margin: '20px auto 0 auto',
    padding: '10px 25px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#FEE690',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

const buttonHoverStyle = {
   backgroundColor: '#4a9a7a',
};


// --- 컴포넌트 정의 ---

function ProductEdit() {

    const location = useLocation();
    const {item} = location.state;

    const { id } = useParams();
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const [formData, setFormData] = useState({
        itemName: item.itemName,
        itemCategory: item.itemCategory,
        itemPrice: item.itemPrice,
        itemRecommend: item.itemRecommend,
        itemNew: item.itemNew,
        itemImageUrl: item.itemImageUrl,
        itemDescription: item.itemDescription,
    });

    const [imageFile, setImageFile] = useState(null);

    {
        console.log("item: ", item );
    }
  

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'itemPrice') {
            const priceValue = value === '' ? '' : parseInt(value, 10);
            if (!isNaN(priceValue) || value === '') {
                setFormData((prev) => ({ ...prev, [name]: priceValue }));
            }
        } else {
            const val = type === 'checkbox' ? (checked ? 1 : 0) : value;
            setFormData((prev) => ({ ...prev, [name]: val }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
         e.target.value = null; // 필요 시 활성화
    };
    //파일 변경 핸들러
    const handleRemoveImage = () => {
        setImageFile(null)
    };
        // 이미지 업로드 로직
        const handleImageUpload = async () => {
            if (!imageFile) return formData.itemImageUrl || null;
            const formDataImage = new FormData();
            formDataImage.append('image', imageFile);
            try {
                const response = await axios.post('/item/upload-image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                return response.data.imageUrl;
            } catch (error) {
                alert('이미지 업로드 실패');
                console.error("Upload error:", error.response || error.message || error);
                return formData.itemImageUrl || null;
            }
        };

        // 폼 제출 로직 (변경 없음)
        const handleSubmit = async (e) => {
            // ... (이전과 동일)
            e.preventDefault();
            const uploadedImageUrl = await handleImageUpload();
            const priceToSend = formData.itemPrice === '' ? 0 : parseInt(formData.itemPrice, 10);
            const payload = {
                ...formData,
                itemPrice: priceToSend,
                itemImageUrl: uploadedImageUrl,
            };
            try {
                await axios.post(`/item/update`, payload);
                console.log("<<< axios.put 요청 성공");
                alert('상품이 성공적으로 수정되었습니다!');
                navigate('/item/list');
            } catch (error) {
                alert('상품 수정 실패');
                console.error("!!! handleSubmit 에러 발생 !!!")
                console.error("Submit error:", error.response || error.message || error);
                if (error.response) {
                    console.error("Backend Response:", error.response.data);
                }
            }
        };



    return (
        <div style={productRegisterContainerStyle}>
            <h2 style={h2Style}>상품 수정</h2>
            <div style={checkbokGroupStyle}>
                <label style={checkboxLabelStyle}>
                    <input type="checkbox" name="itemNew" checked={formData.itemNew === 1} onChange={handleChange} />
                    신상품
                </label>
                <label style={checkboxLabelStyle}>
                    <input type="checkbox" name="itemRecommend" checked={formData.itemRecommend === 1} onChange={handleChange} />
                    추천 상품
                </label>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={formContainerStyle}>

                    {/* 모든 컬럼을 하나의 rowBaseStyle 컨테이너 안에 넣음 */}
                    <div style={rowBaseStyle}>

                        {/* 컬럼 1: 카테고리 */}
                        <div style={columnStyle}>
                            <label>카테고리</label>
                            <select name="itemCategory" value={formData.itemCategory} onChange={handleChange} style={selectStyle}>
                                <option value="커피">커피</option>
                                <option value="티">티</option>
                                <option value="블렌디드">블렌디드</option>
                                <option value="프라푸치노">프라푸치노</option>
                                <option value="기타">기타</option>
                            </select>
                        </div>

                        {/* 컬럼 2: 상품명 */}
                        <div style={columnStyle}>
                            <label>상품명</label>
                            <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} required style={inputStyle}/>
                        </div>

                        {/* 컬럼 3: 가격 */}
                        <div style={columnStyle}>
                            <label>가격</label>
                            <input type="number" name="itemPrice" value={formData.itemPrice} onChange={handleChange} required style={inputStyle} placeholder="숫자만 입력" min="0"/>
                        </div>

                        {/* 컬럼 4: 상품 이미지 */}
                        <div style={columnStyle}>
                            <label>상품 이미지</label>

                            {/* 파일 입력 필드: imageFile 없을 때만 표시 */}
                            {!imageFile && (
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={fileInputStyle}
                                />
                            )}

                            {/* 이미지 미리보기 */}
                            {imageFile && (
                                <img
                                    src={URL.createObjectURL(imageFile)}
                                    alt="새 이미지 미리보기"
                                    style={imagePreviewStyle}
                                />
                            )}
                            {!imageFile && formData.itemImageUrl && (
                                <img
                                    src={formData.itemImageUrl}
                                    alt="기존 상품 이미지"
                                    style={imagePreviewStyle}
                                />
                            )}
                            {/*파일 변경/제거*/}
                            {imageFile && (
                                <button
                                    type="button" // 폼 제출 방지
                                    onClick={handleRemoveImage}
                                    style={removeButtonStyle}
                                >
                                    파일 변경/제거
                                </button>
                            )}
                        </div>

                        {/* 컬럼 5: 상품 설명 (너비 조정 위해 별도 스타일 적용 가능) */}
                        {/* <div style={descriptionColumnStyle}> */}
                        <div style={columnStyle}> {/* 일단 기본 columnStyle 적용 */}
                            <label>상품 설명</label>
                            <textarea name="itemDescription" value={formData.itemDescription} onChange={handleChange} style={textareaStyle}/>
                        </div>

                    </div> {/* End of rowBaseStyle container */}

                </div>

                <button
                    type="submit"
                    style={{ ...buttonBaseStyle, ...(isHovered ? buttonHoverStyle : {}) }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    상품 수정
                </button>

            </form>
        </div>
    );
}

export default ProductEdit;