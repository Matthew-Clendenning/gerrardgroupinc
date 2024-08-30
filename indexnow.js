import axios from 'axios';

const API_KEY = 'y1e9c6031c5cb4a8b8167206256731297';
const ENDPOINT = 'https://www.bing.com/indexnow';

export async function notifyIndexNow(urls) {
    try {
        const response = await axios.post(ENDPOINT, {
            host: 'https://gerrardgroupinc.com/', // Replace with your domain
            key: API_KEY,
            keyLocation: `https://gerrardgroupinc.com/${API_KEY}.txt`,
            urlList: urls
        });

        console.log('IndexNow notification sent:', response.data);
        
    } catch (error) {
        console.error('Error sending IndexNow notification:', error);
    }
}