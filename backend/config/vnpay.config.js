const config = {
    vnp_TmnCode: "YOUR_TMN_CODE", // Mã website tại VNPAY 
    vnp_HashSecret: "YOUR_HASH_SECRET", // Chuỗi bí mật
    vnp_Url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html", // URL thanh toán VNPay
    vnp_ReturnUrl: "http://localhost:5000/api/payment/vnpay_return", // URL sau khi thanh toán xong
};

module.exports = config; 