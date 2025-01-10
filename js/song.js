// ------------------
// ฟังก์ชันสำหรับค้นหาเพลง (หน้า song.html)
// ------------------

document.getElementById('searchInput').addEventListener('input', function () {
    const filter = this.value.toLowerCase(); // แปลงค่าที่พิมพ์ให้เป็นตัวพิมพ์เล็ก
    const songList = document.querySelectorAll('#songsList li'); // เลือกเพลงทั้งหมดในลิสต์

    let found = false; // ตัวแปรสำหรับเช็คว่าพบเพลงหรือไม่

    songList.forEach(song => {
        const songTitle = song.querySelector('h2').textContent.toLowerCase(); // แปลงชื่อเพลงให้เป็นตัวพิมพ์เล็ก
        if (songTitle.includes(filter)) {
            song.style.display = ''; // แสดงเพลงที่ตรงกับการค้นหา
            song.style.backgroundColor = '#eeeeee'; // เพิ่มพื้นหลังให้เพลงที่ตรงกับการค้นหา
            song.style.transition = 'background-color 0.3s'; // เพิ่มเอฟเฟกต์ transition
            found = true;
        } else {
            song.style.display = 'none'; // ซ่อนเพลงที่ไม่ตรง
        }
    });

    if (!found) {
        console.log('No songs found matching your search.');
    }
});

// ------------------
// ซ่อน download pdf
// ------------------

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.view-chord'); // เลือกลิงก์ทั้งหมดที่มี class "view-chord"

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // ป้องกันพฤติกรรมปกติของลิงก์
            const pdfUrl = link.getAttribute('href'); // ดึง URL ของ PDF จาก href
            const viewerUrl = `https://docs.google.com/gview?url=${window.location.origin}/${pdfUrl}&embedded=true`; // URL ของ Google Docs Viewer
            window.open(viewerUrl, '_blank', 'width=800,height=600'); // เปิดหน้าต่างใหม่พร้อม PDF Viewer
        });
    });
});

// ------------------
// test
// ------------------

// Include PDF.js library
const pdfjsLib = window['pdfjs-dist/build/pdf'];

// Function to load and display PDF
function loadPDF(pdfUrl) {
    const pdfViewer = document.getElementById("pdfViewer");
    pdfViewer.innerHTML = ""; // Clear previous content

    pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            pdf.getPage(pageNum).then(page => {
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");

                canvas.width = viewport.width;
                canvas.height = viewport.height;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };

                page.render(renderContext);
                pdfViewer.appendChild(canvas);
            });
        }
    });
}

// เพิ่ม pinch-to-zoom และ scroll gestures ให้เลื่อนหรือขยาย/ย่อ PDF
const pdfViewer = document.querySelector('.pdf-viewer');

let scale = 1; // ระดับการซูมเริ่มต้น
pdfViewer.addEventListener('wheel', (e) => {
    if (e.ctrlKey) { // ใช้ ctrl + scroll เพื่อซูม
        e.preventDefault();
        scale += e.deltaY * -0.01;
        scale = Math.min(Math.max(0.5, scale), 3); // จำกัดระดับการซูม
        pdfViewer.style.transform = `scale(${scale})`;
    }
});

pdfViewer.addEventListener('touchmove', (e) => {
    // ปรับ gesture สำหรับ scroll บนมือถือ
    pdfViewer.style.overflow = 'auto';
});


// Example usage:
// Call loadPDF with the URL of the PDF when a button is clicked
// Example: loadPDF('path/to/your/pdf.pdf');
