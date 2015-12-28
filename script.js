'use strict';

var players = [
        new Player('LCK', '21', 'GK', '1993-08-30', '186', '78', 'https://www.busanipark.com/i_data/player/248_1.jpg'),    
        new Player('LJH', '25', 'FW', '1991-06-24', '187', '76', 'https://www.busanipark.com/i_data/player/260_1.jpg'),    
        new Player('KJK', '19', 'MF', '1997-02-24', '176', '66', 'https://www.busanipark.com/i_data/player/287_1.jpg'),
        new Player('KHJ', '32', 'DF', '1993-12-13', '183', '74', 'https://www.busanipark.com/i_data/player/249_1.jpg')
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

function main() {
    for (var index = 0; index < players.length; index += 1) {
        drawCard('players', index, players[index]);
    }
}

function drawCard(item, cardID, player) {
    var frameID = makeFrameID('card', cardID),
        image = player.image,
        content = '',
        defaultSetting = 'mini-card';

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

    document.getElementById(item).innerHTML += content;
}

function cardClick(card) {
    if (card.className === 'simple-card') {
        card.className = 'mini-card';
    } else if (card.className === 'mini-card') {
        card.className = 'simple-card';
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