import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import "./OrderList.css"; // CSS 파일 import

function OrderList() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = () => {
        axiosInstance.get("/order/list")
            .then(response => {
                const filtered = response.data
                    .filter(order => order.status !== "완료")
                    .sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));
                setOrders(filtered);
            })
            .catch(error => {
                console.error("주문 리스트 가져오기 실패:", error);
            });
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleComplete = async (orderId) => {
        const confirmDone = window.confirm("이 주문을 완료 처리하시겠습니까?");
        if (!confirmDone) return;

        try {
            await axiosInstance.post(`/order/complete/${orderId}`);
            setOrders(prev => prev.filter(order => order.id !== orderId));
            alert("주문이 완료되었습니다.");
        } catch (error) {
            console.error("주문 완료 처리 실패:", error);
            alert("처리 중 오류가 발생했습니다.");
        }
    };

    return (
        <div>
            <h2 className="order-heading">주문 목록</h2>
            <p className="order-subtext">총 {orders.length}건의 주문이 있습니다.</p>

            <table className="order-table">
                <thead>
                <tr>
                    <th>주문 번호</th>
                    <th>주문자명</th>
                    <th>주문 시간</th>
                    <th>포장 옵션</th>
                    <th>결제 수단</th>
                    <th>요청 사항</th>
                    <th>주문 내역</th>
                    <th>총 금액</th>
                    <th>주문 완료</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index) => (
                    <tr key={index}>
                        <td>{order.id}</td>
                        <td>{order.customerName}</td>
                        <td>{new Date(order.orderTime).toLocaleString()}</td>
                        <td>{order.packagingOption}</td>
                        <td>{order.paymentMethod}</td>
                        <td>{order.requestNode}</td>
                        <td>
                            {order.orderItems?.map((item, idx) => (
                                <div key={idx}>
                                    {item.name} x {item.quantity}
                                </div>
                            ))}
                        </td>
                        <td>{order.totalPrice?.toLocaleString()}원</td>
                        <td>
                            <button
                                className="complete-button"
                                onClick={() => handleComplete(order.id)}
                            >
                                완료
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderList;
