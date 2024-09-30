// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Get the translate button and add the click event listener
    document.getElementById('translateButton').addEventListener('click', () => {
        const inputText = document.getElementById('inputText').value;
        const targetLanguage = document.getElementById('targetLanguage').value;

        // Send a message to the background script to perform the translation
        chrome.runtime.sendMessage({ action: 'translate', text: inputText, targetLanguage: targetLanguage }, (response) => {
            if (response.error) {
                document.getElementById('output').innerText = response.error;
            } else {
                document.getElementById('output').innerText = `Translated Text: ${response.translated}`;
            }
        });
    });
});
