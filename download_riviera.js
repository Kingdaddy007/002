const fs = require('fs');
const path = require('path');
const https = require('https');

const targetUrl = 'https://www.xbdesign.com/residential/riviera-residential-interior-design/';
const downloadDir = path.join(__dirname, 'riviera_images');

if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir);
}

const fetchHtml = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
};

const downloadFile = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
};

async function run() {
    console.log("Fetching Riviera HTML...");
    try {
        const html = await fetchHtml(targetUrl);
        const regex = /https:\/\/www\.xbdesign\.com\/wp-content\/uploads\/[^"'`\s]+\.(jpg|jpeg|png)/g;
        const matches = [...new Set(html.match(regex) || [])];
        
        console.log(`Found ${matches.length} image URLs.`);
        
        for (const url of matches) {
            // Only download high-res (avoid thumbnails if possible)
            if (url.includes('150x150') || url.includes('300x')) continue;
            
            const filename = path.basename(url);
            const dest = path.join(downloadDir, filename);
            console.log(`Downloading ${filename}...`);
            try {
                await downloadFile(url, dest);
            } catch (e) {
                console.error(e.message);
            }
        }
        console.log("Done downloading Riviera images.");
    } catch (e) {
        console.error("Error:", e);
    }
}

run();
