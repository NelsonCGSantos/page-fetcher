const needle = require('needle');
const fs = require('fs');


const args = process.argv.slice(2);
const url = args[0];
const filePath = args[1];

const downloadFile = (url, filePath) => {
  needle.get(url, (err, response) => {
    if (err) {
      console.error('Error downloading file:', err.message);
      return;
    }
    
    // Check if response is successful
    if (response.statusCode !== 200) {
      console.error('Failed to download file. Status code:', response.statusCode);
      return;
    }
    
    // Write the file to local path
    fs.writeFile(filePath, response.body, (err) => {
      if (err) {
        console.error('Error saving file:', err.message);
        return;
      }
      // Get file size in bytes
      const fileSize = response.body.length;
      console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
    });
  });
};

// Start the download process
downloadFile(url, filePath);
