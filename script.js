'use strict';

$(document).ready(function() {

});

var defaultSetting = 'mini';

function main() {
    for (var index = 0; index < 20; index += 1) {
        drawTransferCard();
    }
}

function drawTransferCard() {
    var target = document.getElementById('transfer-stream'),
        div;
    $(target).append(tagEditor('div', { 'class': 'transfer-card  transfer-card--' + defaultSetting, }));
    div = target.lastChild;
    drawDealInfo(div, deals[0]);
    drawTeamCard(div, 'team  team--' + defaultSetting, teams[0]);
    drawPlayerCard(div, 0, players[1]);
    drawTeamCard(div, 'team  team--' + defaultSetting,teams[1]);
    drawSources(div, deals[0]);
}

function drawDealInfo(target, deal) {
    $(target).append(tagEditor('div', { 'class': 'deal-info' }));
    $(target.lastChild).append(function() {
        var detail = '';
        for (var attribute in deal) {
            if (attribute === 'dateAdded' ||
                attribute === 'sources') {
                continue;
            }
            detail += deal[attribute];
            detail += ' / ';
        }
        detail += deal.dateAdded;
        return detail;
    }());
}

function drawSources(target, deal) {
    var sources = deal.sources;
    $(target).append(tagEditor('div', { 'class': 'sources' }));
    $(target.lastChild).append(tagEditor('a', { 'href': sources[0], 'target': '_blank' }));
    $(target.lastChild.lastChild).append('Primary Source');
}

function drawTeamCard(target, item, team) {
    var image = team.image;
    $(target).append(tagEditor('div', { 'class': item }));
    $(target.lastChild).append(tagEditor('img', { 'src': image, 'alt': 'HTML5' }));
}

function drawPlayerCard(target, cardID, player) {
    var frameID = makeFrameID('card', cardID),
        image = player.image,
        div, subdiv;
    $(target).append(tagEditor('div', { 'class': 'player  player--' + defaultSetting, 'id': frameID }));
    div = target.lastChild;

    $(div).append(tagEditor('div', { 'class': 'photo-frame' }));
    subdiv = div.lastChild;
    $(subdiv).append(tagEditor('img', { 'src': image, 'alt': 'HTML5' }));

    $(div).append(tagEditor('div', { 'class': 'description-frame', }));
    subdiv = div.lastChild;
    $(subdiv).append(tagEditor('h2', {}));
    $(subdiv.lastChild).append(player.name);
    $(subdiv).append(tagEditor('div', {}));
    $(subdiv.lastChild).append(function() {
        var detail = '';
        for (var attribute in player) {
            if (attribute === 'name' ||
                attribute === 'image') {
                continue;
            }
            detail += attribute + ': ' + player[attribute];
            detail += '<br>';
        }
        return detail;
    }());

    $(div).append(tagEditor('span', { 'class': 'card-cover', 'onmousedown': 'makeCardSmaller(this.parentNode)' }));
}

function makeCardSmaller(card) {
    var transferCard = card.parentNode,
        teamFrom = card.previousSibling,
        teamTo = card.nextSibling;
    if (card.className === 'player  player--simple') {
        transferCard.className = 'transfer-card  transfer-card--mini';
        card.className = 'player  player--mini';
        teamFrom.className = 'team  team--mini';
        teamTo.className = 'team  team--mini';
    } else if (card.className === 'player  player--mini') {
        transferCard.className = 'transfer-card  transfer-card--simple';
        card.className = 'player  player--simple';
        teamFrom.className = 'team  team--simple';
        teamTo.className = 'team  team--simple';
    }
}

function makeFrameID(htmlclass, htmlid) {
    return htmlclass + '-frame-' + htmlid;
}

function tagEditor(tag, attributes) {
    var out = '<' + tag;
    for (var attribute in attributes) {
        out += ' ' + attribute + '="' + attributes[attribute] +'"';
    }
    out += '></' + tag + '>';
    console.log(out);
    return out;
}

//////////////////////////////////
//  BELOW IS DUMMY FOR TEST     //
//  To be removed later         //
//////////////////////////////////

var players = [
        new Player('이창근', '21', 'GK', '1993-08-30', '186', '78', 'https://www.busanipark.com/i_data/player/248_1.jpg'),
        new Player('이정협', '25', 'FW', '1991-06-24', '187', '76', 'https://www.busanipark.com/i_data/player/260_1.jpg'),
        new Player('김진규', '19', 'MF', '1997-02-24', '176', '66', 'https://www.busanipark.com/i_data/player/287_1.jpg'),
        new Player('구현준', '32', 'DF', '1993-12-13', '183', '74', 'https://www.busanipark.com/i_data/player/249_1.jpg')
        ];

var teams = [
        new Team('Busan IPark', 'K League Challenge', 'http://www.kleague.com/images/club/club_b_K06.png'),
        new Team('Jeonbuk Hyundai Motors', 'K League Classic', 'http://www.kleague.com/images/club/club_b_K05.png')
        ];

var deals = [
        new Deal('rumour', 'transfer', '2B KRW', '2015-12-25', ['http://google.com'])
        ];

function Player(name, backnumber, position, dob, height, weight, image) {
    var player = {};
    player.name = name;
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

function Deal(rumourType, dealType, fee, dateAdded, sources) {
    var deal = {};
    deal.rumourType = rumourType;
    deal.dealType = dealType;
    deal.fee = fee;
    deal.dateAdded = dateAdded;
    deal.sources = sources;
    return deal;
}
