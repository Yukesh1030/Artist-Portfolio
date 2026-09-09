const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'Assets', '1757747758966.jpg');
const outputPath = path.join(__dirname, 'Assets', 'profile.webp');

async function processImage() {
    try {
        console.log(`Processing profile image...`);
        
        const metadata = await sharp(inputPath).metadata();
        let width = metadata.width;
        
        if (width > 800) {
            width = 800; // Smaller width for profile to hit 70-90kb
        }
        
        await sharp(inputPath)
            .resize({ width: width, withoutEnlargement: true })
            .webp({ quality: 80, effort: 6 })
            .toFile(outputPath);
        
        const outStats = fs.statSync(outputPath);
        let kbSize = outStats.size / 1024;
        
        console.log(`- Saved as profile.webp (${kbSize.toFixed(2)} KB)`);
        
        if (kbSize > 90) {
            console.log(`  - Size > 90kb. Re-compressing...`);
            await sharp(inputPath)
                .resize({ width: Math.min(width, 600), withoutEnlargement: true })
                .webp({ quality: 65, effort: 6 })
                .toFile(outputPath);
                
            const finalStats = fs.statSync(outputPath);
            console.log(`  - Final Size: ${(finalStats.size / 1024).toFixed(2)} KB`);
        } else if (kbSize < 70) {
            // If it's too small, we might want to increase quality to hit the 70-90kb range
            console.log(`  - Size < 70kb. Increasing quality...`);
            await sharp(inputPath)
                .resize({ width: metadata.width > 1000 ? 1000 : metadata.width, withoutEnlargement: true })
                .webp({ quality: 95, effort: 6 })
                .toFile(outputPath);
                
            const finalStats = fs.statSync(outputPath);
            console.log(`  - Final Size: ${(finalStats.size / 1024).toFixed(2)} KB`);
        }
        
    } catch (err) {
        console.error(`Error processing image:`, err);
    }
}

processImage();
