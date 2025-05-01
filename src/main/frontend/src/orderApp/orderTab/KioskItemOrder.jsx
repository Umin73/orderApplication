import React, {useEffect, useState} from 'react';
import axios from 'axios';

import "./KioskItemOrder.css";
import Modal from "../../common/Modal";

export default function KioskItemOrder(item) {

    const itemName = item.item.itemName;
    const itemDescription = item.item.itemDescription;
    const itemImageUrl = item.item.itemImageUrl;
    const itemPrice = item.item.itemPrice;

    const [itemCnt, setItemCnt] = useState(1);
    const [totalPrice, setTotalPrice] = useState(itemPrice);

    useEffect(() => {
        setTotalPrice(itemCnt * itemPrice);
    }, [itemCnt, itemPrice]);

    return (
        <>
            <div className="order-item-info-wrapper">
                <div className="order-item-info-img">
                    <img src={itemImageUrl} alt={itemName}/>
                </div>
                <div className="order-item-info-title">{itemName}</div>
                <div className="order-item-info-description">{itemDescription}</div>
            </div>

            <div className="order-item-quantity-wrapper">
                <div className="order-item-quantity-selector">
                    <div className="order-item-quantity-button" onClick={() => {
                        if (itemCnt > 1) {
                            setItemCnt(itemCnt - 1);
                        }
                    }}>-</div>
                    <div className="order-item-quantity-number">{itemCnt}</div>
                    <div className="order-item-quantity-button" onClick={() => {
                        if (itemCnt <= 100) {
                            setItemCnt(itemCnt + 1);
                        }
                    }}>+</div>
                </div>
                <div className="order-item-quantity-price">{itemPrice}</div>
            </div>

            <div className="order-item-total-price-wrapper">
                <div className="order-item-total-title">총 상품금액</div>
                <div className="order-item-total-price">{totalPrice}</div>
            </div>

            <div className="order-item-buttons-wrapper">
                <div className="order-item-button" style={{backgroundColor: "#DBDBDB"}}>
                    바로 주문
                </div>
                <div className="order-item-button" style={{backgroundColor: "#4AA366", color:"white"}}>
                    장바구니 담기
                </div>
            </div>
        </>

    );
}
