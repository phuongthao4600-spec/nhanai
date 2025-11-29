// ====== CẤU HÌNH ======
const SHEET_WEB_APP_URL = "PASTE_LINK_WEB_APP_VÀO_ĐÂY"; // lát nữa dán

// ====== LẤY PHẦN TỬ TRÊN GIAO DIỆN ======
const chatBox = document.getElementById("chatBox");
const nameInput = document.getElementById("studentName");
const classInput = document.getElementById("className");
const thanksInput = document.getElementById("thanksInput");
const deedInput = document.getElementById("deedInput");
const loveInput = document.getElementById("loveInput");
const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearBtn");
const bunnyAvatar = document.getElementById("bunnyAvatar");
const currentSpeechText = document.getElementById("currentSpeechText");

// ====== GIỌNG CÔ GIÁO ẤM ÁP ======
const synth = window.speechSynthesis;
let teacherVoice = null;

function pickWarmVietnameseVoice() {
  if (!synth) return null;
  const voices = synth.getVoices();
  const viVoices = voices.filter((v) =>
    v.lang.toLowerCase().startsWith("vi")
  );
  const femaleLike = viVoices.find((v) =>
    /female|nữ|nu|woman|girl/i.test(v.name)
  );
  return femaleLike || viVoices[0] || voices[0] || null;
}

function speakAsTeacher(text) {
  // Cho thỏ nhún dù có giọng hay không
  currentSpeechText.textContent = text;
  bunnyAvatar.classList.add("speaking");
  setTimeout(() => bunnyAvatar.classList.remove("speaking"), 2600);

  if (!synth || !text) return;

  if (!teacherVoice) {
    teacherVoice = pickWarmVietnameseVoice();
    if (!teacherVoice) {
      synth.onvoiceschanged = () => {
        teacherVoice = pickWarmVietnameseVoice();
      };
    }
  }

  const utter = new SpeechSynthesisUtterance(text);
  if (teacherVoice) utter.voice = teacherVoice;
  utter.lang = "vi-VN";
  utter.rate = 0.95;
  utter.pitch = 0.95;

  synth.cancel();
  synth.speak(utter);
}

// ====== CHAT UI ======
function scrollToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}

function addMessage(html, who = "bot") {
  const msg = document.createElement("div");
  msg.className = "msg " + (who === "me" ? "me" : "bot");
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerHTML = html;
  msg.appendChild(bubble);
  chatBox.appendChild(msg);
  scrollToBottom();
}

// ====== TẠO PHẢN HỒI ======
const compliments = [
  "Con đã làm rất tốt. Cô cảm nhận được trái tim nhân ái và biết ơn của con.",
  "Cô rất tự hào vì con vừa biết nói lời cảm ơn, vừa làm việc tốt, vừa gửi yêu thương.",
  "Tuần này con xứng đáng nhận Giấy khen Thỏ Nhân Ái vì đã sống rất đẹp trong lớp và ở nhà."
];

const encouragements = [
  "Không sao đâu con, ai cũng có những tuần khởi động. Tuần sau mình cùng cố gắng hơn nhé.",
  "Cô rất trân trọng nỗ lực của con. Chỉ cần con bổ sung thêm một chút là phiếu Nhân Ái sẽ trọn vẹn rồi.",
  "Cô tin con làm được. Mỗi tuần con hoàn thiện thêm một ít là đã tiến bộ rất nhiều rồi đó."
];

function makeBotReply(name, className, thanks, deed, love) {
  const hasThanks = thanks.trim().length > 10;
  const hasDeed = deed.trim().length > 10;
  const hasLove = love.trim().length > 10;

  const parts = [];
  const labelName = name || "con";
  const labelClass = className ? ` lớp ${className}` : "";

  parts.push(
    `Chào ${labelName}${labelClass}! Cô Thỏ đã đọc xong phiếu Nhân Ái 3–1–1 của con rồi.`
  );

  if (hasThanks && hasDeed && hasLove) {
    const cmt = compliments[Math.floor(Math.random() * compliments.length)];
    parts.push(
      "Con đã hoàn thành đủ 3 phần: 3 lời cảm ơn, 1 việc tốt và 1 lời yêu thương. Điều đó cho thấy con rất biết ơn, biết giúp đỡ và biết yêu thương người khác. 💛"
    );
    parts.push(cmt);
    parts.push(
      "Con hãy giữ thói quen đẹp này trong những tuần tiếp theo nhé. Cô tin con sẽ truyền cảm hứng cho nhiều bạn khác trong lớp. 🌟"
    );
  } else {
    if (!hasThanks && !hasDeed && !hasLove) {
      parts.push(
        "Tuần này con chưa ghi rõ lời cảm ơn, việc tốt và lời yêu thương. Không sao đâu, đây là bước khởi động mà. 🌱"
      );
    } else {
      parts.push(
        "Con đã cố gắng viết phiếu Nhân Ái, cô rất trân trọng điều đó. Tuy nhiên, để phiếu trọn vẹn hơn, con cần hoàn thành thêm một vài phần nữa nhé."
      );
    }

    const missing = [];
    if (!hasThanks) missing.push("3 lời cảm ơn");
    if (!hasDeed) missing.push("1 việc tốt");
    if (!hasLove) missing.push("1 lời yêu thương");

    if (missing.length > 0) {
      parts.push(
        `Phần con còn thiếu là: <strong>${missing.join(
          ", "
        )}</strong>. Con thử nhớ lại xem trong tuần, con đã được ai giúp đỡ, con đã làm việc tốt gì hoặc con muốn nói lời yêu thương với ai nhé.`
      );
    }

    if (hasThanks) {
      parts.push(
        "Những lời cảm ơn con viết cho thấy con biết trân trọng những người xung quanh, đó là điều rất đáng quý. 💐"
      );
    }
    if (hasDeed) {
      parts.push(
        "Việc tốt con làm, dù nhỏ thôi, cũng đã làm người khác vui hơn. Mỗi việc tốt là một hạt giống Nhân Ái được gieo xuống. 🌈"
      );
    }
    if (hasLove) {
      parts.push(
        "Lời yêu thương con gửi đi giúp trái tim của người nhận ấm áp hơn. Đó là món quà rất đẹp mà không tốn tiền đâu. 💖"
      );
    }

    const dv = encouragements[Math.floor(Math.random() * encouragements.length)];
    parts.push(dv);
    parts.push(
      "Tuần sau, con thử hoàn thành đầy đủ cả 3 phần để nhận Giấy khen Thỏ Nhân Ái nhé. Cô luôn tin là con làm được. Cố lên nào! 🐰✨"
    );
  }

  const replyText = parts.join(" ");
  const replyHtml = "<strong>Thỏ Nhân Ái:</strong><br>" + replyText;
  addMessage(replyHtml, "bot");
  speakAsTeacher(replyText);
}

// ====== GỬI DỮ LIỆU LÊN GOOGLE SHEET ======
async function sendToSheet(payload) {
  if (!SHEET_WEB_APP_URL || SHEET_WEB_APP_URL.includes("PASTE_LINK")) return;
  try {
    await fetch(SHEET_WEB_APP_URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error("Không gửi được dữ liệu lên Sheet:", e);
  }
}

// ====== XỬ LÝ NÚT ======
function handleSend() {
  const name = (nameInput.value || "").trim();
  const className = (classInput.value || "").trim();
  const thanks = (thanksInput.value || "").trim();
  const deed = (deedInput.value || "").trim();
  const love = (loveInput.value || "").trim();

  if (!thanks && !deed && !love) return;

  const summary =
    "3 lời cảm ơn:\n" +
    (thanks || "(chưa viết)") +
    "\n\n1 việc tốt:\n" +
    (deed || "(chưa viết)") +
    "\n\n1 lời yêu thương:\n" +
    (love || "(chưa viết)");

  addMessage(summary, "me");
  makeBotReply(name, className, thanks, deed, love);

  const payload = {
    name,
    className,
    thank: thanks,
    good: deed,
    love: love,
  };
  sendToSheet(payload);
}

function handleClear() {
  thanksInput.value = "";
  deedInput.value = "";
  loveInput.value = "";
}

sendBtn.addEventListener("click", handleSend);
clearBtn.addEventListener("click", handleClear);
