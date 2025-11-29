function speak(text) {
  const synth = window.speechSynthesis;
  let voices = synth.getVoices();

  // Chọn giọng nữ tiếng Việt (ưu tiên tuyệt đối)
  let voice =
    voices.find(v => v.lang === "vi-VN" && v.name.toLowerCase().includes("female")) ||
    voices.find(v => v.lang === "vi-VN" && v.name.toLowerCase().includes("nu")) ||
    voices.find(v => v.lang === "vi-VN");

  // Nếu không có giọng Việt — dùng giọng nữ tiếng Anh nhẹ
  if (!voice) {
    voice =
      voices.find(v => v.name.toLowerCase().includes("female")) ||
      voices.find(v => v.name.toLowerCase().includes("woman")) ||
      voices.find(v => v.name.toLowerCase().includes("girl")) ||
      voices.find(v => v.lang.startsWith("en")) ||
      voices[0];
  }

  const utter = new SpeechSynthesisUtterance(text);
  utter.voice = voice;
  utter.rate = 0.95; // tốc độ chậm ấm áp
  utter.pitch = 1.1; // giọng cao nhẹ
  utter.volume = 1;

  synth.speak(utter);
}
