import { notifyIndexNow } from './indexnow.js';

async function updatePage(urls) {
    // Notify IndexNow about the updated pages
    await notifyIndexNow(urls);
}

// Example usage
updatePage(['https://gerrardgroupinc.com/atlas-copco-air-compressor-1550cd7/', 'https://gerrardgroupinc.com/atlas-copco-air-compressor-1600/']);