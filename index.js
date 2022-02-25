const Discord = require('discord.js');	// discord.js 라이브러리 호출
const client = new Discord.Client();	// Client 객체 생성
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs'); // 디스코드 봇이 파일을 저장하고 읽는 모듈 -파일 시스템

const moment = require('moment'); // 날짜 라이브러리
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");


// discord 봇이 실행될 때 딱 한 번 실행할 코드를 적는 부분
client.once('ready', () => {
    console.log('Ready!!!');
});

// 봇과 서버를 연결해주는 부분
// client.login("ODkxOTczMjAwMDg5NjA4MjAy.YVGIxg.gK-U1OJxaCrIbV5O7vi_4sm_ww0");
client.login(process.env.TOKEN);

// 디스코드 서버에 작성되는 모든 메시지를 수신하는 리스너
// client.on('message', message => {
//     const content = message.content;
//     // substring을 이용해서 맨 앞자리가 !전투정보인지 확인
//     // (명령어는 항상 맨 앞에 쓴다는 강제성 필요!)
//     console.log(content.substring(0, 5) === '!정보');		// 명령어 확인
//     console.log(content.substring(6, content.length).trim());	// <내용>
//     // 메시지 내용중 랜덤한 어느 부분에 !전투정보가 들어있는 경우
//     console.log(content.includes("!정보"));			// 명령어 확인
//     console.log(content.replace("!정보", "").trim());		// <내용>
//     // !전투정보 <내용>으로 명령어와 내용 사이에 공백을 이용해서 
//     // split을 한 후 공백을 기준으로 앞 쪽의 데이터가 !전투정보인지 확인
//     // (사용자가 공백을 입력하지 않으면 에러가 발생할 수 있음)
//     console.log(content.split(" ")[0] === '!정보');		// 명령어 확인
//     console.log(content.split(" ")[1]);
// });

client.on('message', async (message) => {
    const content = message.content;
    const contentArr = content.split(" ");
    const command = contentArr[0];
    const randomCommand = contentArr[0];
    const nickname = contentArr[1];
    const nickname2 = contentArr[2];
    const nickname3 = contentArr[3];
    const nickError = contentArr[4];

    // 세공 확률
    const per = [25, 35, 45, 55, 65, 75];

    const id = message.author.id; // 디스코드 유저의 고유 아이디 ( 12335325 이런식 )
    const name = message.author.username; // 디스코드 유저의 닉네임
    const filePath = `./data/${id}.json` // 유저 정보가 만들어지는 파일

    const encodeNickName = encodeURI(nickname);

    if (command === '!예상클골') {

        const encodeNickName = encodeURI(nickname);
        let html = await axios.get(`https://lostark.game.onstove.com/Profile/Character/${encodeNickName}`);
        let $ = cheerio.load(html.data);
        // console.log($(".lui-tab__menu").children("a").text());
        // console.log($("div#profile-collection div"));

        const userName = $("span.profile-character-info__name").text();
        const server = $('span.profile-character-info__server').attr('title') ? $('span.profile-character-info__server').attr('title').slice(1) : undefined;

        if (server === undefined || nickname === undefined) {
            embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle('캐릭터 정보가 없습니다')
                .setDescription(`다시 한번 확인해 주세요`)
                .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
            message.channel.send(embed)
            return;
        }
        const job = $("img.profile-character-info__img").attr("alt");
        const icon = $('img.profile-character-info__img').attr('src');
        const itemLevel = $('div.level-info2__expedition span:nth-of-type(2)').text();

        const stringLevel = itemLevel.slice(3);
        const removeLevel = stringLevel.replace(',', '');
        const resultLevel = Math.floor(removeLevel);

        // 아이템레벨까지 개발
        console.log(resultLevel)



        embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setThumbnail(`${icon}`)
            .addField('닉네임', '```css\n' + userName + ' [' + server + ']' + '\n```')
            .addField('아이템레벨', '```cs\n' + itemLevel + '\n```', false)
            .addField('직업', '```fix\n' + job + '\n```', false)
            .addField('레이드', '```fix\n' + job + '\n```', false)
            // .addFields(
            //     { name: '\u200B', value: '\u200B' },
            //     { name: '아이템 레벨', value: '```css\n' + itemLevel + '\n```', inline: true },
            //     { name: '레이드', value: '```fix\n' + itemLevel + '\n```', inline: true },
            // )
            .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
        message.channel.send(embed)


    }

    if (command === '!계산기') {
        embed = new Discord.MessageEmbed()
            .setColor('BLACK')
            .setTitle('Icepeng Calc')
            .setURL('https://loa.icepeng.com/')
            .setDescription('[최적화 계산기](https://loa.icepeng.com/)')
            .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
        message.channel.send(embed)
        return;
    }
    if (command === '!클골') {
        embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('레이드 클리어골드')
            .setImage('https://i.imgur.com/aWcGXCC.png')
            .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
        message.channel.send(embed)
        return;
    }

    if (command === '!시너지') {
        embed = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setTitle('시너지')
            .setImage('https://i.imgur.com/2BC72ka.jpeg')
            .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
        message.channel.send(embed)
        return;
    }

    if (command === '!기능' || command === '!?') {
        embed = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .addField('!뽑기 닉네임1 닉네임2 닉네임3 ···', '```css\n' + ' 원하는 인원만큼 입력 가능하고 그중에 한명을 뽑습니다 ' + '\n```')
            .addField('!정보 닉네임', '```css\n' + ' 로스트아크 캐릭터 정보를 가져옵니다 ' + '\n```')
            .addField('!시너지', '```css\n' + ' 직업의 시너지 이미지를 가져옵니다 ' + '\n```')
            .addField('!숙제 & !오늘', '```css\n' + ' 오늘의 캘린더 일정을 확인합니다 ' + '\n```')
            .addField('!내일숙제 & !내일', '```css\n' + ' 다음 날 캘린더 일정을 확인합니다 ' + '\n```')
            .addField('!돌깎기 각인1 각인2 각인3', '```css\n' + ' 돌 시뮬레이터 [ 채팅러쉬 주의 ] \n 돌 생성 후 아래 명령어를 이용해서 돌을 깎습니다 \n [ !1 : 1번각인 ] [ !2 : 2번각인 ] [ !3 : 3번각인 ] \n !돌깎기 종료 : 명령어를 이용해서 시뮬레이터를 끝낼 수 있습니다' + '\n```')
            .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
        message.channel.send(embed)
        return;
    }
    if (randomCommand === '!뽑기') {
        // 1명만 입력 했을 시
        if (nickname2 === undefined) {
            embed = new Discord.MessageEmbed()
                .setColor('RED')
                .addField('에러', '```css\n' + '혼자서 놀려고?' + '\n```')
                .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
            message.channel.send(embed)
            return;
        }
        // 3명이상 입력 했을 시
        const ranNum = Math.random();
        const ranNum2 = Math.floor((ranNum * (contentArr.length - 1)) + 1);

        message.channel.send('과연 누가 뽑힐까요? 두구두구두구~~')
        const result = contentArr[ranNum2];

        setTimeout(() => {
            embed = new Discord.MessageEmbed()
                .setColor('BLACK')
                .addField('뽑기', '```css\n' + '경 [ ' + result + ' ] 축' + '\n```')
                .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
            message.channel.send(embed)
        }, 3000)
        return;
    }
    if (command === '!정보') {

        const encodeNickName = encodeURI(nickname);
        let html = await axios.get(`https://lostark.game.onstove.com/Profile/Character/${encodeNickName}`);
        let $ = cheerio.load(html.data);
        // console.log($(".lui-tab__menu").children("a").text());
        // console.log($("div#profile-collection div"));

        const userName = $("span.profile-character-info__name").text();
        const server = $('span.profile-character-info__server').attr('title') ? $('span.profile-character-info__server').attr('title').slice(1) : undefined;

        if (server === undefined || nickname === undefined) {
            embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle('캐릭터 정보가 없습니다')
                .setDescription(`다시 한번 확인해 주세요`)
                .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
            message.channel.send(embed)
            return;
        }

        const level = $("span.profile-character-info__lv").text();
        const job = $("img.profile-character-info__img").attr("alt");
        const icon = $('img.profile-character-info__img').attr('src');
        const itemLevel = $('div.level-info2__expedition span:nth-of-type(2)').text();
        const guild = $('div.game-info__guild span:nth-of-type(2)').text();

        const ability = $('div.profile-ability-engrave div ul li span');
        const ability1 = $(ability[0]).text();
        const ability2 = $(ability[1]).text();
        const ability3 = $(ability[2]).text();
        const ability4 = $(ability[3]).text();
        const ability5 = $(ability[4]).text();
        const ability6 = $(ability[5]).text();
        const ability7 = $(ability[6]).text();
        const ability8 = $(ability[7]).text();



        const card = $('ul.card-effect li div.card-effect__dsc').text();
        const card1 = $('ul.card-effect li:nth-of-type(1) div.card-effect__dsc').text();
        const card2 = $('ul.card-effect li:nth-of-type(2) div.card-effect__dsc').text();
        const card3 = $('ul.card-effect li:nth-of-type(3) div.card-effect__dsc').text();
        const card4 = $('ul.card-effect li:nth-of-type(4) div.card-effect__dsc').text();
        const card5 = $('ul.card-effect li:nth-of-type(5) div.card-effect__dsc').text();
        const card6 = $('ul.card-effect li:nth-of-type(6) div.card-effect__dsc').text();
        const card7 = $('ul.card-effect li:nth-of-type(7) div.card-effect__dsc').text();
        const card8 = $('ul.card-effect li:nth-of-type(8) div.card-effect__dsc').text();

        const critical = $('div.profile-ability-battle ul li:nth-of-type(1) span:nth-of-type(2)').text();
        const specialized = $('div.profile-ability-battle ul li:nth-of-type(2) span:nth-of-type(2)').text();
        const speedy = $('div.profile-ability-battle ul li:nth-of-type(4) span:nth-of-type(2)').text();
        const oppression = $('div.profile-ability-battle ul li:nth-of-type(3) span:nth-of-type(2)').text();
        const endure = $('div.profile-ability-battle ul li:nth-of-type(5) span:nth-of-type(2)').text();
        const skilled = $('div.profile-ability-battle ul li:nth-of-type(6) span:nth-of-type(2)').text();


        // 어빌리티가 있다면
        if (ability.length !== 0) {

            // 어빌리티가 있고 카드까지 있다면
            if (card.length !== 0) {
                // await message.channel.send(`닉네임 : ${userName} 레벨 : ${level}  직업 : ${job} 아이템 레벨 : ${itemLevel} 길드 : ${guild}`);

                embed = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setThumbnail(`${icon}`)
                    .addField('닉네임', '```css\n' + userName + ' [' + server + ']' + '\n```')
                    .addField('레벨', '```cs\n' + level + '\n```', false)
                    .addField('직업', '```fix\n' + job + '\n```', false)
                    .addFields(
                        { name: '\u200B', value: '\u200B' },
                        { name: '아이템 레벨', value: '```css\n' + itemLevel + '\n```', inline: true },
                        { name: '길드', value: '```fix\n' + guild + '\n```', inline: true },
                        { name: '전투 특성', value: '```css\n치명 : ' + critical + '　 특화 : ' + specialized + '　 신속 : ' + speedy + ' \n제압 : ' + oppression + '　 인내 : ' + endure + '　 숙련 : ' + skilled + '```', inline: false },
                        { name: '각인 효과', value: '```cs\n' + ability1 + '\n' + ability2 + '\n' + ability3 + '\n' + ability4 + '\n' + ability5 + '\n' + ability6 + '\n' + ability7 + '\n' + ability8 + '\n```', inline: false },
                        { name: '카드 효과', value: '```cs\n' + card1 + '\n' + card2 + '\n' + card3 + '\n' + card4 + '\n' + card5 + '\n' + card6 + '\n' + card7 + '\n' + card8 + '\n```', inline: false },
                    )
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else {
                // 어빌리티가 있지만 카드가 없다면
                embed = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setThumbnail(`${icon}`)
                    .addField('닉네임', '```css\n' + userName + ' [' + server + ']' + '\n```')
                    .addField('레벨', '```cs\n' + level + '\n```', false)
                    .addField('직업', '```fix\n' + job + '\n```', false)
                    .addFields(
                        { name: '\u200B', value: '\u200B' },
                        { name: '아이템 레벨', value: '```css\n' + itemLevel + '\n```', inline: true },
                        { name: '길드', value: '```fix\n' + guild + '\n```', inline: true },
                        { name: '전투 특성', value: '```css\n치명 : ' + critical + '　 특화 : ' + specialized + '　 신속 : ' + speedy + ' \n제압 : ' + oppression + '　 인내 : ' + endure + '　 숙련 : ' + skilled + '```', inline: false },
                        { name: '각인 효과', value: '```cs\n' + ability1 + '\n' + ability2 + '\n' + ability3 + '\n' + ability4 + '\n' + ability5 + '\n' + ability6 + '\n' + ability7 + '\n' + ability8 + '\n```', inline: false },
                        { name: '카드 효과', value: '```css\n' + '[ 카드를 장착하고 있지 않습니다 ]' + '\n```', inline: false },
                    )
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            }
        } else if (card.length !== 0) {
            // 어빌리티가 없지만 카드가 있다면
            embed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setThumbnail(`${icon}`)
                .addField('닉네임', '```css\n' + userName + ' [' + server + ']' + '\n```')
                .addField('레벨', '```cs\n' + level + '\n```', false)
                .addField('직업', '```fix\n' + job + '\n```', false)
                .addFields(
                    { name: '\u200B', value: '\u200B' },
                    { name: '아이템 레벨', value: '```css\n' + itemLevel + '\n```', inline: true },
                    { name: '길드', value: '```fix\n' + guild + '\n```', inline: true },
                    { name: '전투 특성', value: '```css\n치명 : ' + critical + '　 특화 : ' + specialized + '　 신속 : ' + speedy + ' \n제압 : ' + oppression + '　 인내 : ' + endure + '　 숙련 : ' + skilled + '```', inline: false },
                    { name: '각인 효과', value: '```css\n' + '[ 각인 효과가 없습니다 ]' + '\n```', inline: false },
                    { name: '카드 효과', value: '```cs\n' + card1 + '\n' + card2 + '\n' + card3 + '\n' + card4 + '\n' + card5 + '\n' + card6 + '\n' + card7 + '\n' + card8 + '\n```', inline: false },
                )
                .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
            message.channel.send(embed)
        } else {
            // 어빌리티가 없고 카드도 없다면
            embed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setThumbnail(`${icon}`)
                .addField('닉네임', '```css\n' + userName + ' [' + server + ']' + '\n```')
                .addField('레벨', '```cs\n' + level + '\n```', false)
                .addField('직업', '```fix\n' + job + '\n```', false)
                .addFields(
                    { name: '\u200B', value: '\u200B' },
                    { name: '아이템 레벨', value: '```css\n' + itemLevel + '\n```', inline: true },
                    { name: '길드', value: '```fix\n' + guild + '\n```', inline: true },
                    { name: '전투 특성', value: '```css\n치명 : ' + critical + '　 특화 : ' + specialized + '　 신속 : ' + speedy + ' \n제압 : ' + oppression + '　 인내 : ' + endure + '　 숙련 : ' + skilled + '```', inline: false },
                    { name: '각인 효과', value: '```css\n' + '[ 각인 효과가 없습니다 ]' + '\n```', inline: false },
                    { name: '카드 효과', value: '```css\n' + '[ 카드를 장착하고 있지 않습니다 ]' + '\n```', inline: false },
                )
                .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
            message.channel.send(embed)
        }
    }
    if (command === '!내실') {
        const encodeNickName = encodeURI(nickname);
        let html2 = await axios.get(`https://www.mgx.kr/lostark/character/?character_name=${encodeNickName}`);
        let $2 = cheerio.load(html2.data);

        // 섬의마음
        let collectIslandNum = $2(".collecting_detail_box div:nth-of-type(1) .collecting_active_section div:nth-of-type(1) .collecting_active_count").text();
        let collectIslandRes = collectIslandNum.split('/');
        collectIslandRes[0] = Number(collectIslandRes[0]);
        collectIslandRes[1] = Number(collectIslandRes[1]);

        // 오르페우스의 별
        let collectStarNum = $2(".collecting_detail_box div:nth-of-type(2) .collecting_active_section div:nth-of-type(1) .collecting_active_count").text();
        let collectStarRes = collectStarNum.split('/');
        collectStarRes[0] = Number(collectStarRes[0]);
        collectStarRes[1] = Number(collectStarRes[1]);

        // 거인의 심장
        let collectGiantNum = $2(".collecting_detail_box div:nth-of-type(3) .collecting_active_section div:nth-of-type(1) .collecting_active_count").text();
        let collectGiantRes = collectGiantNum.split('/');
        collectGiantRes[0] = Number(collectGiantRes[0]);
        collectGiantRes[1] = Number(collectGiantRes[1]);

        // 위대한 미술품
        let collectArtNum = $2(".collecting_detail_box div:nth-of-type(4) .collecting_active_section div:nth-of-type(1) .collecting_active_count").text();
        let collectArtRes = collectArtNum.split('/');
        collectArtRes[0] = Number(collectArtRes[0]);
        collectArtRes[1] = Number(collectArtRes[1]);

        // 모코코 씨앗
        let collectMococoNum = $2(".collecting_detail_box div:nth-of-type(5) div:nth-of-type(2) .collecting_active_top .collecting_active_count").text();
        let collectMococoRes = collectMococoNum.split('/');
        collectMococoRes[0] = Number(collectMococoRes[0]);
        collectMococoRes[1] = Number(collectMococoRes[1]);

        // 향해 모험물
        let collectSeaNum = $2(".collecting_detail_box div:nth-of-type(6) .collecting_active_section div:nth-of-type(1) .collecting_active_count").text();
        let collectSeaRes = collectSeaNum.split('/');
        collectSeaRes[0] = Number(collectSeaRes[0]);
        collectSeaRes[1] = Number(collectSeaRes[1]);

        // 이그네아의 징표
        let collectIgNum = $2(".collecting_detail_box div:nth-of-type(7) .collecting_active_section div:nth-of-type(1) .collecting_active_count").text();
        let collectIgRes = collectIgNum.split('/');
        collectIgRes[0] = Number(collectIgRes[0]);
        collectIgRes[1] = Number(collectIgRes[1]);

        // 세계수의 잎
        let collectLeafNum = $2(".collecting_detail_box div:nth-of-type(9) .collecting_active_section div:nth-of-type(1) .collecting_active_count").text();
        let collectLeafRes = collectLeafNum.split('/');
        collectLeafRes[0] = Number(collectLeafRes[0]);
        collectLeafRes[1] = Number(collectLeafRes[1]);

        if (nickname === undefined) {
            embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle('캐릭터 정보가 없습니다')
                .setDescription(`다시 한번 확인해 주세요`)
                .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
            message.channel.send(embed)
            return;
        }
        if (Number.isNaN(Number(collectIslandRes[1]))) {
            embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle('캐릭터 정보가 없습니다')
                .setDescription(`다시 한번 확인해 주세요`)
                .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
            message.channel.send(embed)
            return;
        }
        embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('수집형 포인트')
            .addField(`${nickname}`, '```cs\n'
                + `섬의 마음 : ${collectIslandRes[0]} / ${collectIslandRes[1]}`
                + '\n' + `오르페우스의 별 : ${collectStarRes[0]} / ${collectStarRes[1]}`
                + '\n' + `거인의 심장 : ${collectGiantRes[0]} / ${collectGiantRes[1]}`
                + '\n' + `위대한 미술품 : ${collectArtRes[0]} / ${collectArtRes[1]}`
                + '\n' + `모코코 씨앗 : ${collectMococoRes[0]} / ${collectMococoRes[1]}`
                + '\n' + `향해 모험물 : ${collectSeaRes[0]} / ${collectSeaRes[1]}`
                + '\n' + `이그네아의 징표 : ${collectIgRes[0]} / ${collectIgRes[1]}`
                + '\n' + `세계수의 잎 : ${collectLeafRes[0]} / ${collectLeafRes[1]}`
                + '```', false)
            .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
        message.channel.send(embed)
        return;
    }
    if (command === '!돌깎기') {
        if (message.author.bot) return; // 무한반복 방지 코드
        if (message.author.id === client.user.id) return; // 로그인한 봇으로 채팅 입력 방지
        const nickname = contentArr[1];
        const nickname2 = contentArr[2];
        const nickname3 = contentArr[3];
        //TODO 파일이 없다면 파일을 생성
        !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null; // 파일이 없다면
        const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        if (user.id) {
            if (nickname === '종료') {
                fs.unlinkSync(filePath)
                embed = new Discord.MessageEmbed()
                    .addField(`${name}님`, `돌깎기를 종료하셨습니다`)
                    .setColor('WHITE')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
                return;
            }
        }

        if (!user.id) {
            if (nickname === undefined || nickname2 === undefined || nickname3 === undefined) {
                embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .addField(`${name}님!`, `각인 이름을 제대로 입력하셨는지 확인해주세요`)
                    .addField(`사용법`, `!돌깎기 각인1 각인2 각인3`)
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
                return;
            }
        }

        let saveUser = {}; // 유저 정보를 업데이트 할 변수
        // ◆ Ⅹ ◇

        if (user.id) { // 파일에 유저정보가 있다면?
            let atherAb1 = user.oneAb.join(' '); // 배열 , 제거해서 보여주기
            let atherAb2 = user.twoAb.join(' ');
            let atherAb3 = user.thrAb.join(' ');

            embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                .addField(`돌깎는 유저··`, `${name}`)
                .setColor('WHITE')
                .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                .addField(`${user.nickname2}`, '```css\n' + `${atherAb2}` + '\n```')
                .addField(`\u200B`, '\u200B')
                .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb3} ]` + '\n```')
                .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
            message.channel.send(embed)
            saveUser = user;
        } else { // 파일에 유저정보가 없다면?
            saveUser = {
                // 여기에 갱신할 유저정보를 넣기
                id: id,
                name: name,
                nickname: nickname,
                nickname2: nickname2,
                nickname3: nickname3,
                countOne: 10,
                oneAb: ['◇', '◇', '◇', '◇', '◇', '◇', '◇', '◇', '◇', '◇'],
                countTwo: 10,
                twoAb: ['◇', '◇', '◇', '◇', '◇', '◇', '◇', '◇', '◇', '◇'],
                countThr: 10,
                thrAb: ['◇', '◇', '◇', '◇', '◇', '◇', '◇', '◇', '◇', '◇'],
                perNum: 5,
            }
            embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .addField(`확률`, '```css\n' + `75%` + '\n```')
                .addField(`돌깎는 유저··`, `${name}`)
                .setColor('WHITE')
                .addField(`${nickname}`, '```css\n' + `◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇` + '\n```')
                .addField(`${nickname2}`, '```css\n' + `◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇` + '\n```')
                .addField(`\u200B`, '\u200B')
                .addField(`${nickname3}`, '```css\n' + `[ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ]` + '\n```')
                .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
            message.channel.send(embed)
        }
        fs.writeFileSync(filePath, JSON.stringify(saveUser));
        return;
    }
    if (command === '!돌깎기종료') {
        fs.unlinkSync(filePath)
        embed = new Discord.MessageEmbed()
            .addField(`${name}님`, `돌깎기를 종료하셨습니다`)
            .setColor('WHITE')
            .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
        message.channel.send(embed)
    }
    if (command === '!오늘' || command === '!숙제') {
        // 0:일, 1:월, 2:화, 3:수, 4:목, 5:금, 6:토
        const week = moment().day();
        const days = ["일", "월", "화", "수", "목", "금", "토"]
        const work = [
            "필드보스\n카오스 게이트\n[ 점령 이벤트 ]",
            "카오스 게이트",
            "필드보스\n유령선",
            "로요일 없음!",
            "유령선\n카오스 게이트",
            "필드보스",
            "유령선\n카오스 게이트\n[ 점령 이벤트 ]",
        ]

        embed = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .addField(`${moment().format('a') === "am"
                ? moment().format('hh') <= 5
                    ? week === 0
                        ? days[6]
                        : days[week - 1]
                    : days[week]
                : days[week]}요일 :exclamation:새벽엔 전 요일로 표시\n${moment().format('a') === "pm" ? '오후' : '오전'} ${moment().format('hh')}시 ${moment().format('mm')}분\n\n:bell:`,
                '```css\n' + `${moment().format('a') === "am"
                    ? moment().format('hh') <= 5
                        ? week === 0
                            ? work[6]
                            : work[week - 1]
                        : work[week]
                    : work[week]}` + '\n```')
            .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
        message.channel.send(embed)
        return;
    }
    if (command === '!내일' || command === '!내일숙제') {
        // 0:일, 1:월, 2:화, 3:수, 4:목, 5:금, 6:토
        const week = moment().day();
        const days = ["월", "화", "수", "목", "금", "토", "일"]
        const work = [
            "카오스 게이트",
            "필드보스\n유령선",
            "로요일 없음!",
            "유령선\n카오스 게이트",
            "필드보스",
            "유령선\n카오스 게이트\n[ 점령 이벤트 ]",
            "필드보스\n카오스 게이트\n[ 점령 이벤트 ]",
        ]

        console.log(week, days[week]);
        // "필드보스\n카오스 게이트\n[ 점령 이벤트 ]",      일
        // "카오스 게이트",                                 월
        // "필드보스\n유령선",                              화
        // "로요일 없음!",                                  수
        // "유령선\n카오스 게이트",                         목
        // "필드보스",                                      금
        // "유령선\n카오스 게이트\n[ 점령 이벤트 ]",        토

        embed = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .addField(`${moment().format('a') === "am"
                ? moment().format('hh') <= 5
                    ? week === 0
                        ? days[6]
                        : days[week - 1]
                    : days[week]
                : days[week]}요일 숙제`,
                '```css\n' + `${moment().format('a') === "am"
                    ? moment().format('hh') <= 5
                        ? week === 0
                            ? work[6]
                            : work[week - 1]
                        : work[week]
                    : work[week]}` + '\n```')
            .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
        message.channel.send(embed)
        return;
    }

    if (command === '!1') {
        let saveUser = {};

        // 정보 불러오기
        !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null; // 파일이 없다면
        const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        if (!user.id) {
            embed = new Discord.MessageEmbed()
                .setColor('RED')
                .addField(`${name}님!`, `돌부터 생성해 주세요`)
                .addField(`사용법`, `!돌깎기 각인1 각인2 각인3`)
                .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
            message.channel.send(embed)
            return;
        }

        if (user.countOne === 0) {
            embed = new Discord.MessageEmbed()
                .setColor('RED')
                .addField(`에러`, `더이상 1번 각인을 깎을 수 없습니다`)
                .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
            message.channel.send(embed)
            return;
        }

        // 101은 미포함
        const ranNum = Math.floor(Math.random() * 101);

        // 랜덤번호가 < 확률숫자보다 낮은 경우 성공
        if (ranNum < per[user.perNum]) {
            if (user.countOne === 10) {

                // 데이터를 불러오고
                let oneAb_0 = user.oneAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[0].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.oneAb[0] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.oneAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.twoAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${result}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countOne === 9) {

                // 데이터를 불러오고
                let oneAb_0 = user.oneAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[1].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.oneAb[1] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.oneAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.twoAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${result}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countOne === 8) {

                // 데이터를 불러오고
                let oneAb_0 = user.oneAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[2].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.oneAb[2] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.oneAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.twoAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${result}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countOne === 7) {

                // 데이터를 불러오고
                let oneAb_0 = user.oneAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[3].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.oneAb[3] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.oneAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.twoAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${result}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countOne === 6) {

                // 데이터를 불러오고
                let oneAb_0 = user.oneAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[4].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.oneAb[4] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.oneAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.twoAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${result}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countOne === 5) {

                // 데이터를 불러오고
                let oneAb_0 = user.oneAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[5].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.oneAb[5] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.oneAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.twoAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${result}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countOne === 4) {

                // 데이터를 불러오고
                let oneAb_0 = user.oneAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[6].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.oneAb[6] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.oneAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.twoAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${result}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countOne === 3) {

                // 데이터를 불러오고
                let oneAb_0 = user.oneAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[7].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.oneAb[7] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.oneAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.twoAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${result}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countOne === 2) {

                // 데이터를 불러오고
                let oneAb_0 = user.oneAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[8].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.oneAb[8] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.oneAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.twoAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${result}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countOne === 1) {

                // 데이터를 불러오고
                let oneAb_0 = user.oneAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[9].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.oneAb[9] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.oneAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.twoAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${result}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            }

            user.countOne--; // 돌깎기 횟수 줄임

            // perNum이 0 아래로 내려가는거 방지
            if (user.perNum <= 0) {
                user.perNum = 0;
            } else {
                user.perNum--;
            }

        } else {
            if (user.countOne === 10) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.oneAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[0].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.oneAb[0] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.oneAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.twoAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${result}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countOne === 9) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.oneAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[1].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.oneAb[1] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.oneAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.twoAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${result}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countOne === 8) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.oneAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[2].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.oneAb[2] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.oneAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.twoAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${result}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countOne === 7) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.oneAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[3].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.oneAb[3] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.oneAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.twoAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${result}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countOne === 6) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.oneAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[4].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.oneAb[4] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.oneAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.twoAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${result}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countOne === 5) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.oneAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[5].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.oneAb[5] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.oneAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.twoAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${result}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countOne === 4) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.oneAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[6].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.oneAb[6] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.oneAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.twoAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${result}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countOne === 3) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.oneAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[7].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.oneAb[7] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.oneAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.twoAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${result}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countOne === 2) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.oneAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[8].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.oneAb[8] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.oneAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.twoAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${result}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countOne === 1) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.oneAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[9].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.oneAb[9] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.oneAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.twoAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${result}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            }

            user.countOne--; // 돌깎기 횟수 줄임

        }
        saveUser = user;
        fs.writeFileSync(filePath, JSON.stringify(saveUser));
        return;
    }
    if (command === '!2') {
        let saveUser = {};

        // 정보 불러오기
        !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null; // 파일이 없다면
        const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        if (!user.id) {
            embed = new Discord.MessageEmbed()
                .setColor('RED')
                .addField(`${name}님!`, `돌부터 생성해 주세요`)
                .addField(`사용법`, `!돌깎기 각인1 각인2 각인3`)
                .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
            message.channel.send(embed)
            return;
        }

        if (user.countTwo === 0) {
            embed = new Discord.MessageEmbed()
                .setColor('RED')
                .addField(`에러`, `더이상 2번 각인을 깎을 수 없습니다`)
                .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
            message.channel.send(embed)
            return;
        }
        // 101은 미포함
        const ranNum = Math.floor(Math.random() * 101);

        // 랜덤번호가 < 확률숫자보다 낮은 경우 성공
        if (ranNum < per[user.perNum]) {
            if (user.countTwo === 10) {

                // 데이터를 불러오고
                let oneAb_0 = user.twoAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[0].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.twoAb[0] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.twoAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${result}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countTwo === 9) {

                // 데이터를 불러오고
                let oneAb_0 = user.twoAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[1].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.twoAb[1] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.twoAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${result}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countTwo === 8) {

                // 데이터를 불러오고
                let oneAb_0 = user.twoAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[2].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.twoAb[2] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.twoAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${result}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countTwo === 7) {

                // 데이터를 불러오고
                let oneAb_0 = user.twoAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[3].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.twoAb[3] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.twoAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${result}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countTwo === 6) {

                // 데이터를 불러오고
                let oneAb_0 = user.twoAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[4].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.twoAb[4] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.twoAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${result}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countTwo === 5) {

                // 데이터를 불러오고
                let oneAb_0 = user.twoAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[5].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.twoAb[5] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.twoAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${result}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countTwo === 4) {

                // 데이터를 불러오고
                let oneAb_0 = user.twoAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[6].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.twoAb[6] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.twoAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${result}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countTwo === 3) {

                // 데이터를 불러오고
                let oneAb_0 = user.twoAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[7].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.twoAb[7] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.twoAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${result}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countTwo === 2) {

                // 데이터를 불러오고
                let oneAb_0 = user.twoAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[8].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.twoAb[8] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.twoAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${result}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countTwo === 1) {

                // 데이터를 불러오고
                let oneAb_0 = user.twoAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[9].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.twoAb[9] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.twoAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${result}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            }

            user.countTwo--; // 돌깎기 횟수 줄임

            // perNum이 0 아래로 내려가는거 방지
            if (user.perNum <= 0) {
                user.perNum = 0;
            } else {
                user.perNum--;
            }

        } else {
            if (user.countTwo === 10) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.twoAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[0].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.twoAb[0] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.twoAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${result}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countTwo === 9) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.twoAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[1].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.twoAb[1] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.twoAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${result}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countTwo === 8) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.twoAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[2].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.twoAb[2] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.twoAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${result}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countTwo === 7) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.twoAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[3].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.twoAb[3] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.twoAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${result}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countTwo === 6) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.twoAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[4].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.twoAb[4] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.twoAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${result}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countTwo === 5) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.twoAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[5].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.twoAb[5] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.twoAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${result}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countTwo === 4) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.twoAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[6].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.twoAb[6] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.twoAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${result}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countTwo === 3) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.twoAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[7].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.twoAb[7] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.twoAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${result}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countTwo === 2) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.twoAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[8].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.twoAb[8] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.twoAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${result}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countTwo === 1) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.twoAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[9].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.twoAb[9] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.twoAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.thrAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${result}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${atherAb2} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            }

            user.countTwo--; // 돌깎기 횟수 줄임

        }

        saveUser = user;
        fs.writeFileSync(filePath, JSON.stringify(saveUser));
        return;
    }
    if (command === '!3') {
        let saveUser = {};

        // 정보 불러오기
        !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null; // 파일이 없다면
        const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        if (!user.id) {
            embed = new Discord.MessageEmbed()
                .setColor('RED')
                .addField(`${name}님!`, `돌부터 생성해 주세요`)
                .addField(`사용법`, `!돌깎기 각인1 각인2 각인3`)
                .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
            message.channel.send(embed)
            return;
        }

        if (user.countThr === 0) {
            embed = new Discord.MessageEmbed()
                .setColor('RED')
                .addField(`에러`, `더이상 3번 각인을 깎을 수 없습니다`)
                .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
            message.channel.send(embed)
            return;
        }
        // 101은 미포함
        const ranNum = Math.floor(Math.random() * 101);

        // 랜덤번호가 < 확률숫자보다 낮은 경우 성공
        if (ranNum < per[user.perNum]) {
            if (user.countThr === 10) {

                // 데이터를 불러오고
                let oneAb_0 = user.thrAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[0].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.thrAb[0] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.thrAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.twoAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`확률 : ${per[user.perNum - 1]}%`)
                    .addField(`돌깎는중··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb2}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${result} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countThr === 9) {

                // 데이터를 불러오고
                let oneAb_0 = user.thrAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[1].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.thrAb[1] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.thrAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.twoAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb2}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${result} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countThr === 8) {

                // 데이터를 불러오고
                let oneAb_0 = user.thrAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[2].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.thrAb[2] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.thrAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.twoAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb2}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${result} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countThr === 7) {

                // 데이터를 불러오고
                let oneAb_0 = user.thrAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[3].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.thrAb[3] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.thrAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.twoAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb2}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${result} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countThr === 6) {

                // 데이터를 불러오고
                let oneAb_0 = user.thrAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[4].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.thrAb[4] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.thrAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.twoAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb2}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${result} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countThr === 5) {

                // 데이터를 불러오고
                let oneAb_0 = user.thrAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[5].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.thrAb[5] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.thrAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.twoAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb2}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${result} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countThr === 4) {

                // 데이터를 불러오고
                let oneAb_0 = user.thrAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[6].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.thrAb[6] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.thrAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.twoAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb2}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${result} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countThr === 3) {

                // 데이터를 불러오고
                let oneAb_0 = user.thrAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[7].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.thrAb[7] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.thrAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.twoAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb2}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${result} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countThr === 2) {

                // 데이터를 불러오고
                let oneAb_0 = user.thrAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[8].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.thrAb[8] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.thrAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.twoAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb2}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${result} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countThr === 1) {

                // 데이터를 불러오고
                let oneAb_0 = user.thrAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[9].replace('◇', '◆');

                // 다시 데이터에 넣어준다
                user.thrAb[9] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.thrAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.twoAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum - 1]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb2}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${result} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            }

            user.countThr--; // 돌깎기 횟수 줄임

            // perNum이 0 아래로 내려가는거 방지
            if (user.perNum <= 0) {
                user.perNum = 0;
            } else {
                user.perNum--;
            }

        } else {
            if (user.countThr === 10) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.thrAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[0].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.thrAb[0] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.thrAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.twoAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb2}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${result} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countThr === 9) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.thrAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[1].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.thrAb[1] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.thrAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.twoAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb2}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${result} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countThr === 8) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.thrAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[2].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.thrAb[2] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.thrAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.twoAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb2}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${result} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countThr === 7) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.thrAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[3].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.thrAb[3] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.thrAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.twoAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb2}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${result} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countThr === 6) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.thrAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[4].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.thrAb[4] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.thrAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.twoAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb2}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${result} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countThr === 5) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.thrAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[5].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.thrAb[5] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.thrAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.twoAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb2}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${result} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countThr === 4) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.thrAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[6].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.thrAb[6] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.thrAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.twoAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb2}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${result} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countThr === 3) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.thrAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[7].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.thrAb[7] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.thrAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.twoAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb2}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${result} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countThr === 2) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.thrAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[8].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.thrAb[8] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.thrAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.twoAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb2}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${result} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            } else if (user.countThr === 1) {

                // perNum이 5 위로 올라가는거 방지
                if (user.perNum >= 5) {
                    user.perNum = 5;
                } else {
                    user.perNum++;
                }

                // 데이터를 불러오고
                let oneAb_0 = user.thrAb;

                // 0번째 배열을 성공했으니 변경해주고
                let test = oneAb_0[9].replace('◇', 'Ⅹ');

                // 다시 데이터에 넣어준다
                user.thrAb[9] = test;

                let test1 = oneAb_0.join(' ');   // , 제거하고 
                let test2 = test1.split(' ');    // 배열로 다시 만들어서
                user.thrAb = test2;              // 데이터에 넣기
                let result = oneAb_0.join(' '); // 배열 , 제거해서 보여주기

                let atherAb1 = user.oneAb.join(' ');
                let atherAb2 = user.twoAb.join(' ');

                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .addField(`확률`, '```css\n' + `${per[user.perNum]}%` + '\n```')
                    .addField(`돌깎는 유저··`, `${name}`)
                    .setColor('WHITE')
                    .addField(`${user.nickname}`, '```css\n' + `${atherAb1}` + '\n```')
                    .addField(`${user.nickname2}`, '```css\n' + `${atherAb2}` + '\n```')
                    .addField(`\u200B`, '\u200B')
                    .addField(`${user.nickname3}`, '```css\n' + `[ ${result} ]` + '\n```')
                    .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
                message.channel.send(embed)
            }

            user.countThr--; // 돌깎기 횟수 줄임

        }

        saveUser = user;
        fs.writeFileSync(filePath, JSON.stringify(saveUser));
        return;
    }
});