const request = require ('request');
const cheerio = require ('cheerio');
var steamid64 = ('76561198261707754')
request('https://rocketleague.tracker.network/profile/mmr/steam/' + steamid64, (error, responce, html) => {
    if(!error && responce.statusCode == 200) {
        const $ = cheerio.load(html);
        const siteheading = $('.card-list');
        const text = siteheading.text();
        const output = text.replace(/\s\s+/g, '')
        var final = output.slice(50, 54)
        if(final < 150 ) {
            var final = output.slice(50, 55)
        }
        console.log(final);
        

        

        

        

    }
});

