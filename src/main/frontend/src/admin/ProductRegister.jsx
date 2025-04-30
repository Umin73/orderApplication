import React, { useState } from 'react';
import axios from 'axios';

function ProductRegister() {
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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = (type === "checkbox") ? (checked ? 1 : 0) : value;
        setFormData(prev => ({ ...prev, [name]: val }));
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
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
        } catch (error) {
            alert('상품 등록 실패');
            console.error(error);
        }
    };

    return (
        <div className="product-register-container">
            <h2>상품 등록</h2>
            <form onSubmit={handleSubmit}>
                <label>상품명</label>
                <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} required />

                <label>카테고리</label>
                <select name="itemCategory" value={formData.itemCategory} onChange={handleChange}>
                    <option value="커피">커피</option>
                    <option value="티">티</option>
                    <option value="블렌디드">블렌디드</option>
                    <option value="프라푸치노">프라푸치노</option>
                    <option value="기타">기타</option>
                </select>

                <label>가격</label>
                <input type="number" name="itemPrice" value={formData.itemPrice} onChange={handleChange} required />

                <label>
                    <input type="checkbox" name="itemRecommend" checked={formData.itemRecommend === 1} onChange={handleChange} />
                    추천 상품
                </label>

                <label>
                    <input type="checkbox" name="itemNew" checked={formData.itemNew === 1} onChange={handleChange} />
                    신상품
                </label>

                <label>이미지 업로드</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />

                <label>상품 설명</label>
                <textarea name="itemDescription" value={formData.itemDescription} onChange={handleChange} />

                <button type="submit">상품 등록</button>
            </form>
        </div>
    );
}
export default ProductRegister;
