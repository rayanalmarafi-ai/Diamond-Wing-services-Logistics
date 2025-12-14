<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// إعدادات الإيميل
$to_email = "dwsljordan@gmail.com";
$site_name = "Diamond Wing Website";

// الحصول على البيانات
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $data) {
    try {
        // البيانات
        $name = isset($data['name']) ? filter_var($data['name'], FILTER_SANITIZE_STRING) : 'زائر بدون اسم';
        $rating = isset($data['rating']) ? intval($data['rating']) : 0;
        $message = isset($data['text']) ? filter_var($data['text'], FILTER_SANITIZE_STRING) : '';
        $email = isset($data['email']) ? filter_var($data['email'], FILTER_SANITIZE_EMAIL) : '';
        $date = isset($data['date']) ? $data['date'] : date('Y-m-d');
        $ip = isset($data['ip']) ? $data['ip'] : $_SERVER['REMOTE_ADDR'];
        
        // موضوع الإيميل
        $subject = "تقييم جديد - $site_name - $date";
        
        // نجوم التقييم
        $stars = str_repeat('★', $rating) . str_repeat('☆', 5 - $rating);
        
        // محتوى الإيميل
        $email_content = "
        <html dir='rtl'>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #D4AF37, #B8860B); color: #000; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
                .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
                .rating { color: #D4AF37; font-size: 24px; margin: 10px 0; }
                .info { background: #fff; padding: 15px; margin: 10px 0; border-radius: 5px; border-right: 4px solid #D4AF37; }
                .footer { background: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd; }
            </