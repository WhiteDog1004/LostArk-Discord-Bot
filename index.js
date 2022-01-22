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
// client.login("ODkxOTczMjAwMDg5NjA4MjAy.YVGIxg.r1Cpj1YD1q6ooylooM8GiY-wfMo");
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

    // const getHtml = async () => {
    //     try {
    //         return await axios.get(`https://lostark.game.onstove.com/Profile/Character/${encodeNickName}`);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    // getHtml()
    //     .then(html => {
    //         const $ = cheerio.load(html.data);
    //         const test1 = $('href[#lui-tab1-1]').text();
    //         console.log(test1);
    //     })                                                         수집품 어떻게 가져와야?
    // setInterval(function () {
    //     if (moment().format('mm') === "35") {
    //         embed = new Discord.MessageEmbed()
    //             .setColor('RED')
    //             .addField(`${name}님!`, `테스트`)
    //             .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
    //         message.channel.send(embed)
    //         return;
    //     }
    // }, 60000)

    if (command === '!기능' || command === '!?') {
        embed = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .addField('!뽑기 닉네임1 닉네임2 닉네임3', '```css\n' + ' 최대 3명까지 입력 가능하고 그 중에 하나를 뽑습니다 ' + '\n```')
            .addField('!정보 닉네임', '```css\n' + ' 로스트아크 캐릭터 정보를 가져옵니다 ' + '\n```')
            .addField('!돌깎기 각인1 각인2 각인3', '```css\n' + ' 돌 시뮬레이터 [ 채팅러쉬 주의 ] \n 돌 생성 후 아래 명령어를 이용해서 돌을 깎습니다 \n [ !1 : 1번각인 ] [ !2 : 2번각인 ] [ !3 : 3번각인 ] \n !돌깎기 종료 : 명령어를 이용해서 시뮬레이터를 끝낼 수 있습니다' + '\n```')
            .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
        message.channel.send(embed)
        return;
    }
    if (randomCommand === '!뽑기') {
        // 4명 이상 입력 했을 시
        if (nickError !== undefined) {
            embed = new Discord.MessageEmbed()
                .setColor('RED')
                .addField('에러', '```css\n' + '최대 3명까지 입력 가능합니다 ' + '\n```')
                .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
            message.channel.send(embed)
            return;
        }
        // 1명만 입력 했을 시
        if (nickname2 === undefined) {
            embed = new Discord.MessageEmbed()
                .setColor('RED')
                .addField('에러', '```css\n' + '혼자서 놀려고?' + '\n```')
                .setFooter('제작 : WhiteDog', 'https://i.imgur.com/bdt7JQz.gif');
            message.channel.send(embed)
            return;
        }

        // 2명 입력 했을 시
        if (nickname3 === undefined) {
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

        // 3명 입력 했을 시
        if (nickError === undefined) {
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
    }
    if (command === '!정보') {

        const encodeNickName = encodeURI(nickname);
        let html = await axios.get(`https://lostark.game.onstove.com/Profile/Character/${encodeNickName}`);
        let $ = cheerio.load(html.data);
        // console.log($(".lui-tab__menu").children("a").text());
        // console.log($("div#profile-collection div"));

        const userName = $("span.profile-character-info__name").text();
        const server = $('span.profile-character-info__server').attr('title').slice(1);

        if (server === undefined) {
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
                        : days[week]
                    : days[week]
                : days[week]}요일 :exclamation:새벽엔 전 요일로 표시\n${moment().format('a') === "pm" ? '오후' : '오전'} ${moment().format('hh')}시 ${moment().format('mm')}분\n\n:bell:`,
                '```css\n' + `${moment().format('a') === "am"
                    ? moment().format('hh') <= 5
                        ? week === 0
                            ? work[week]
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