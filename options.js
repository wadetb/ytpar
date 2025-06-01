document.getElementById("save").addEventListener("click", () => {
    const deviceName = document.getElementById("deviceName").value;
    const urlTemplate = document.getElementById("urlTemplate").value;
    const messageTemplate = document.getElementById("messageTemplate").value;
    console.log('[YTPAR options.js] Saving settings:', { deviceName, urlTemplate, messageTemplate });

    chrome.storage.local.set({ deviceName, urlTemplate, messageTemplate }, () => {
        console.log('[YTPAR options.js] Settings saved to storage');
        alert("Settings saved");
    });
});

document.addEventListener("DOMContentLoaded", async () => {
    const config = await chrome.storage.local.get(["deviceName", "urlTemplate", "messageTemplate"]);
    console.log('[YTPAR options.js] Loaded config on DOMContentLoaded:', config);
    document.getElementById("deviceName").value = config.deviceName || "YOUR_DEVICE_NAME";
    document.getElementById("urlTemplate").value = config.urlTemplate || "https://your-endpoint.example.com";
    document.getElementById("messageTemplate").value = config.messageTemplate || "{device} is watching {title}";
});
