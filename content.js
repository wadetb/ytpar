
function getVideoTitle() {
    const match = document.title.match(/^\s*(\(\d+\)\s*)?(.+?)\s+-\s+YouTube\s*$/);
    if (match) {
        const title = match[2].trim();
        return title;
    } else {
        console.log('[YTPAR content.js] getVideoTitle: no match for document.title:', document.title);
        return null;
    }
}

function notifyBackground(title) {
    console.log('[YTPAR content.js] Notifying background with title:', title);
    chrome.runtime.sendMessage({ type: 'video_started', title });
}

const observer = new MutationObserver(() => {
    const title = getVideoTitle();
    if (title && title !== window.__lastNotifiedTitle) {
        console.log('[YTPAR content.js] New video title detected:', title);
        window.__lastNotifiedTitle = title;
        notifyBackground(title);
    }
});

console.log('[YTPAR content.js] Starting MutationObserver on document.body');
observer.observe(document.body, { subtree: true, childList: true });
