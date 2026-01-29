import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const imagesDir = path.join(projectRoot, "public", "images");

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getMtimeMs(filePath) {
  const stat = await fs.stat(filePath);
  return stat.mtimeMs;
}

async function shouldRegenerate(srcPath, outPath) {
  if (!(await fileExists(outPath))) return true;
  return (await getMtimeMs(srcPath)) > (await getMtimeMs(outPath));
}

async function generateProfileVariants() {
  const sourceFile = process.argv[2] || "myProfile.jpeg";
  const src = path.join(imagesDir, sourceFile);

  const baseName = path.basename(sourceFile, path.extname(sourceFile));

  const targets = [
    {
      out: path.join(imagesDir, `${baseName}-200.webp`),
      width: 200,
      format: "webp",
    },
    {
      out: path.join(imagesDir, `${baseName}-400.webp`),
      width: 400,
      format: "webp",
    },
    {
      out: path.join(imagesDir, `${baseName}-200.jpeg`),
      width: 200,
      format: "jpeg",
    },
    {
      out: path.join(imagesDir, `${baseName}-400.jpeg`),
      width: 400,
      format: "jpeg",
    },
  ];

  const srcExists = await fileExists(src);
  if (!srcExists) {
    console.error(`Source image not found: ${src}`);
    console.error(`Usage: node optimize-images.mjs [source-image-name]`);
    process.exit(1);
  }

  for (const target of targets) {
    if (!(await shouldRegenerate(src, target.out))) continue;

    const pipeline = sharp(src).resize({
      width: target.width,
      withoutEnlargement: true,
    });

    if (target.format === "webp") {
      await pipeline.webp({ quality: 80 }).toFile(target.out);
    } else {
      await pipeline.jpeg({ quality: 80, mozjpeg: true }).toFile(target.out);
    }

    // eslint-disable-next-line no-console
    console.log(`Wrote ${path.relative(projectRoot, target.out)}`);
  }
}

await generateProfileVariants();
