<?php
// ตรวจสอบว่าฟอร์มถูกส่งมาด้วยวิธี POST หรือไม่
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // สร้างฟังก์ชันสำหรับกรองข้อมูลที่ส่งมา
    function test_input($data) {
        $data = trim($data); // ตัดช่องว่างข้างหน้าและข้างหลัง
        $data = stripslashes($data); // ลบ backslashes
        $data = htmlspecialchars($data); // แปลงอักขระพิเศษเป็น entities
        return $data;
    }

    // รับค่าที่ส่งมาจากฟอร์ม
    $name = test_input($_POST["name"]);
    $email = test_input($_POST["email"]);
    $subject = test_input($_POST["subject"]);
    $message = test_input($_POST["message"]);

    // ตรวจสอบว่าข้อมูลครบถ้วน
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo "All fields are required!";
        exit;
    }

    // ตรวจสอบรูปแบบอีเมล
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format!";
        exit;
    }

    // กำหนดรายละเอียดอีเมล
    $to = "Teeteepong11@gmail.com"; // เปลี่ยนเป็นอีเมลของคุณ
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $email_body = "You have received a new message from the contact form on your website.\n\n";
    $email_body .= "Name: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Subject: $subject\n\n";
    $email_body .= "Message:\n$message\n";

    // ส่งอีเมล
    if (mail($to, $subject, $email_body, $headers)) {
        echo "Your message has been sent successfully!";
    } else {
        echo "Sorry, there was an error sending your message.";
    }
} else {
    // หากไม่ใช่วิธี POST ให้แสดงข้อความนี้
    echo "Invalid request method!";
}
?>
