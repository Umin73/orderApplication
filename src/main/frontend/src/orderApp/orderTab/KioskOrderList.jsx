import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./KioskOrderList.css";

export default function KioskOrderList() {

    const navigate = useNavigate();

    const categoryList = ["커피", "티", "블렌디드", "프라푸치노", "기타"];
    const [selectedCategory, setSelectedCategory] = useState("커피");
    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        fetchItemsByCategory(selectedCategory);
    }, [selectedCategory]);

    const fetchItemsByCategory = async (category) => {
        try {
            const response = await axios.get("/item/list", { params: { selectedCategory } });
            setItemList(response.data);
        } catch (error) {
            console.error("아이템을 불러오는 중 에러:", error);
        }
    };

    return (
        <>
            <div className="order-container">
                <div className="category-buttons">
                    {categoryList.map((cat, index) => (
                        <button
                            key={index}
                            className={`category-button ${selectedCategory === cat ? 'selected' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="item-grid">
                    {itemList.map((item, idx) => (
                        <div className="item-card" key={idx}
                             onClick={() => navigate("/kiosk/order-item", { state: { item } })}>
                            <img src={item.itemImageUrl} alt={item.itemName} className="item-image"/>
                            <div className="item-name">{item.itemName}</div>
                            <div className="item-price">{item.itemPrice.toLocaleString()}원</div>
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
}
