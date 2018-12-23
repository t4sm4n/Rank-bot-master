const request = require ('request');
const cheerio = require ('cheerio');

request('https://companion-rlbot.herokuapp.com/index.html', (error, responce, html) => {
    if(!error && responce.statusCode == 200) {
        const $ = cheerio.load(html);
        const siteheading = $('.card-list');
        const text = siteheading.text();
        const output = text.replace(/\s\s+/g, '')

        console.log(output)}})