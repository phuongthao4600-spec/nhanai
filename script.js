// ====== THỎ NHÂN ÁI - SCRIPT.JS (FULL VERSION) ======

// 🔗 LINK APPS SCRIPT CỦA CÔ (ĐÃ GẮN SẴN)
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwzecJDD4uNv1E3czQDWQYUZ8J4Gik7Vo_8RKe1dfRpLgYu3kbXAD0q5O6H6Vm2DRZ0Jg/exec";

document.addEventListener("DOMContentLoaded", function () {
  // Lấy các field từ HTML
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

  // Ẩn giấy khen lúc đầu
  if (certificate) {
    certificate.classList.add("hidden");
  }

  // Khi bấm Gửi cho Thỏ
  sendBtn.addEventListener("click", function () {
    const name = nameInput.value.trim();
    const lop = classSelect.value.trim();
    const c1 = camon1.value.trim();
    const c2 = camon2.value.trim();
    const c3 = camon3.value.trim();
    const vt = viectot.value.trim();
    const yt = yeuthuong.value.trim();

    // Kiểm tra tên
    if (!name) {
      alert("Con hãy ghi tên của mình nhé.");
      return;
    }

    // Kiểm tra lớp
    if (!lop) {
      alert("Con hãy chọn lớp của mình nhé.");
      return;
    }

    // Kiểm tra có đủ 3–1–1 chưa
    let missing = [];
    if (!c1) missing.push("Lời cảm ơn 1");
    if (!c2) missing.push("Lời cảm ơn 2");
    if (!c3) missing.push("Lời cảm ơn 3");
    if (!vt) missing.push("Một việc tốt");
    if (!yt) missing.push("Một lời yêu thương");

    let isFull311 = missing.length === 0;

    // ========== Thỏ trả lời ở khung bên phải ==========
    chatBox.innerHTML = "";

    let hello = document.createElement("p");
    hello.textContent = `Thỏ Nhân Ái chào bạn ${name} (lớp ${lop}) 🐰`;
    chatBox.appendChild(hello);

    if (isFull311) {
      let msg = document.createElement("p");
      msg.textContent =
        "Con đã hoàn thành đủ 3 lời cảm ơn – 1 việc tốt – 1 lời yêu thương rồi! Thỏ và cô giáo rất tự hào về con. 🌸";
      chatBox.appendChild(msg);
    } else {
      let msg = document.createElement("p");
      msg.textContent =
        "Con đã viết rất tốt rồi, nhưng phiếu 3–1–1 của con còn thiếu:";
      chatBox.appendChild(msg);

      let ul = document.createElement("ul");
      missing.forEach((m) => {
        let li = document.createElement("li");
        li.textContent = m;
        ul.appendChild(li);
      });
      chatBox.appendChild(ul);

      let note = document.createElement("p");
      note.textContent =
        "Con hãy bổ sung cho đủ rồi bấm “Gửi cho Thỏ” lại một lần nữa nhé. 💗";
      chatBox.appendChild(note);
    }

    // ========== Hiện/ẩn giấy khen ==========
    if (isFull311) {
      certName.textContent = name;
      certificate.classList.remove("hidden");
    } else {
      certificate.classList.add("hidden");
    }

    // ========== Chuẩn bị dữ liệu gửi lên Google Sheet ==========
    let formData = new FormData();
    formData.append("name", name);
    formData.append("lop", lop);
    formData.append("camon1", c1);
    formData.append("camon2", c2);
    formData.append("camon3", c3);
    formData.append("viectot", vt);
    formData.append("yeuthuong", yt);
    formData.append("hasCertificate", isFull311 ? "x" : "");

    // Disable nút tạm thời
    sendBtn.disabled = true;
    let oldText = sendBtn.textContent;
    sendBtn.textContent = "Thỏ đang nhận phiếu...";

    // ========== Gửi lên Apps Script ==========
    fetch(SCRIPT_URL, {
      method: "POST",
      body: formData,
      mode: "no-cors"
    })
      .then(() => {
        alert("Thỏ đã nhận được phiếu 3–1–1 của con rồi! 🧡");
      })
      .catch((err) => {
        console.error("Lỗi:", err);
        alert(
          "Có lỗi khi gửi phiếu. Con báo cô giáo để cô kiểm tra giúp nhé."
        );
      })
      .finally(() => {
        sendBtn.disabled = false;
        sendBtn.textContent = oldText;
      });
  });
});
