const Discord = require('discord.js');
const Discordclient = new Discord.Client();
const Request = require ('request');
const cheerio = require ('cheerio');
const steam = require ('steamidconvert')
const zany = require("zany")
var {encode,decode} = zany(zany.block.EGYPTIAN_HIEROGLYPHS)
var message = "𓀇𓍢𓀀𓀔𓄓𓀀𓀂𓆻𓀀𓀂𓏱𓀀𓀪𓁠𓀀𓀉𓂃𓀀𓀒𓃒𓀀𓀟𓌓𓀀𓊱𓀀𓀍𓍭𓀀𓀲𓏓𓀀𓀊𓉒𓀀𓀺𓁑𓀀𓀉𓅹𓀀𓀧𓃾𓀀𓀃𓂤𓀀𓀬𓏵𓀀𓀈𓋮𓀀𓀟𓊫𓀀𓀳𓋱𓀀𓀂𓉑𓀀𓀇𓋢𓀀𓀡𓈆𓀀𓀩𓅵𓀀𓈹𓀀𓀂𓂡𓀀𓀄𓀑𓀀𓀆𓁑𓀀𓀌𓉱𓀀𓀊𓆹𓀀𓀚𓁸𓀀𓐑𓀀𓅁𓀀𓀅𓉁𓀀𓀎𓃓𓀀𓀮𓎓𓀀𓀌𓇲𓀀𓀙𓆖𓀀𓀥𓍑𓀀𓀁"
var reverse = decode(message)
Discordclient.login(reverse);
console.log('ready to go')

//Getting rank details and applying Role.
//Message Detection
Discordclient.on('message', msg => {
    msg.delete()
    if(msg.content.startsWith('!verify')) {
        console.log('verify')
        var steaminputter = msg.content
        var steamgrabber = steaminputter.replace('!verify', '')
        var steamid64 = steamgrabber.replace(/\s\s+/g, '');
        console.log(steamid64)
        
        
        //Converting from Vanity to Steamid64
        if(steamid64.startsWith(' https://steamcommunity.com/id/')) {
            var steamreplaced = steamid64.replace(' https://steamcommunity.com/id/', '')
            var steamreplaced2 = steamreplaced.replace('/', '')
            console.log(steamreplaced2)
            var steam = require ('steamidconvert') ('081304DB6A7A5010ED250AB53A18B7DA')
            steam.convertVanity(steamreplaced2, function(err, res) {
            
            
                //Getting Stats From Https://rocketleague.tracker.network
                Request('https://rocketleague.tracker.network/profile/mmr/steam/' + res, (error, responce, html) => {
            if(!error && responce.statusCode == 200) {
                const $ = cheerio.load(html);
                var siteheading = $('.card-list');
                var text = siteheading.text();
                var output = text.replace(/\s\s+/g, '');
                if(output.startsWith('Un-Ranked')) {
                    var last = output.slice(50, 57)
                } else {
                    var last = output.slice(36, 44)
                }
                var maybe = last.replace('Ran', '').replace('Ra', '').replace('R', '').replace('um', '').replace('v2', '').replace(/\s\s+/g, '');
                
                if( maybe.startsWith(2)) {
                    var final = maybe.substr(1)
                    console.log('it worked man')
                    
                } else {
                    var final = maybe
                };
                
                console.log(final);              
                
                // Giving a role based on elo.
                var user = msg.member
            if(final < 303.9) {
                let Bronze = msg.guild.roles.find(r => r.name === "Bronze")
                user.addRole(Bronze)
                var rank = ('Bronze')
                console.log(rank)
                };
            if(final < 484.9 && final > 304) {
                let Silver = msg.guild.roles.find(r => r.name === "Silver")
                user.addRole(Silver)
                var rank = ('Silver')
                console.log(rank)
                };
            if(final < 680.9 && final > 485) {
                let Gold = msg.guild.roles.find(r => r.name === "Gold")
                user.addRole(Gold)
                var rank = ('Gold')
                console.log(rank)
                };
            if(final < 920.9 && final > 681) {
                let Platinum = msg.guild.roles.find(r => r.name === "Platinum")
                user.addRole(Platinum)
                var rank = ('Platinum')
                console.log(rank)
                };
            if(final < 1180.9 && final > 921) {
                var Diamond = msg.guild.roles.find(r => r.name === "Diamond")
                user.addRole(Diamond)
                var rank = ('Diamond')
                console.log(rank)
                };
            if(final < 1500.9 && final > 1181) {
                let Champion = msg.guild.roles.find(r => r.name === "Champion")
                user.addRole(Champion)
                var rank = ('Champion')
                console.log(rank)
                };
            if(final > 1500) {
                let GrandChampion = msg.guild.roles.find(r => r.name === "GrandChampion")
                user.addRole(GrandChampion)
                var rank = ('Grand Champion')
                console.log(rank)
                };
                
            }})})}}}) 
