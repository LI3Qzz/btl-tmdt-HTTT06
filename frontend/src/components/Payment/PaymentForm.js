import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ orderId, amount }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePayment = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/payment/create_payment_url', {
                orderId,
                amount,
                orderInfo: `Thanh toan don hang ${orderId}`
            });

            // Chuyển hướng đến trang thanh toán VNPay
            window.location.href = response.data.paymentUrl;
        } catch (error) {
            console.error('Payment error:', error);
            alert('Có lỗi xảy ra khi tạo thanh toán');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-form">
            <h2>Thanh toán đơn hàng</h2>
            <div className="payment-details">
                <p>Mã đơn hàng: {orderId}</p>
                <p>Tổng tiền: {amount.toLocaleString('vi-VN')} VNĐ</p>
            </div>
            <button 
                onClick={handlePayment}
                disabled={loading}
                className="payment-button"
            >
                {loading ? 'Đang xử lý...' : 'Thanh toán qua VNPay'}
            </button>
        </div>
    );
};

export default PaymentForm; 