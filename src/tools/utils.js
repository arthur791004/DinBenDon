import fs from 'fs';

export const saveData = (filename, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, JSON.stringify(data, null, 2), 'utf8', (err) => {
      if (err) {
        return reject(`Save ${filename} failed: ${err}`);
      }

      return resolve(`Save ${filename} success`);
    });
  })
};