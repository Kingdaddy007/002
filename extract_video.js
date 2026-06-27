const https = require('https');

const targetUrl = 'https://www.xbdesign.com/residential/riviera-residential-interior-design/';

const fetchHtml = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
};

async function run() {
    console.log("Fetching Riviera HTML for videos...");
    try {
        const html = await fetchHtml(targetUrl);
        
        // Look for mp4 files
        const mp4Regex = /https:\/\/www\.xbdesign\.com\/[^"'`\s]+\.mp4/g;
        const mp4Matches = [...new Set(html.match(mp4Regex) || [])];
        console.log("MP4 Links found:");
        console.log(mp4Matches.length > 0 ? mp4Matches : "None");
        
        // Look for Vimeo/YouTube
        const vimeoRegex = /https:\/\/player\.vimeo\.com\/video\/[0-9]+/g;
        const vimeoMatches = [...new Set(html.match(vimeoRegex) || [])];
        console.log("\nVimeo Links found:");
        console.log(vimeoMatches.length > 0 ? vimeoMatches : "None");
        
        const ytRegex = /https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+/g;
        const ytMatches = [...new Set(html.match(ytRegex) || [])];
        console.log("\nYouTube Links found:");
        console.log(ytMatches.length > 0 ? ytMatches : "None");

    } catch (e) {
        console.error("Error:", e);
    }
}

run();
