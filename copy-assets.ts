import * as fs from 'fs';
import * as path from 'path';

const sourceDirs = ['views', 'public'];
const destDir = 'dist';

// Ensure dist directory exists
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

sourceDirs.forEach(sourceDir => {
    const sourcePath = path.join(process.cwd(), sourceDir);
    const destPath = path.join(process.cwd(), destDir, sourceDir);

    if (fs.existsSync(sourcePath)) {
        console.log(`Copying ${sourcePath} to ${destPath}`);
        fs.cpSync(sourcePath, destPath, { recursive: true, force: true });
        console.log(`Successfully copied ${sourceDir}`);
    } else {
        console.warn(`Source directory not found: ${sourcePath}`);
    }
});

console.log('Asset copying complete.');
