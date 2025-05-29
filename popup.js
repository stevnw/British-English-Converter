document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('toggleSwitch');

    browser.runtime.sendMessage({ action: "getState" }).then(response => {
        if (response && response.enabled !== undefined) {
            toggleSwitch.checked = response.enabled;
        }
    }).catch(error => console.error("Error getting initial state:", error));

    toggleSwitch.addEventListener('change', () => {
        const enabled = toggleSwitch.checked;
        browser.runtime.sendMessage({ action: 'toggle', enabled: enabled }).catch(error => {
            console.error("Error sending toggle message:", error);
        });
    });
});
