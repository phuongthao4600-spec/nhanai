// =======================
// THỎ NHÂN ÁI – SCRIPT.JS
// =======================

// Link Apps Script ghi vào Google Sheet
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwzecJDD4uNv1E3czQDWQYUZ8J4Gik7Vo_8RKe1dfRpLgYu3kbXAD0q5O6H6Vm2DRZ0Jg/exec";

// =======================
// 1. DANH SÁCH LỜI KHEN
// =======================

const praiseMessages = [
  "Con đã hoàn thành đủ 3 lời cảm ơn, một việc tốt và một lời yêu thương rồi. Thỏ và cô giáo rất tự hào về con.",
  "Phiếu 3–1–1 của con rất trọn vẹn, Thỏ cảm nhận được trái tim nhân ái và biết ơn của con.",
  "Con đã lan tỏa rất nhiều yêu thương qua phiếu 3–1–1 hôm nay, Thỏ vỗ tay khen con thật lớn.",
  "Con ghi đủ 3 lời cảm ơn, một việc tốt và một lời yêu thương rất chân thành. Con thật tuyệt vời!",
  "Nhìn phiếu 3–1–1 của con, Thỏ cảm nhận được con rất biết trân trọng và quan tâm tới mọi người.",
  "Con đã dành thời gian suy nghĩ để viết những điều tốt đẹp. Tấm lòng của con thật ấm áp.",
  "Phiếu 3–1–1 của con giống như một bó hoa đẹp, đầy ắp yêu thương và biết ơn.",
  "Con hoàn thành nhiệm vụ nhân ái thật xuất sắc. Thỏ mong con giữ thói quen tốt này.",
  "Lời cảm ơn và lời yêu thương của con rất lễ phép và chân thành. Con đáng khen lắm.",
  "Những việc tốt con làm trong tuần khiến Thỏ cảm thấy rất tự hào.",
  "Con biến suy nghĩ tốt đẹp thành hành động cụ thể, điều đó đáng quý lắm.",
  "Phiếu con viết khiến Thỏ mỉm cười mãi vì con biết yêu thương người khác.",
  "Con gieo được rất nhiều hạt giống nhân ái qua phiếu hôm nay.",
  "Thỏ đọc phiếu của con mà thấy lòng mình ấm lên. Con rất biết yêu thương.",
  "Con viết rất rõ ràng và đầy đủ. Phiếu của con là tấm gương tốt cho cả lớp.",
  "Việc tốt con làm tuy nhỏ nhưng chứa đựng nhiều yêu thương.",
  "Con không chỉ nghĩ cho mình mà còn nghĩ cho người khác nữa. Tuyệt vời lắm.",
  "Lời cảm ơn của con đúng lúc, chân thành và dễ thương vô cùng.",
  "Lời yêu thương con gửi khiến Thỏ thấy thật ấm áp.",
  "Con biến một tuần bình thường thành một tuần đầy yêu thương.",
  "Phiếu của con đẹp từ chữ viết đến tấm lòng.",
  "Con ngày càng trưởng thành qua từng phiếu 3–1–1.",
  "Phiếu 3–1–1 của con như nhật ký yêu thương nhỏ xíu nhưng ý nghĩa.",
  "Con đã làm tròn trách nhiệm với bản thân và lớp học.",
  "Thỏ rất vui vì con hoàn thành đầy đủ và nghiêm túc.",
  "Con đang xây dựng thói quen biết ơn – đó là báu vật của con.",
  "Những dòng con viết toát lên sự chân thành đáng quý.",
  "Con đặt nhiều tình cảm vào từng phần trong phiếu.",
  "Phiếu của con đặc biệt vì nó chứa rất nhiều yêu thương.",
  "Việc tốt con làm mang lại niềm vui cho mọi người.",
  "Lời cảm ơn con viết rất thật và rất đẹp.",
  "Lời yêu thương con gửi khiến Thỏ xúc động luôn.",
  "Con làm đủ 3–1–1 rất nghiêm túc – Thỏ khen con!",
  "Phiếu con viết khiến nhiều bạn khác muốn học theo.",
  "Con là một bạn nhỏ sống tình cảm và biết sẻ chia.",
  "Con giữ được thói quen tốt – thật đáng tự hào.",
  "Những điều con làm tuần này rất ý nghĩa.",
  "Con cho Thỏ thấy con trưởng thành hơn nhiều.",
  "Phiếu của con khiến Thỏ vui lắm, thật đó!",
  "Con xứng đáng nhận giấy khen nhân ái tuần này!"
];

// ===========================
// 2. DANH SÁCH LỜI ĐỘNG VIÊN
//    (có chèn __MISSING__)
// ===========================

const encourageMessagesTemplates = [
  "Con đã viết rất dễ thương rồi, chỉ là phiếu còn thiếu __MISSING__. Không sao đâu, tuần sau con làm đủ hơn nhé.",
  "Hôm nay con ghi được vài điều dễ thương, dù phiếu còn thiếu __MISSING__. Tuần sau Thỏ sẽ chờ phiếu đầy đủ nha.",
  "Thỏ cảm ơn con đã chia sẻ, dù phiếu còn thiếu __MISSING__. Tuần sau mình làm tốt hơn nhé.",
  "Phiếu có nhiều điều hay, chỉ là thiếu __MISSING__. Lần sau con nhớ bổ sung thêm nha.",
  "Con đã làm được một phần rồi, phần thiếu là __MISSING__. Tuần sau mình cố gắng hơn.",
  "Thỏ thấy con đang cố gắng thật sự, dù phiếu còn thiếu __MISSING__. Tuần sau con sẽ làm tốt hơn.",
  "Con đã bắt đầu tốt rồi, chỉ là còn thiếu __MISSING__. Tuần sau mình viết thêm nhé.",
  "Những gì con viết rất đáng yêu, nhưng phiếu còn thiếu __MISSING__. Lần sau con hoàn thành đủ nha.",
  "Hôm nay con đã cố gắng rồi, chỉ là thiếu __MISSING__. Tuần sau mình làm trọn vẹn hơn.",
  "Không sao khi phiếu còn thiếu __MISSING__. Tuần sau con cố gắng thêm một chút là được.",
  "Phiếu hôm nay như bức tranh chưa tô xong vì thiếu __MISSING__. Tuần sau mình tô nốt nha.",
  "Con đã viết một phần rất tốt, phần thiếu là __MISSING__. Tuần sau thêm vào nhé.",
  "Phiếu còn thiếu __MISSING__, nhưng Thỏ biết con đang tiến bộ. Tuần sau cố hơn chút nữa nha.",
  "Con ghi được nhiều điều hay rồi, chỉ thiếu __MISSING__. Tuần sau nhớ bổ sung nhé.",
  "Chưa đầy đủ vì thiếu __MISSING__, nhưng con đã cố gắng rồi. Tuần sau mình làm tốt hơn.",
  "Thỏ tin con có thể làm đủ, chỉ là hôm nay con thiếu __MISSING__. Tuần sau mình thử lại nha.",
  "Con đang đi đúng hướng, nhưng còn thiếu __MISSING__. Tuần tới nhớ hoàn thành hết.",
  "Con làm được nửa phiếu rồi, phần thiếu là __MISSING__. Tuần sau hoàn thiện thêm nha.",
  "Phiếu chưa hoàn thiện vì thiếu __MISSING__. Tuần sau con viết đủ chắc chắn đẹp lắm.",
  "Con đã rất cố gắng, chỉ thiếu __MISSING__. Tuần sau thêm phần này là tuyệt vời liền.",
  "Không sao hết, con chỉ thiếu __MISSING__. Tuần sau mình viết đủ 3–1–1 nha.",
  "Phiếu lần này thiếu __MISSING__, nhưng là bước khởi đầu tốt. Tuần sau Thỏ tin con làm được.",
  "Con đã viết được nhiều điều tốt, nhưng phiếu thiếu __MISSING__. Lần sau cố gắng hơn nhé.",
  "Chỉ còn thiếu __MISSING__ là phiếu của con trọn vẹn. Tuần sau mình cùng hoàn thành nhé.",
  "Tuần này phiếu chưa đủ vì thiếu __MISSING__. Nhưng tuần sau chắc chắn con làm tốt hơn.",
  "Phiếu giống bài hát thiếu vài nốt nhạc là __MISSING__. Tuần sau mình thêm vào nha.",
  "Con làm được rồi, chỉ là thiếu __MISSING__. Tuần sau con bổ sung thêm nha.",
  "Thỏ không buồn đâu khi con thiếu __MISSING__. Tuần sau mình làm lại, chắc chắn đẹp hơn.",
  "Con đã ghi được một phần, phần thiếu là __MISSING__. Tuần sau mình làm đủ hơn.",
  "Phiếu thiếu __MISSING__, nhưng Thỏ thấy con có tiến bộ. Tuần sau tiếp tục nha.",
  "Không sao khi phiếu thiếu __MISSING__. Con đang học cách viết tốt hơn mà.",
  "Con chỉ thiếu __MISSING__, còn lại con làm rất tốt. Tuần sau nhớ hoàn chỉnh hơn nghen.",
  "Phiếu tuần này chưa trọn vẹn vì __MISSING__, nhưng tuần sau Thỏ tin con làm được.",
  "Con đã bắt đầu tốt rồi, phần __MISSING__ tuần sau con bổ sung thêm.",
  "Phiếu thiếu __MISSING__, nhưng con đang dần cải thiện. Tuần sau cố gắng hơn nha.",
  "Tuần này con thiếu __MISSING__, tuần sau mình cùng làm cho đầy đủ nha.",
  "Con còn thiếu __MISSING__, nhưng Thỏ tin con tuần sau sẽ làm tuyệt vời.",
  "Phiếu còn thiếu __MISSING__, nhưng Thỏ thấy con có nhiều tiến bộ rồi.",
  "Chỉ cần thêm __MISSING__ nữa thôi là con hoàn thành tốt rồi. Tuần sau thử lại nha.",
  "Tuần này thiếu __MISSING__, nhưng tuần tới con làm trọn vẹn là được."
];

// ================================
// 3. HÀM CHỌN CÂU KHEN/ĐỘNG VIÊN
//    KHÔNG TRÙNG (xoay vòng)
// ================================

let usedPraiseIndexes = new Set();
let usedEncourageIndexes = new Set();

function pickUniqueMessage(messages, usedSet) {
  if (usedSet.size === messages.length) {
    usedSet.clear();
  }
  let index;
  do {
    index = Math.floor(Math.random() * messages.length);
  } while (usedSet.has(index) && usedSet.size < messages.length);
  usedSet.add(index);
  return messages[index];
}

// ======================
// 4. THỎ NÓI (TTS)
// ======================

function speakAsBunny(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "vi-VN";
  const voices = window.speechSynthesis.getVoices();
  const viVoices = voices.filter(v => v.lang.startsWith("vi"));
  if (viVoices.length > 0) utter.voice = viVoices[0];
  window.speechSynthesis.speak(utter);
}

// ======================
// 5. MAIN
// ======================

document.addEventListener("DOMContentLoaded", function () {
  // Âm thanh
  const bgSound = new Audio("bg.mp3");
  bgSound.loop = true;
  bgSound.volume = 0.08; // nhạc nền nhỏ
  let bgStarted = false;

  const sendSound = new Audio("send.mp3.mp3");
  sendSound.volume = 1.0;

  const awardSound = new Audio("award.mp3.wav");
  awardSound.volume = 1.0;

  // Chỉ bật nhạc nền sau thao tác đầu tiên để tránh bị chặn autoplay
  function startBgMusicOnce() {
    if (bgStarted) return;
    bgStarted = true;
    bgSound.play().catch(() => {});
    document.removeEventListener("click", startBgMusicOnce);
  }
  document.addEventListener("click", startBgMusicOnce);

  // Lấy các phần tử trên form
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

  if (certificate) certificate.classList.add("hidden");

  // Xử lý khi bấm "Gửi cho Thỏ"
  sendBtn.addEventListener("click", function () {
    const name = nameInput.value.trim();
    const lop = classSelect.value.trim();
    const c1 = camon1.value.trim();
    const c2 = camon2.value.trim();
    const c3 = camon3.value.trim();
    const vt = viectot.value.trim();
    const yt = yeuthuong.value.trim();

    if (!name) {
      alert("Con hãy ghi tên của mình nhé.");
      return;
    }
    if (!lop) {
      alert("Con hãy chọn lớp của mình nhé.");
      return;
    }

    // Xác định phần còn thiếu
    let missing = [];
    if (!c1) missing.push("lời cảm ơn 1");
    if (!c2) missing.push("lời cảm ơn 2");
    if (!c3) missing.push("lời cảm ơn 3");
    if (!vt) missing.push("một việc tốt");
    if (!yt) missing.push("một lời yêu thương");

    const isFull311 = missing.length === 0;

    // Âm thanh gửi
    sendSound.currentTime = 0;
    sendSound.play().catch(() => {});

    // Hiển thị chat
    chatBox.innerHTML = "";
    const hello = document.createElement("p");
    hello.textContent = `Thỏ Nhân Ái chào bạn ${name} (lớp ${lop}) 🐰`;
    chatBox.appendChild(hello);

    let speakText = `Thỏ Nhân Ái chào bạn ${name} lớp ${lop}. `;

    if (isFull311) {
      // Đủ 3–1–1 => lời khen + giấy khen
      const praise = pickUniqueMessage(praiseMessages, usedPraiseIndexes);
      const p = document.createElement("p");
      p.textContent = praise + " 🌸";
      chatBox.appendChild(p);
      speakText += praise;

      // Giấy khen
      if (certificate) {
        certName.textContent = name;
        certificate.classList.remove("hidden");
      }
      awardSound.currentTime = 0;
      awardSound.play().catch(() => {});
    } else {
      // Chưa đủ 3–1–1 => liệt kê thiếu + động viên
      const intro = document.createElement("p");
      intro.textContent = "Con đã viết rất tốt rồi, nhưng phiếu 3–1–1 của con còn thiếu:";
      chatBox.appendChild(intro);

      const ul = document.createElement("ul");
      missing.forEach(m => {
        const li = document.createElement("li");
        li.textContent = m;
        ul.appendChild(li);
      });
      chatBox.appendChild(ul);

      let template = pickUniqueMessage(
        encourageMessagesTemplates,
        usedEncourageIndexes
      );
      const msg = template.replace("__MISSING__", missing.join(", "));
      const p = document.createElement("p");
      p.textContent = msg + " 💗";
      chatBox.appendChild(p);

      speakText += msg;

      // Không hiện giấy khen nếu chưa đủ
      if (certificate) {
        certificate.classList.add("hidden");
      }
    }

    // Gửi dữ liệu lên Google Sheet
    const formData = new FormData();
    formData.append("name", name);
    formData.append("lop", lop);
    formData.append("camon1", c1);
    formData.append("camon2", c2);
    formData.append("camon3", c3);
    formData.append("viectot", vt);
    formData.append("yeuthuong", yt);
    formData.append("hasCertificate", isFull311 ? "x" : "");

    fetch(SCRIPT_URL, {
      method: "POST",
      body: formData,
      mode: "no-cors"
    }).catch(() => {});

    // Thỏ đọc lại cho con nghe
    speakAsBunny(speakText);
  });
});
