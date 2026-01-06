const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  // Show user message
  chatMessages.innerHTML += `
    <div class="msg user">${userMessage}</div>
  `;

  chatInput.value = "";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await res.json();

    if (data.reply) {
      chatMessages.innerHTML += `
        <div class="msg ai">${data.reply}</div>
      `;
    } else {
      chatMessages.innerHTML += `
        <div class="msg ai error">No reply from AI</div>
      `;
    }

    chatMessages.scrollTop = chatMessages.scrollHeight;

  } catch (err) {
    console.error(err);
    chatMessages.innerHTML += `
      <div class="msg ai error">AI connection failed</div>
    `;
  }
});