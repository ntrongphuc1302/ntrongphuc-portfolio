document.addEventListener("DOMContentLoaded", () => {
  const animatedTexts = document.querySelectorAll(".animated-text");
  const root = document.documentElement;
  const ctaButton = document.querySelector(".cta-button");

  // 7 mã màu HEX khác nhau
  const colors = [
    "#FF0055", // Hồng (Màu gốc)
    "#00FFFF", // Cyan
    "#FFFF00", // Vàng
    "#00FF00", // Xanh lá cây
    "#FF4500", // Cam
    "#8A2BE2", // Xanh tím (BlueViolet)
    "#FFD700", // Vàng Kim (Gold)
  ];

  let usedColors = new Set();
  let colorIndex = 0;
  let wordIndex = 0;
  const totalWords = animatedTexts.length;

  /**
   * Lấy một màu ngẫu nhiên từ mảng colors, đảm bảo không trùng với màu đã sử dụng gần nhất.
   * Logic này sẽ giúp xoay vòng qua 7 màu và đảm bảo mỗi từ mới có màu khác.
   */
  function getNextColor() {
    let newColor;
    // Lấy màu tiếp theo theo thứ tự, giúp đảm bảo không trùng lặp sau mỗi 7 lần
    newColor = colors[colorIndex % colors.length];
    colorIndex++;
    return newColor;
  }

  /**
   * Chuyển đổi từ đang được hiển thị và thay đổi màu.
   */
  function cycleText() {
    // 1. Ẩn từ hiện tại
    animatedTexts.forEach((span) => span.classList.remove("active"));

    // 2. Chọn từ tiếp theo
    const currentWord = animatedTexts[wordIndex % totalWords];

    // 3. Lấy màu mới và áp dụng
    const newColor = getNextColor();
    root.style.setProperty("--clr", newColor);

    // 4. Đặt lại animation-delay để kích hoạt hiệu ứng đánh máy lại
    const beforeElement = currentWord.querySelector("::before");
    if (beforeElement) {
      // Tắt và bật lại animation để reset
      beforeElement.style.animation = "none";
      // forced reflow (để trình duyệt reset animation)
      void beforeElement.offsetWidth;
      beforeElement.style.animation = "animate2 4s linear infinite";
    }

    // 5. Hiển thị từ mới
    currentWord.classList.add("active");

    // 6. Tăng chỉ số cho lần tiếp theo
    wordIndex++;
  }

  // Khởi tạo: Đặt màu và hiển thị từ đầu tiên
  cycleText();

  // Thiết lập interval để chuyển đổi từ và màu cứ sau 4 giây (thời gian animation đánh máy)
  // Animation 'animate2' chạy trong 4s.
  // Chúng ta chuyển đổi từ sau 4s để nó chạy hết 1 chu kỳ.
  setInterval(cycleText, 4000);
});
