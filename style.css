* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

body {
  background: linear-gradient(135deg, #ffe6f2, #fff8fb);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 32px 12px;
  color: #333;
}

.app {
  background: #ffffff;
  width: 100%;
  max-width: 1100px;
  border-radius: 24px;
  box-shadow: 0 18px 45px rgba(255, 105, 180, 0.18);
  padding: 24px 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* HEADER */

.app-header {
  display: flex;
  gap: 16px;
  align-items: center;
}

.bunny-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #ffe6f0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(255, 105, 180, 0.25);
}

.bunny-avatar.big {
  width: 120px;
  height: 120px;
}

.bunny-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: bunnyIdle 2.2s ease-in-out infinite;
}

@keyframes bunnyIdle {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.app-header h1 {
  font-size: 26px;
  color: #f2468f;
  margin-bottom: 4px;
}

.app-header p {
  font-size: 15px;
  color: #555;
}

.sub-badge {
  display: inline-block;
  margin-top: 6px;
  background: #ffe4f0;
  color: #c2185b;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
}

/* HINT */

.hint-bubble {
  margin-top: 4px;
  padding: 10px 14px;
  border-radius: 16px;
  background: #fff6fb;
  border: 1px dashed #f48fb1;
  font-size: 14px;
}

/* MAIN LAYOUT */

.app-main {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
  gap: 20px;
  margin-top: 8px;
}

@media (max-width: 900px) {
  .app-main {
    grid-template-columns: 1fr;
  }
}

/* FORM */

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 10px;
}

.field label {
  font-size: 14px;
  font-weight: 600;
}

.field input,
.field select,
.field textarea {
  border-radius: 10px;
  border: 1px solid #e0c4d8;
  padding: 8px 10px;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
  resize: vertical;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: #f06292;
  box-shadow: 0 0 0 2px rgba(240, 98, 146, 0.2);
}

.section-title {
  margin-top: 8px;
  font-size: 18px;
  color: #d81b60;
}

.section-desc {
  font-size: 13px;
  color: #777;
  margin-bottom: 8px;
}

.field-group {
  margin-top: 6px;
  padding: 10px 12px;
  border-radius: 16px;
  background: #fff7fb;
  border: 1px solid #f8bbd0;
}

.field-group h3 {
  font-size: 15px;
  color: #ad1457;
  margin-bottom: 6px;
}

.field.small textarea {
  font-size: 13px;
}

.helper-text {
  margin-top: 6px;
  font-size: 12px;
  color: #777;
}

.buttons {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

button {
  border-radius: 999px;
  padding: 8px 14px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

button.primary {
  background: linear-gradient(135deg, #ff80ab, #f06292);
  color: white;
  box-shadow: 0 8px 18px rgba(240, 98, 146, 0.35);
}

button.primary:hover {
  filter: brightness(1.03);
}

button.secondary {
  background: #fce4ec;
  color: #ad1457;
}

.status-msg {
  min-height: 18px;
  margin-top: 4px;
  font-size: 12px;
  color: #777;
}

/* CHAT PANEL */

.chat-panel {
  background: #fff7fb;
  border-radius: 18px;
  padding: 16px 14px;
  border: 1px solid #f8bbd0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.chat-bunny {
  display: flex;
  justify-content: center;
}

.chat-bubble {
  background: white;
  border-radius: 16px;
  padding: 10px 12px;
  font-size: 14px;
  box-shadow: 0 10px 24px rgba(233, 30, 99, 0.12);
  position: relative;
}

.chat-bubble::before {
  content: "";
  position: absolute;
  top: -10px;
  left: 28px;
  border-width: 0 10px 10px 10px;
  border-style: solid;
  border-color: transparent transparent white transparent;
}

.chat-title {
  font-weight: 600;
  margin-bottom: 4px;
  color: #d81b60;
}

/* Bunny speaking animation */

.bunny-speaking img {
  animation: bunnyTalking 0.35s ease-in-out infinite;
}

@keyframes bunnyTalking {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-3px) scale(1.02);
  }
}

/* FOOTER */

.app-footer {
  margin-top: 6px;
  border-top: 1px dashed #f8bbd0;
  padding-top: 8px;
  text-align: center;
}

.app-footer small {
  font-size: 11px;
  color: #888;
}
