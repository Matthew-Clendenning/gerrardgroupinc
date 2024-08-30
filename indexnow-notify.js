import { notifyIndexNow } from './indexnow.js';

async function updatePage(urls) {
    // Notify IndexNow about the updated pages
    await notifyIndexNow(urls);
}

// Example usage
updatePage(['https://gerrardgroupinc.com/liquidations']);