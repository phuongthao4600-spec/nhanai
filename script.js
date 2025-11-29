// URL Apps Script để lưu dữ liệu vào Google Sheet
// (cô dán đúng link mới: bảng tính có cột phiếu Nhân Ái)
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwPwGNKdT0r0LcmBZKuL3LBBhZPbQSej82JhPDOyhyj0n7DivVuOXVEthYd9tDd7yvfQg/exec";

// ---------------------
// Chọn giọng đọc ấm áp
// ---------------------
let preferredVoice = null;

function choosePreferredVoice() {
  if (!("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // Ưu tiên: nữ tiếng Việt → tiếng Việt → nữ bất kỳ → tiếng Anh → bất kỳ
  const checks = [
    v => v.lang === "vi-VN" && /female|nu|woman|girl/i.test(v.name),
    v => v.lang === "vi-VN",
    v => /female|nu|woman|girl/i.test(v.name),
    v => v.lang && v.lang.startsWith("en")
  ];

  for (const check of checks) {
    const found = voices.find(check);
    if (found) return found;
  }
  return voices[0];
}

if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    preferredVoice = choosePreferredVoice();
  };
}

// Nói bằng giọng cô giáo ấm áp
function speak(text) {
  if (!("speechSynthesis" in window)) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "vi-VN";
  utter.voice = preferredVoice || choosePreferredVoice();
  utter.pitch = 1.1;
  utter.rate = 1;
  utter.volume = 1;

  const tho = document.getElementById("thoAvatar");
  if (tho) {
    utter.onstart = () => tho.classList.add("talking");
    utter.onend = () => tho.classList.remove("talking");
  }

  window.speechSynthesis.speak(utter);
}

// ---------------------
// Sinh lời khen / động viên
// ---------------------
function makeReply({ name, lop, camon1, camon2, camon3, viectot, yeuthuong }) {
  const fields = [camon1, camon2, camon3, viectot, yeuthuong];
  const filledCount = fields.filter(v => v.trim() !== "").length;
  const fullCompleted = fields.every(v => v.trim() !== "");

  const safeName = name || "con";
  const safeLop = lop || "";

  if (fullCompleted) {
    const reply = `
Thỏ cảm ơn ${safeName} lớp ${safeLop} vì đã hoàn thành đủ phiếu Nhân Ái tuần này! 🐰💛 
Con đã có ba lời cảm ơn rất dễ thương, một việc tốt ý nghĩa và một lời yêu thương ấm áp. 
Thỏ cảm nhận được trái tim nhân ái và biết ơn của con đó.

Tuần này Thỏ tặng con một “Giấy khen Nhân Ái” ⭐ được ghi lại trong bảng tổng hợp của cô giáo.
Con tiếp tục lan tỏa lòng nhân ái đến mọi người xung quanh nhé! 🌷
    `.trim();
    return { reply, hasAward: true };
  }

  // Chưa đủ 3–1–1
  const reply = `
Thỏ cảm ơn ${safeName} lớp ${safeLop} vì đã bắt đầu viết phiếu Nhân Ái. 🌸 
Hôm nay con mới hoàn thành được ${filledCount}/5 phần của phiếu 
(3 lời cảm ơn, 1 việc tốt, 1 lời yêu thương).

Tuần sau con thử viết đủ 3 lời cảm ơn – 1 việc tốt – 1 lời yêu thương nhé.
Thỏ tin là ${safeName} sẽ làm được và sớm nhận “Giấy khen Nhân Ái” thật đẹp. 
Cố lên, Thỏ luôn ở đây để cổ vũ con đó! 💕
  `.trim();

  return { reply, hasAward: false };
}

// ---------------------
// Gửi dữ liệu & hiển thị
// ---------------------
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("nhanAiForm");
  const botText = document.getElementById("botText");
  const statusText = document.getElementById("status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lop = document.getElementById("lop").value.trim();
    const camon1 = document.getElementById("camon1").value.trim();
    const camon2 = document.getElementById("camon2").value.trim();
    const camon3 = document.getElementById("camon3").value.trim();
    const viectot = document.getElementById("viectot").value.trim();
    const yeuthuong = document.getElementById("yeuthuong").value.trim();

    if (!name || !lop) {
      statusText.textContent = "Con cần điền tên và chọn lớp trước khi gửi cho Thỏ nhé.";
      return;
    }

    const { reply, hasAward } = makeReply({
      name,
      lop,
      camon1,
      camon2,
      camon3,
      viectot,
      yeuthuong
    });

    // Cập nhật bong bóng và nói
    botText.textContent = reply;
    speak(reply);

    // Gửi dữ liệu lên Apps Script (Google Sheet)
    statusText.textContent = "Thỏ đang ghi lại phiếu Nhân Ái của con vào sổ...";

    const payload = {
      name,
      lop,
      camon1,
      camon2,
      camon3,
      viectot,
      yeuthuong,
      hasAward // Apps Script có thể dùng cột này để đánh dấu "x" Giấy khen
    };

    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error(res.statusText);
      statusText.textContent =
        "Thỏ đã ghi lại phiếu Nhân Ái của con vào sổ rồi. Cảm ơn con thật nhiều! 🐰🌷";
      form.reset();
    } catch (err) {
      console.error(err);
      statusText.textContent =
        "Thỏ hơi bị lỗi mạng nên chưa ghi được vào sổ. Con có thể tải lại trang và gửi lại giúp Thỏ nhé.";
    }
  });
});
