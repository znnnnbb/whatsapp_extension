chrome.runtime.onInstalled.addListener(() => {
    console.log("WhatsApp Translator Installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'translate') {
        const apiUrl = 'https://libretranslate.com/translate'; // API URL for LibreTranslate

        // Validate inputs
        if (!message.text || !message.targetLanguage) {
            sendResponse({ error: "Invalid input: Missing text or target language." });
            return; // Exit if inputs are not valid
        }

        // Debugging: Log the text and target language
        console.log("Translating:", message.text, "to", message.targetLanguage);

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                q: message.text, // Text to translate
                source: 'en', // Source language
                target: message.targetLanguage // Target language
            })
        })
        .then(response => {
            // Check if response is ok
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Translation Response Data:", data); // Log the response data
            if (data && data.translatedText) {
                sendResponse({ translated: data.translatedText }); // Return translated text
            } else {
                sendResponse({ error: "Translation failed: No translations found." });
            }
        })
        .catch(err => {
            console.error('Translation Error:', err);
            sendResponse({ error: "Translation error: " + err.message });
        });

        return true; // Required for async response
    }
});
