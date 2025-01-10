document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector(".hero");
    if (!hero) return; // ถ้าไม่มี .hero ให้หยุดทำงาน

    const backgroundImages = [
        "./assets/welcome.png",
        "./assets/welcome2.jpg",
        "./assets/welcome3.jpg",
        "./assets/welcome4.jpg",
    ];

    let currentImageIndex = 0;

    function changeBackgroundImage() {
        hero.style.backgroundImage = `url(${backgroundImages[currentImageIndex]})`;
        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    }

    setInterval(changeBackgroundImage, 8000);
    changeBackgroundImage();
});

// ฟังก์ชันตรวจจับ Mouse Hover บริเวณด้านบนสุดของหน้าเว็บ
document.addEventListener("mousemove", (e) => {
    if (e.clientY <= 170) {
      // ถ้าตำแหน่ง Y ของเมาส์อยู่ใน 50px แรกจากบนสุด
      header.style.opacity = "1";
      header.style.visibility = "visible";
      header.style.transform = "translateY(0)";
    } else if (window.pageYOffset > 0 && e.clientY > 50) {
      // ซ่อน Navbar เมื่อไม่ได้ Hover บนสุดและไม่อยู่บนสุดของเว็บ
      header.style.opacity = "0";
      header.style.visibility = "hidden";
      header.style.transform = "translateY(-100%)";
    }
  });

const header = document.querySelector("header");
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop === 0) {
    // ถ้าผู้ใช้ยังอยู่บนสุดของเว็บ แสดง Navbar แบบค่อยๆ ปรากฏ
    header.style.opacity = "1";
    header.style.visibility = "visible";
    header.style.transform = "translateY(0)";
  } else if (scrollTop > lastScrollTop) {
    // ถ้าเลื่อนลง ซ่อน Navbar แบบค่อยๆ หายไป
    header.style.opacity = "0";
    header.style.visibility = "hidden";
    header.style.transform = "translateY(-100%)";
  } else {
    // ถ้าเลื่อนขึ้น แสดง Navbar แบบค่อยๆ ปรากฏ
    header.style.opacity = "1";
    header.style.visibility = "visible";
    header.style.transform = "translateY(0)";
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // ป้องกัน scrollTop ติดลบ
});

header.addEventListener("mouseenter", () => {
  // แสดง Navbar เมื่อโฮเวอร์ แบบค่อยๆ ปรากฏ
  header.style.opacity = "1";
  header.style.visibility = "visible";
  header.style.transform = "translateY(0)";
});

header.addEventListener("mouseleave", () => {
  if (window.pageYOffset > 0) {
    // ซ่อน Navbar เมื่อเมาส์ออก และไม่อยู่ที่ด้านบนของเว็บ แบบค่อยๆ หายไป
    header.style.opacity = "0";
    header.style.visibility = "hidden";
    header.style.transform = "translateY(-100%)";
  }
});
