const chat = document.getElementById("chat");
const openChat = document.getElementById("openChat");
const closeChat = document.getElementById("closeChat");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");

function addMsg(text, who) {
  const div = document.createElement("div");
  div.className = `msg ${who}`;
  div.textContent = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function reply(text, telegramUrl) {
  const m = text.toLowerCase();

  if (m.includes("цена") || m.includes("стоим") || m.includes("сколько")) {
    return "Стоимость зависит от формата. Напиши: 1) запрос 2) срок 3) город/часовой пояс — подскажу лучший вариант.";
  }
  if (m.includes("запис") || m.includes("созвон") || m.includes("встреч")) {
    return `Записаться проще всего в Telegram: ${telegramUrl}`;
  }
  if (m.includes("телег") || m.includes("tg") || m.includes("тг")) {
    return `Вот ссылка: ${telegramUrl}`;
  }
  if (m.includes("привет") || m.includes("здрав")) {
    return "Привет! Я помощник. Напиши: «стоимость», «запись» или коротко свой запрос 🙂";
  }

  return "Поняла. Скажи, пожалуйста: 1) что хочешь решить 2) когда нужно 3) город/часовой пояс. И я подберу формат.";
}

openChat.addEventListener("click", () => {
  chat.style.display = "block";
  chatInput.focus();
});

closeChat.addEventListener("click", () => {
  chat.style.display = "none";
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = (chatInput.value || "").trim();
  if (!text) return;

  addMsg(text, "user");
  chatInput.value = "";

  const telegramUrl = chat.getAttribute("data-telegram");
  addMsg(reply(text, telegramUrl), "bot");
});
