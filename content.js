function scrapeMessages() {
    const messages = document.querySelectorAll(".message-text");
    let chatData = [];
    messages.forEach(message => {
      chatData.push(message.innerText);
    });
    return chatData;
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scrapeChats") {
      const chats = scrapeMessages();
      sendResponse({ chats });
    }
  });
  