const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'Assets');
const outputDir = path.join(__dirname, 'Assets', 'optimized');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

async function processImages() {
    const files = fs.readdirSync(inputDir);
    
    for (const file of files) {
        if (file === 'optimized') continue;
        
        const inputPath = path.join(inputDir, file);
        const stats = fs.statSync(inputPath);
        
        if (!stats.isFile()) continue;
        
        const parsed = path.parse(file);
        const outputPath = path.join(outputDir, `${parsed.name}.webp`);
        
        try {
            console.log(`Processing ${file}...`);
            
            const metadata = await sharp(inputPath).metadata();
            let width = metadata.width;
            
            if (width > 1920) {
                width = 1920;
            }
            
            await sharp(inputPath)
                .resize({ width: width, withoutEnlargement: true })
                .webp({ quality: 60, effort: 6 })
                .toFile(outputPath);
            
            const outStats = fs.statSync(outputPath);
            const kbSize = outStats.size / 1024;
            
            console.log(`- Saved as ${parsed.name}.webp (${kbSize.toFixed(2)} KB)`);
            
            if (kbSize > 100) {
                console.log(`  - Size > 100kb. Re-compressing...`);
                await sharp(inputPath)
                    .resize({ width: Math.min(width, 1280), withoutEnlargement: true })
                    .webp({ quality: 45, effort: 6 })
                    .toFile(outputPath);
                    
                const finalStats = fs.statSync(outputPath);
                console.log(`  - Final Size: ${(finalStats.size / 1024).toFixed(2)} KB`);
            }
            
        } catch (err) {
            console.error(`Error processing ${file}:`, err);
        }
    }
    console.log("Done processing images.");
}

processImages();
