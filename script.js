// URL Google Apps Script lưu vào Google Sheet
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwPwGNKdT0r0LcmBZKuL3LBBhZPbQSej82JhPDOyhyj0n7DivVuOXVEthYd9tDd7yvfQg/exec";

document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("nameInput");
  const classSelect = document.getElementById("classSelect");
  const camon1 = document.getElementById("camon1");
  const camon2 = document.getElementById("camon2");
  const camon3 = document.getElementById("camon3");
  const viectot = document.getElementById("viectot");
  const yeuthuong = document.getElementById("yeuthuong");

  const sendBtn = document.getElementById("sendBtn");
  const chatBox = document.getElementById("chatBox");
  const certificate = document.getElementById("certificate");
  const certName = document.getElementById("certName");

  if (!sendBtn) {
    console.error("Không tìm thấy nút sendBtn trong HTML.");
    return;
  }

  // Ẩn giấy khen lúc đầu
  if (certificate) {
    certificate.classList.add("hidden");
  }

  sendBtn.addEventListener("click", function () {
    const name = nameInput.value.trim();
    const lop = classSelect.value.trim();
    const c1 = camon1.value.trim();
    const c2 = camon2.value.trim();
    const c3 = camon3.value.trim();
    const vt = viectot.value.trim();
    const yt = yeuthuong.value.trim();

    // --- Kiểm tra dữ liệu cơ bản ---
    if (!name) {
      alert("Con hãy ghi tên của mình nhé.");
      nameInput.focus();
      return;
    }

    if (!lop) {
      alert("Con hãy chọn lớp của mình nhé.");
      classSelect.focus();
      return;
    }

    // Kiểm tra 3-1-1 đã đủ chưa
    const missing = [];
    if (!c1) missing.push("Lời cảm ơn 1");
    if (!c2) missing.push("Lời cảm ơn 2");
    if (!c3) missing.push("Lời cảm ơn 3");
    if (!vt) missing.push("Một việc tốt");
    if (!yt) missing.push("Một lời yêu thương");

    const isFull311 = missing.length === 0;

    // --- Thỏ Nhân Ái trả lời trên màn hình ---
    if (chatBox) {
      chatBox.innerHTML = ""; // xóa nội dung cũ

      const hello = document.createElement("p");
      hello.textContent = `Thỏ Nhân Ái chào bạn ${name} (lớp ${lop}) 🐰`;
      chatBox.appendChild(hello);

      if (isFull311) {
        const msg = document.createElement("p");
        msg.textContent =
          "Con đã hoàn thành đủ 3 lời cảm ơn – 1 việc tốt – 1 lời yêu thương rồi! Thỏ và cô giáo rất tự hào về con. Tiếp tục lan tỏa yêu thương nha! 🌸";
        chatBox.appendChild(msg);
      } else {
        const msg = document.createElement("p");
        msg.textContent =
          "Con đã viết rất tốt rồi, nhưng phiếu 3–1–1 của con vẫn còn thiếu một chút:";
        chatBox.appendChild(msg);

        const list = document.createElement("ul");
        missing.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          list.appendChild(li);
        });
        chatBox.appendChild(list);

        const msg2 = document.createElement("p");
        msg2.textContent =
          "Con hãy bổ sung cho đủ rồi bấm “Gửi cho Thỏ” lại một lần nữa nhé. Thỏ luôn đợi con. 💗";
        chatBox.appendChild(msg2);
      }
    }

    // --- Hiện / ẩn Giấy khen ---
    if (certificate && certName) {
      if (isFull311) {
        certName.textContent = name;
        certificate.classList.remove("hidden");
      } else {
        certificate.classList.add("hidden");
      }
    }

    // --- Gửi dữ liệu lên Google Sheet qua Apps Script ---
    // Nếu cô muốn chỉ lưu khi con làm đủ 3–1–1 thì thêm điều kiện:
    // if (!isFull311) return;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("lop", lop);
    formData.append("camon1", c1);
    formData.append("camon2", c2);
    formData.append("camon3", c3);
    formData.append("viectot", vt);
    formData.append("yeuthuong", yt);
    // Đánh dấu x nếu có giấy khen
    formData.append("hasCertificate", isFull311 ? "x" : "");

    sendBtn.disabled = true;
    const oldText = sendBtn.textContent;
    sendBtn.textContent = "Thỏ đang nhận phiếu...";

    fetch(SCRIPT_URL, {
      method: "POST",
      body: formData,
      mode: "no-cors" // tránh lỗi CORS, chấp nhận không đọc được phản hồi
    })
      .then(() => {
        // Ở chế độ no-cors, mình không đọc được JSON trả về
        // nên chỉ báo cho học sinh là đã gửi xong
        alert("Thỏ đã nhận được phiếu 3–1–1 của con rồi! 🧡");
      })
      .catch((err) => {
        console.error("Lỗi khi gửi dữ liệu:", err);
        alert("Có lỗi khi gửi phiếu. Con báo cô giáo để kiểm tra giúp nhé.");
      })
      .finally(() => {
        sendBtn.disabled = false;
        sendBtn.textContent = oldText;
      });
  });
});
