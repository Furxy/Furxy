const Discord = require("discord.js");
const tokenfile = require("./tokenfile.json");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client({disableEveryone: true});

let botname = "Furxy Bot"

bot.on("ready", async() => {
    console.log(`${bot.user.username} elindult!`)

    let státuszok = [
        "Prefix: %",
        "Furxy Bot :D",
    ]

    setInterval(function() {
        let status = státuszok[Math.floor(Math.random()* státuszok.length)]

        bot.user.setActivity(status, {type: "WATCHING"})
    }, 5000)
})

bot.on("message", async message => {
    let MessageArray = message.content.split(" ");
    let cmd = MessageArray[0];
    let args = MessageArray.slice(1);
    let prefix = botconfig.prefix;

    if(cmd === `hello`){
        message.channel.send(`Üdvözöllek! ${message.author.username}!`);
    }


    if(cmd === `${prefix}elérhetőségek`){
        let elérhetőségekEmbed = new Discord.MessageEmbed()
        .setColor("#98AA12")
        .setAuthor(message.author.username)
        .setTitle("elérhetőségek!")
        .addField("Itt:", "Discord: ᴍʀܔ𝓛𝓸𝓻𝓲𝓲𝓓❤乂#1269,\n Fejlesztő: OdaxHUN#8903\n Github: https://github.com/Xawionn")
        .setImage(message.guild.iconURL())
        .setDescription(`Prefix: \`${prefix}\``)
        .setFooter(`${botname} | ${message.createdTimestamp}`)

        message.channel.send(elérhetőségekEmbed)
    }

    if(cmd === `${prefix}say`){
        let szöveg = args.join(" ");

        if(szöveg) {
            let dumaEmbed = new Discord.MessageEmbed()
        .setColor("#98AA12")
        .setAuthor(message.author.username)
        .addField("say:", szöveg)
        .setFooter(`${botname} | ${message.createdAt}`)
    
        message.channel.send(dumaEmbed)
        } else {
            message.reply("írj szöveget!")
        }
    }

    /////////////////////////////////
    //// LOGIKAI OPERÁTOROK TIPP ////
    //////////////////////////////////////////////////////////
    //                                                      //
    //   || vagy , PL: if(X=1 || X=3)                       //
    //                                                      //
    //   && és , PL: if(X=5 && Y=3)                         //
    //                                                      //
    //   = sima egyenlő jel , PL: if(5=5)                   //
    //   ==  egyenlő jel , PL: if(X==5)                     //
    //   >= nagyobb vagy egyenő , PL: if(X >= 3)            //
    //   <= kisebb vagy egyenlő , PL: if(X <= 3)            //
    //   ! tagadás , PL if(X != 2)                          //
    //                                                      //
    //////////////////////////////////////////////////////////

    if(cmd === `${prefix}kick`){
        let kick_user = message.mentions.members.first();
        if(args[0] && kick_user){

            if(args[1]){

                let KickEmbed = new Discord.MessageEmbed()
                .setTitle("KICK")
                .setColor("RANDOM")
                .setDescription(`**Kickelte:** ${message.author.tag}\n**Kickelve lett:** ${kick_user.user.tag}\n**Kick indoka:** ${args.slice(1).join(" ")}`)

            message.channel.send(KickEmbed);

                kick_user.kick(args.slice(1).join(" "));

            } else {
            let parancsEmbed = new Discord.MessageEmbed()
            .setTitle("Parancs használata:")
            .addField(`\`${prefix}kick <@név> [indok]\``, "˘˘˘")
            .setColor("RANDOM")
            .setDescription("HIBA: Kérlek adj meg egy indokot!!")

            message.channel.send(parancsEmbed);
            }

        } else {
            let parancsEmbed = new Discord.MessageEmbed()
            .setTitle("Parancs használata:")
            .addField(`\`${prefix}kick <@név> [indok]\``, "˘˘˘")
            .setColor("RANDOM")
            .setDescription("HIBA: Kérlek említs meg egy embert!")

            message.channel.send(parancsEmbed);

        }
    }

    if(cmd === `${prefix}ban`){
        let ban_user = message.mentions.members.first();
        if(args[0] && ban_user){

            if(args[1]){

                let BanEmbed = new Discord.MessageEmbed()
                .setTitle("BAN")
                .setColor("RANDOM")
                .setDescription(`**Banolta:** ${message.author.tag}\n**Banolva lett:** ${kick_user.user.tag}\n**Ban indoka:** ${args.slice(1).join(" ")}`)

            message.channel.send(KickEmbed);

                ban_user.ban(args.slice(1).join(" "));

            } else {
            let parancsEmbed = new Discord.MessageEmbed()
            .setTitle("Parancs használata:")
            .addField(`\`${prefix}ban <@név> [indok]\``, "˘˘˘")
            .setColor("RANDOM")
            .setDescription("HIBA: Kérlek adj meg egy indokot!!")

            message.channel.send(parancsEmbed);
            }

        } else {
            let parancsEmbed = new Discord.MessageEmbed()
            .setTitle("Parancs használata:")
            .addField(`\`${prefix}ban <@név> [indok]\``, "˘˘˘")
            .setColor("RANDOM")
            .setDescription("HIBA: Kérlek említs meg egy embert!")

            message.channel.send(parancsEmbed);

        }
    }

    if(cmd === `${prefix}giveaway`){
        const messageArray = message.content.split(" ");
        if(!message.member.hasPermission("KICK_MEMBERS" || "BAN_MEMBERS")) return message.channel.send("Ehhez a parancshoz nincs jogod!")

        let tárgy = " ";
        let idő = " ";
        let winnerCount = " ";

        for (let i = 1; i < args.length; i++){
            tárgy += (args[i] + " ")
            console.log(tárgy)
        }

        idő = args[0];

    if(!idő){
        return message.reply("Kérlek adj meg egy idő intervallumot! pl: 100s, 5h, 2d")
    }
    if(!tárgy){
        return message.reply("Kérlek add meg a nyereményjáték tárgyát!")
    }

    var Gembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Nyereményjáték!!!!")
    .setDescription(`**${tárgy}**`)
    .addField("`Időtartam:`", ms(ms(idő), {long: true}), true)
    .setFooter("A jelentkezéshe reagálj ezzel: 🎉")
    var embedSend = await message.channel.send(Gembed);
    embedSend.react("🎉");

    setTimeout(async() => {
        try{
            const peopleReactedBOT =  await embedSend.reactions.cache.get("🎉").users.fetch();
            var peopleReacted = peopleReactedBOT.array().filter(u => u.id !== bot.user.id);
        }catch(e){
            return message.channel.send(`Hiba törtét a **${tárgy}** sorsolása során! Hiba: `+"`"+e+"`")
        }
        var winner;

        if(peopleReacted.length <= 0){
            return message.channel.send("Senki nem jelentkezett a nyereményjátékra! :C")
        } else {
            var index = Math.floor(Math.random() * peopleReacted.length);
            winner = peopleReacted[index]
        }

        if(!winner) {
            message.channel.send("Hiba történt a sorsolás során!")
        } else {
            message.channel.send(`🎉🎉🎉🎉 **${winner.toString()}** megnyerte ezt: **${tárgy}**`);
        }
    }, ms(idő))
    }



})




bot.login(tokenfile.token);
