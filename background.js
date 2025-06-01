chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    console.log('[YTPAR background.js] Received message:', message, 'from', sender);
    if (message.type === 'video_started') {
        const { title } = message;
        // const config = await chrome.storage.sync.get(["deviceName", "urlTemplate", "messageTemplate"]);
        // const config = await chrome.storage.local.get(["deviceName", "urlTemplate", "messageTemplate"]);
        // console.log('[YTPAR background.js] Loaded config:', config);

        chrome.storage.local.get(["deviceName", "urlTemplate", "messageTemplate"], function(config) {
            console.log('[YTPAR background.js] Loaded config:', config);
            
            const payload = config.messageTemplate
                .replace("{title}", title)
                .replace("{device}", config.deviceName || "Unknown Device");
            console.log('[YTPAR background.js] Prepared payload:', payload);

            const url = config.urlTemplate || "";
            if (!url) {
                console.warn('[YTPAR background.js] No URL template provided, aborting POST.');
                return;
            }

            fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: payload })
            })
            .then(response => {
                console.log('[YTPAR background.js] POST response status:', response.status);
                return response.text();
            })
            .then(text => {
                console.log('[YTPAR background.js] POST response body:', text);
            })
            .catch(err => {
                console.error('[YTPAR background.js] POST error:', err);
            });
        });
    }
});
