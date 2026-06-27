const fs = require('fs');
const path = require('path');
const https = require('https');

const urls = [
"https://www.xbdesign.com/wp-content/uploads/2022/12/02-A-Architecture_Solar-House_1920x1080_1L1A0287-HDR-Edit.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/02-A-Architecture_Solar-House_1920x1080_1L1A0557-HDR-Edit-2.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/02-A-Architecture_Solar-House_1920x1080_1L1A0612-HDR-Edit.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/02-A-Architecture_Solar-House_1920x1080_1L1A0842-HDR-Edit.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/02-A-Architecture_Solar-House_1920x1080_1L1A0857-HDR-Edit.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/02-A-Architecture_Solar-House_1920x1080_1L1A0887-HDR-Edit.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/02-A-Architecture_Solar-House_1920x1080_1L1A0897-HDR-Edit.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/02-A-Architecture_Solar-House_1920x1080_1L1A1107-HDR-Edit.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/02-A-Architecture_Solar-House_1920x1080_1L1A1117-HDR-Edit-Edit.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/02-A-Architecture_Solar-House_1920x1080_1L1A1494-HDR-Edit.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/02-A-Architecture_Solar-House_1920x1080_1L1A1534-HDR-Edit.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/02-A-Architecture_Solar-House_1920x1080_1L1A1569-HDR-Edit.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/02-A-Architecture_Solar-House_1920x1080_1L1A1639-HDR-Edit.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/02-A-Architecture_Solar-House_1920x1080_1L1A1649-HDR-Edit.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/02-A-Architecture_Solar-House_1920x1080_1L1A1704-HDR-Edit_2.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/02-A-Architecture_Solar-House_1920x1080_1L1A6508-HDR-Edit.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/02-A-Architecture_Solar-House_1920x1080_1L1A6518-HDR-Pano-Edit.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/02-A-Architecture_Solar-House_1920x1080_1L1A6548-HDR-Edit.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/02-A-Architecture_Solar-House_1920x1080_1L1A6553-HDR-Edit.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/02-A-Architecture_Solar-House_1920x1080_XBD-Emirates-Hills-157-2.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/02-A-Architecture_Solar-House_1920x1080_XBD-Emirates-Hills-157-3.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/02-A-Architecture_Solar-House_1920x1080_XBD-Emirates-Hills-157-30.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/02-A-Architecture_Solar-House_1920x1080_XBD-Emirates-Hills-157-32-2.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/02-A-Architecture_Solar-House_1920x1080_XBD-Emirates-Hills-157-33.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/1L1A0817-HDR-Edit.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/1L1A6543-HDR-Edit.jpg",
"https://www.xbdesign.com/wp-content/uploads/2022/12/XBD-Emirates-Hills-157-36-scaled.jpg"
];

const downloadDir = path.join(__dirname, 'solar_house_images');
if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir);
}

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

async function downloadAll() {
    console.log(`Starting download of ${urls.length} images...`);
    for (const url of urls) {
        const filename = path.basename(url);
        const dest = path.join(downloadDir, filename);
        console.log(`Downloading ${filename}...`);
        try {
            await downloadFile(url, dest);
        } catch (e) {
            console.error(e.message);
        }
    }
    console.log("Done downloading all images.");
}

downloadAll();
