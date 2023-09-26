/**
 * Display the payloads to the HTML page.
 * @param {string[]} payloads - The payloads to display.
 */
function displayPayloads(payloads) {
    payloadsContainer.innerHTML = '';
    payloads.forEach(payload => {
        const card = document.createElement('div');
        card.classList.add('payload-card');

        const cardText = document.createElement('span');
        cardText.classList.add('payload-text');
        cardText.textContent = payload;

        const copyButton = document.createElement('button');
        copyButton.classList.add('payload-copy-btn');
        copyButton.textContent = "Copy";
        copyButton.addEventListener('click', () => copyToClipboard(payload));

        card.appendChild(cardText);
        card.appendChild(copyButton);
        payloadsContainer.appendChild(card);
    });
}

/**
 * Copy a text to the clipboard.
 * @param {string} text - The text to copy to the clipboard.
 */
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand('copy');

    document.body.removeChild(textarea);
}

/**
 * Check if a string is a valid URI.
 * @param {string} uri - The string to check for URI validity.
 * @returns {boolean} - True if the string is a valid URI, otherwise false.
 */
function isValidURI(uri) {
    try {
        new URL(uri);
        return true;
    } catch (error) {
        return false;
    }
}