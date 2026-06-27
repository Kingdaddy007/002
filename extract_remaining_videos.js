const https = require('https');

const urls = {
    'AlThuraya': 'https://www.xbdesign.com/residential/althuraya-island/',
    'Kata': 'https://www.xbdesign.com/residential/kata-restaurant/',
    'Rixos': 'https://www.xbdesign.com/residential/rixos-residences-downtown-dubai/'
};

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
    for (const [name, url] of Object.entries(urls)) {
        console.log(`\n--- Fetching videos for ${name} ---`);
        try {
            const html = await fetchHtml(url);
            
            const mp4Regex = /https:\/\/www\.xbdesign\.com\/[^"'`\s]+\.mp4/g;
            const mp4Matches = [...new Set(html.match(mp4Regex) || [])];
            console.log("MP4 Links:");
            console.log(mp4Matches.length > 0 ? mp4Matches : "None");
            
            const vimeoRegex = /https:\/\/player\.vimeo\.com\/video\/[0-9]+/g;
            const vimeoMatches = [...new Set(html.match(vimeoRegex) || [])];
            console.log("Vimeo Links:");
            console.log(vimeoMatches.length > 0 ? vimeoMatches : "None");

            const ytRegex = /https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+/g;
            const ytMatches = [...new Set(html.match(ytRegex) || [])];
            console.log("YouTube Links:");
            console.log(ytMatches.length > 0 ? ytMatches : "None");

        } catch (e) {
            console.error(`Error fetching ${name}:`, e.message);
        }
    }
}

run();
