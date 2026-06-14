const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new'
  });
  const page = await browser.newPage();
  const fileUrl = 'file:///' + path.resolve(__dirname, 'Esakkiappan_Resume_single_column.html').replace(/\\/g, '/');
  
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });
  
  await page.pdf({
    path: 'Esakkiappan_Resume_single_column.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0',
      bottom: '0',
      left: '0',
      right: '0'
    }
  });

  await browser.close();
  console.log('PDF generated successfully!');
})();
