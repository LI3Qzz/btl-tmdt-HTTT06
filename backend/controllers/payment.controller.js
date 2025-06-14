const crypto = require('crypto');
const moment = require('moment');
const config = require('../config/vnpay.config');

// Tạo URL thanh toán VNPay
exports.createPaymentUrl = async (req, res) => {
    try {
        const { amount, orderInfo, orderId } = req.body;
        
        const date = new Date();
        const createDate = moment(date).format('YYYYMMDDHHmmss');

        const orderType = 'other';
        const locale = 'vn';
        const currCode = 'VND';
        const vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = config.vnp_TmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = orderInfo;
        vnp_Params['vnp_OrderType'] = orderType;
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = config.vnp_ReturnUrl;
        vnp_Params['vnp_IpAddr'] = req.ip;
        vnp_Params['vnp_CreateDate'] = createDate;

        // Sắp xếp các tham số theo thứ tự a-z
        const sortedParams = sortObject(vnp_Params);
        
        // Tạo chuỗi ký tự cần ký
        const signData = querystring.stringify(sortedParams, { encode: false });
        
        // Tạo chữ ký
        const hmac = crypto.createHmac("sha512", config.vnp_HashSecret);
        const signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
        vnp_Params['vnp_SecureHash'] = signed;
        
        // Tạo URL thanh toán
        const vnpUrl = config.vnp_Url + '?' + querystring.stringify(vnp_Params, { encode: false });
        
        res.json({ paymentUrl: vnpUrl });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xử lý kết quả trả về từ VNPay
exports.vnpayReturn = async (req, res) => {
    try {
        const vnp_Params = req.query;
        const secureHash = vnp_Params['vnp_SecureHash'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        // Sắp xếp các tham số theo thứ tự a-z
        const sortedParams = sortObject(vnp_Params);
        
        // Tạo chuỗi ký tự cần ký
        const signData = querystring.stringify(sortedParams, { encode: false });
        
        // Tạo chữ ký
        const hmac = crypto.createHmac("sha512", config.vnp_HashSecret);
        const signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 

        if(secureHash === signed) {
            const orderId = vnp_Params['vnp_TxnRef'];
            const rspCode = vnp_Params['vnp_ResponseCode'];
            
            // Kiểm tra kết quả giao dịch
            if(rspCode === "00") {
                // Thanh toán thành công
                // Cập nhật trạng thái đơn hàng trong database
                res.redirect(`${process.env.CLIENT_URL}/payment/success?orderId=${orderId}`);
            } else {
                // Thanh toán thất bại
                res.redirect(`${process.env.CLIENT_URL}/payment/failed?orderId=${orderId}`);
            }
        } else {
            res.redirect(`${process.env.CLIENT_URL}/payment/failed`);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Hàm sắp xếp object theo key
function sortObject(obj) {
    const sorted = {};
    const keys = Object.keys(obj).sort();
    for (const key of keys) {
        sorted[key] = obj[key];
    }
    return sorted;
} 