// 🔗 LINK WEB APP GOOGLE APPS SCRIPT CỦA CÔ
const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbzMrST2vm04cQpr5uiPe17-RCoHdSRCIKQcMoEtHThg5leYzmvgSOhv7l3d9qGQpqAmxg/exec";

const nameInput = document.getElementById("studentName");
const classSelect = document.getElementById("studentClass");
const thank1Input = document.getElementById("thank1");
const thank2Input = document.getElementById("thank2");
const thank3Input = document.getElementById("thank3");
const goodDeedInput = document.getElementById("goodDeed");
const loveMsgInput = document.getElementById("loveMsg");
const sendBtn = document.getElementById("sendBtn");

const bunnyBubble = document.getElementById("bunnyBubble");
const bunnyText = document.getElementById("bunnyText");
const bunnyImg = document.getElementById("bunnyImg");
const statusMsg = document.getElementById("statusMsg");

// ========== GIỌNG NÓI (Speech Synthesis) ==========

let vnVoice = null;

function findVietnameseVoice() {
  const voices = window.speechSynthesis.getVoices();
  vnVoice =
    voices.find((v) => v.lang.startsWith("vi")) ||
    voices.find((v) => v.lang.startsWith("en")) ||
    null;
}

if ("speechSynthesis" in window) {
  findVietnameseVoice();
  window.speechSynthesis.onvoiceschanged = findVietnameseVoice;
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  if (vnVoice) utter.voice = vnVoice;
  utter.lang = vnVoice?.lang || "vi-VN";
  utter.rate = 1;
  utter.pitch = 1;

  // Thỏ nhún nhảy khi nói
  bunnyImg.parentElement.classList.add("bunny-speaking");
  utter.onend = () => {
    bunnyImg.parentElement.classList.remove("bunny-speaking");
  };

  window.speechSynthesis.speak(utter);
}

// ========== TẠO PHẢN HỒI CỦA THỎ ==========

function countFilled(arr) {
  return arr.filter((s) => s && s.trim().length > 0).length;
}

function makeReply(name, thanksArr, goodDeed, loveMsg) {
  const hasName = name && name.trim().length > 0;
  const nThanks = countFilled(thanksArr);
  const hasGoodDeed = !!(goodDeed && goodDeed.trim());
  const hasLove = !!(loveMsg && loveMsg.trim());

  const displayName = hasName ? name.trim() : "con";

  // Đủ 3–1–1
  if (nThanks >= 3 && hasGoodDeed && hasLove) {
    return (
      `Chào ${displayName}! 🐰 Thỏ đã đọc hết phiếu 3–1–1 của con rồi.\n` +
      `Thỏ cảm nhận được rất nhiều tình yêu thương và lòng biết ơn trong từng câu chữ. 🌼\n` +
      `Hôm nay con vừa biết nói lời cảm ơn, vừa biết làm việc tốt, lại còn gửi lời yêu thương nữa.\n` +
      `Thỏ tặng con một “Giấy khen Nhân Ái” vì trái tim ấm áp của con nhé. Tiếp tục tỏa sáng như vậy nha! ✨`
    );
  }

  // Có nội dung nhưng chưa đủ
  if (nThanks > 0 || hasGoodDeed || hasLove) {
    return (
      `Thỏ cảm ơn ${displayName} vì đã bắt đầu viết phiếu Nhân Ái rồi nha. 🌷\n` +
      `Thỏ thấy con đã có ${nThanks} lời cảm ơn, ` +
      `${hasGoodDeed ? "một việc tốt" : "chưa viết việc tốt nào"} ` +
      `và ${hasLove ? "một lời yêu thương" : "chưa có lời yêu thương rõ ràng"}.\n` +
      `Tuần sau con thử hoàn thành đủ 3 lời cảm ơn – 1 việc tốt – 1 lời yêu thương,\n` +
      `Thỏ tin con sẽ làm được và sẽ tặng con một phần thưởng Nhân Ái đặc biệt hơn nữa. Cố lên nhé! 💪`
    );
  }

  // Trống
  return (
    `Thỏ Nhân Ái chào ${displayName} 🐰\n` +
    `Hình như phiếu tuần này của con vẫn còn trống đó.\n` +
    `Con thử nhớ lại: ai đã giúp con, ai con muốn cảm ơn, con đã làm điều tốt gì,\n` +
    `và con muốn gửi lời yêu thương cho ai… rồi viết vào nha. Thỏ luôn chờ để lắng nghe con 🌈`
  );
}

// ========== GỬI DỮ LIỆU VỀ GOOGLE SHEET ==========

function sendToSheet(payload) {
  statusMsg.textContent = "Đang lưu phiếu Nhân Ái của con...";
  statusMsg.style.color = "#888";

  fetch(WEB_APP_URL, {
    method: "POST",
    mode: "no-cors", // vẫn gửi được, chỉ không đọc được phản hồi
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then(() => {
      statusMsg.textContent =
        "Thỏ đã lưu phiếu Nhân Ái của con. Cô sẽ xem và khen con sau nhé 🌸";
      statusMsg.style.color = "#2e7d32";
    })
    .catch(() => {
      statusMsg.textContent =
        "Thỏ hơi chậm mạng nên chưa chắc đã lưu được. Con báo cô giúp Thỏ nhé.";
      statusMsg.style.color = "#c62828";
    });
}

// ========== XỬ LÝ KHI BẤM “GỬI CHO THỎ” ==========

sendBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const lop = classSelect.value.trim();
  const camon1 = thank1Input.value.trim();
  const camon2 = thank2Input.value.trim();
  const camon3 = thank3Input.value.trim();
  const viectot = goodDeedInput.value.trim();
  const yeuthuong = loveMsgInput.value.trim();

  if (!name || !lop) {
    bunnyText.textContent =
      "Thỏ cần biết tên và lớp của con để khen cho đúng nhé. Con điền đủ tên và lớp rồi bấm lại giúp Thỏ nha 🐰";
    speak(bunnyText.textContent);
    return;
  }

  const reply = makeReply(name, [camon1, camon2, camon3], viectot, yeuthuong);
  bunnyText.textContent = reply;
  speak(reply);

  const payload = {
    name,
    lop,
    camon1,
    camon2,
    camon3,
    viectot,
    yeuthuong,
  };

  sendToSheet(payload);
});
