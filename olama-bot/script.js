async function sendMessage() {
    const inputField = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const userText = inputField.value.trim();
  
    if (!userText) return;
  
    appendMessage(userText, 'user');
    inputField.value = '';
  
    appendMessage('Mistral is thinking...', 'bot', true);
  
    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'mistral',
          prompt: userText
        })
      });
  
      const data = await response.json();
  
      removeThinking();
      appendMessage(data.response.trim(), 'bot');
    } catch (error) {
      removeThinking();
      appendMessage('⚠️ Error contacting Mistral.', 'bot');
      console.error('Error:', error);
    }
  }
  
  function appendMessage(text, sender, temp = false) {
    const chatBox = document.getElementById('chat-box');
    const message = document.createElement('div');
    message.className = `message ${sender}`;
    if (temp) message.id = 'temp-msg';
    message.textContent = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  
  function removeThinking() {
    const temp = document.getElementById('temp-msg');
    if (temp) temp.remove();
  }
  