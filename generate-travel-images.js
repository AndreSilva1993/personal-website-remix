import fs from 'fs';
import sharp from 'sharp';

const originalImagesFolder = 'travel-images';
const outputImagesFolder = 'public/images/travels';

const travelNames = fs
  .readdirSync(originalImagesFolder)
  .filter((travelName) => !travelName.startsWith('.'));

travelNames.forEach((travelName) => {
  fs.readdirSync(`${originalImagesFolder}/${travelName}`)
    .filter((imageName) => !imageName.startsWith('.'))
    .forEach(async (imageName) => {
      const fullPath = `${originalImagesFolder}/${travelName}/${imageName}`;
      const outputFullPath = `${outputImagesFolder}/${travelName}/${imageName.split('.')[0]}.webp`;

      await sharp(fullPath).resize(1000).toFile(outputFullPath);
    });
});
