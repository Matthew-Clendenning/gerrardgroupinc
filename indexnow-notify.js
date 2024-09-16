import { notifyIndexNow } from './indexnow.js';

async function updatePage(urls) {
    // Notify IndexNow about the updated pages
    await notifyIndexNow(urls);
}

updatePage(['https://gerrardgroupinc.com/atlas-copco-air-compressor-1550-cd/', 'https://gerrardgroupinc.com/atlas-copco-air-compressor-1550-cd7/']);