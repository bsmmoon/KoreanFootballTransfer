'use strict';

var players = [
        new Player('LCK', '21', 'GK', '1993-08-30', '186', '78', 'https://www.busanipark.com/i_data/player/248_1.jpg'),    
        new Player('LJH', '25', 'FW', '1991-06-24', '187', '76', 'https://www.busanipark.com/i_data/player/260_1.jpg'),    
        new Player('KJK', '19', 'MF', '1997-02-24', '176', '66', 'https://www.busanipark.com/i_data/player/287_1.jpg'),
        new Player('KHJ', '32', 'DF', '1993-12-13', '183', '74', 'https://www.busanipark.com/i_data/player/249_1.jpg')
        ];

var teams = [
        new Team('Busan IPark', 'K League Challenge', 'http://www.kleague.com/images/club/club_b_K06.png'),
        new Team('Jeonbuk Hyundai Motors', 'K League Classic', 'http://www.kleague.com/images/club/club_b_K05.png')
        ];

function Player(name, backnumber, position, dob, height, weight, image) {
    var player = {};
    player.name = name;
    player.backnumber = backnumber;
    player.position = position;
    player.dob = dob;
    player.height = height;
    player.weight = weight;
    player.image = image;
    return player;
}

function Team(name, competition, image) {
    var team = {};
    team.name = name;
    team.competition = competition;
    team.image = image;
    return team;
}

function main() {
    // for (var index = 0; index < players.length; index += 1) {
    //     drawPlayerCard('main-frame', index, players[index]);
    // }
    drawTransferCard();
}

function drawTransferCard() {
    var content = '',
        target = 'main-frame';

    content +=
        tagEditor('div', {
            'class': 'transfer-card',
        }, [
            drawTeamCard('simple-team', teams[0]),
            drawPlayerCard(0, players[1]),
            drawTeamCard('simple-team',teams[1])
        ]);

    document.getElementById(target).innerHTML += content;
}

function drawTeamCard(item, team) {
    var content = '',
        image = team.image;

    content +=
        tagEditor('div', {
            'class': item
        },  [
            tagEditor('img', {
                'src': image,
                'alt': 'HTML5',
                'style': 'max-height: 100%; max-width: 100%;'
            })
        ]);

    return content;
}

function drawPlayerCard(cardID, player) {
    var content = '',
        frameID = makeFrameID('card', cardID),
        image = player.image,
        defaultSetting = 'simple-player-card';

    content += 
        tagEditor('div', {
            'class': defaultSetting,
            'id': frameID
        },  [
            tagEditor('div', {
                'class': 'photo-frame',
            },  [
                tagEditor('img', {
                    'src': image,
                    'alt': 'HTML5',
                    'style': 'max-height: 100%; max-width: 100%;'
                })
            ]),
            tagEditor('div', {
                'class': 'description-frame',
            },  [
                getPlayerProfile(player)
            ]),
            tagEditor('span', {
                'class': 'card-cover',
                'onmousedown': 'cardClick(this.parentNode)'
            })
        ]);

    return content;
}

function cardClick(card) {
    if (card.className === 'simple-player-card') {
        card.className = 'mini-player-card';
    } else if (card.className === 'mini-player-card') {
        card.className = 'simple-player-card';
    }
}

function getPlayerProfile(player) {
    var out = tagEditor('h2', {},  [player.name]);
    out += tagEditor('p', {
        'class': 'description'
    },  [
        function() {
        var detail = '';
        for (var attribute in player) {
            if (attribute !== 'name' &&
                attribute !== 'image') {
                detail += attribute + ': ' + player[attribute];
                detail += '<br>';
            }
        }
        return detail;}()
        ]);
    console.log(out);

    return out;
}

function makeFrameID(htmlclass, htmlid) {
    return htmlclass + '-frame-' + htmlid;
}

function tagEditor(tag, attributes, contents) {
    if (typeof(contents) === 'undefined') {
        contents = [''];
    }

    var out = '<' + tag;
    for (var attribute in attributes) {
        out += ' ' + attribute + '="' + attributes[attribute] +'"';
    }
    out += '>' + contents.join('') + '</' + tag + '>';
    console.log(out);
    return out;
}