import { notifyIndexNow } from './indexnow.js';

async function updatePage(urls) {
    // Notify IndexNow about the updated pages
    await notifyIndexNow(urls);
}

updatePage(['']);