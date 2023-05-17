function hello() {
    var yourage = prompt("what is your birth yaer?");
    var ageinday = (2021 - yourage) * 365;
    var h1 = document.createElement("h1");
    var textarea = document.createTextNode(" you are " + ageinday + " days old. ");
    h1.setAttribute('id', 'ageinday');
    h1.appendChild(textarea);
    document.getElementById("display").appendChild(h1);
    document.getElementById("display").style.color = "red";
    console.log(ageinday);
}
function del() {
    document.getElementById("ageinday").remove();
}
function generate() {
    var catimage = document.createElement('img');
    var dis = document.getElementById("create");
    catimage.src = "https://cdn2.thecatapi.com/images/aea.gif";

    dis.appendChild(catimage);

}

function winner(userchoice) {
    var botchoice = choose(botrandom());

    console.log(botchoice);
    var botchoice, yourchoice;
    yourchoice = userchoice.id;
    var won = whowins(yourchoice, botchoice);
    console.log(won);
    storemessage = message(won);
    console.log(storemessage);
    frontend(userchoice.id, botchoice, storemessage);
}

function botrandom() {
    return (Math.floor(Math.random() * 3));
}

function choose(number) {
    return ["rock", "paper", "scissor"][number];
}

function whowins(userchoice, botchoice) {
    var dictionay = {
        "rock": { "rock": 0.5, "paper": 0, "scissor": 1 },
        "paper": { "rock": 1, "paper": 0.5, "scissor": 0 },
        "scissor": { "rock": 0, "paper": 1, "scissor": 0.5 }
    };
    var yourscore = dictionay[userchoice][botchoice];
    var botscore = dictionay[botchoice][userchoice];
    return [yourscore, botscore];
}
function message([yourscore, botscore]) {
    if (yourscore === 0) {
        return { 'message': 'you lost', 'color': 'red' };
    }
    else if (yourscore === 1) {
        return { 'message': 'you won', 'color': 'green' };
    }
    else {
        return { 'message': 'its a draw', 'color': 'yellow' };
    }

}
function frontend(yourimagechoice, botimagechoice, message) {
    var imagedata = {
        "rock": document.getElementById("rock").src,
        "paper": document.getElementById("paper").src,
        "scissor": document.getElementById("scissor").src
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humandiv = document.createElement("div");
    var botdiv = document.createElement("div");
    var messagediv = document.createElement("div");

    humandiv.innerHTML = "<img src='" + imagedata[yourimagechoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px blue;'>"

    messagediv.innerHTML = "<h1 style='color:" + message['color'] + ";  + font-size:60px; padding: 30px; '>" + message['message'] + "</h1>"

    botdiv.innerHTML = "<img src='" + imagedata[botimagechoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px red;'>"

    document.getElementById('game').appendChild(humandiv);

    document.getElementById('game').appendChild(messagediv);

    document.getElementById('game').appendChild(botdiv);
}

// document.querySelector('#removeButton').addEventListener('click', remove);

function remove() {
    document.location.reload();
}

var getallbuttons = document.getElementsByTagName('button');
// console.log(getallbuttons);

var copyAllButtons = [];
for (let i = 0; i < getallbuttons.length; i++) {
    copyAllButtons.push(getallbuttons[i].classList[1]);
}
// console.log(copyAllButtons);



function change(colour) {
    if (colour.value === 'red') {
        changered();
    }
    else if (colour.value === 'green') {
        changegreen();
    }
    else if (colour.value === 'reset') {
        changereset();
    }
    if (colour.value === 'random') {
        changerandom();
    }
}
function changered() {
    for (let i = 0; i < getallbuttons.length; i++) {
        getallbuttons[i].classList.remove(getallbuttons[i].classList[1]);
        getallbuttons[i].classList.add('btn-danger');
    }
}
function changegreen() {
    for (let i = 0; i < getallbuttons.length; i++) {
        getallbuttons[i].classList.remove(getallbuttons[i].classList[1]);
        getallbuttons[i].classList.add('btn-success');
    }
}
function changereset() {
    for (let i = 0; i < getallbuttons.length; i++) {
        getallbuttons[i].classList.remove(getallbuttons[i].classList[1]);
        getallbuttons[i].classList.add(copyAllButtons[i]);
    }
}
function changerandom() {
    var choices = ['btn-primary', 'btn-danger', 'btn-warning', 'btn-success']
    for (let i = 0; i < getallbuttons.length; i++) {
        getallbuttons[i].classList.remove(getallbuttons[i].classList[1]);
        getallbuttons[i].classList.add(choices[Math.floor(Math.random() * 3)]);
    }
}

let blackjackgame = {
    'you': { 'div': '#your_box', 'yourscore': '#your_result', 'score': 0 },
    'dealer': { 'div': '#dealer_box', 'yourscore': '#dealer_result', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'Q', 'K'],
    'cardsnumber': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'Q': 10, 'J': 10, 'A': [1, 11], 'K': 10, },
    'wins': 0,
    'loss': 0,
    'draws': 0,
    'isstand': false,
    'turnsover': false
};

const YOU = blackjackgame['you'];
const DEALER = blackjackgame['dealer'];


document.querySelector('#btn-hit').addEventListener('click', hitbutton);
const hitsound = new Audio('sounds/swish.m4a');
const winsound = new Audio('sounds/cash.mp3');
const lostsound = new Audio('sounds/aww.mp3');

document.querySelector('#btndeal').addEventListener('click', dealbutton);

document.querySelector('#btnstand').addEventListener('click', dealerlogic);


function hitbutton() {
    if (blackjackgame['isstand'] === false) {
        var card = randomcards();
        popcards(YOU, card);
        addcards(YOU, card);
        showscore(YOU);
       
    }
}

function popcards(player, card) {
    if (player['score'] <= 21) {
        let cardimage = document.createElement('img');
        cardimage.src = `images/${card}.png`;
        cardimage.style.height = "150px";
        cardimage.style.padding = "5px";
        document.querySelector(player['div']).appendChild(cardimage);
        hitsound.play();
    }
}

function dealbutton() {
    if (blackjackgame['turnsover'] === true) {
        blackjackgame['isstand'] = false;
        var yourimagelist = document.querySelector(YOU['div']).querySelectorAll('img');
        var dealerimagelist = document.querySelector(DEALER['div']).querySelectorAll('img');
        for (let i = 0; i < yourimagelist.length; i++) {
            yourimagelist[i].remove();
        }
        for (let i = 0; i < dealerimagelist.length; i++) {
            dealerimagelist[i].remove();
        }
        document.querySelector(YOU['yourscore']).textContent = 0;
        document.querySelector(YOU['yourscore']).style.color = "white";
        document.querySelector(DEALER['yourscore']).textContent = 0;
        document.querySelector(DEALER['yourscore']).style.color = "white";
        document.querySelector('#results').textContent = 'lets play';
        document.querySelector('#results').style.color = 'black';

        blackjackgame['turnsover'] = true

        YOU['score'] = 0;
        DEALER['score'] = 0;
    }
}

function addcards(player, card) {
    if (card === 'A') {
        if (player['score'] + blackjackgame['cardsnumber'][card][1] <= 21) {
            player['score'] += blackjackgame['cardsnumber'][card][1];
        }
        else {
            player['score'] += blackjackgame['cardsnumber'][card][0];
        }
    } else { player['score'] += blackjackgame['cardsnumber'][card]; }
}

function randomcards() {
    var random = Math.floor(Math.random() * 13);
    return blackjackgame['cards'][random];
}

function showscore(player) {
    if (player['score'] > 21) {
        document.querySelector(player['yourscore']).textContent = "bust!!";
        document.querySelector(player['yourscore']).style.color = 'red';
    } else {
        document.querySelector(player['yourscore']).textContent = (player['score']);
    }
}

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

async function dealerlogic(){
    blackjackgame['isstand'] = true;
    while(DEALER['score']<16){
        let card = randomcards();
        popcards(DEALER,card);
        addcards(DEALER,card);
        showscore(DEALER);
        await sleep(500);
    }
    blackjackgame['turnsover'] = true;
    let winner = gamescore();
    showresult(winner);
}




function gamescore() {
    let winner;
    
        if (YOU['score'] <= 21) {
            if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
                
                blackjackgame['wins']++;
                winner = YOU;
                
            }
            else if (YOU['score'] < DEALER['score']) {

                
                blackjackgame['loss']++;
                winner = DEALER;

            }
            else if (YOU['score'] === DEALER['score']) {

                
                blackjackgame['draws']++;
                
            }
        }
        else if (YOU['score'] > 21 && DEALER['score'] > 21) {

            
            blackjackgame['draws']++;

            

        }
        else if (YOU['score'] > 21 && DEALER['score'] <= 21) {

           
            
            blackjackgame['loss']++;
            winner = DEALER;

        }
        return winner;
    }

    function showresult(winner){
        let messagee,messagecolour;
        if(blackjackgame['turnsover'] === true){
            if(winner === YOU){
                document.querySelector('#wins').textContent = blackjackgame['wins'];
                messagee = 'you won!';
                messagecolour = 'green';
                winsound.play();
            }
            else if(winner === DEALER){
                document.querySelector('#losses').textContent = blackjackgame['loss'];
                messagee = 'you lost!';
                messagecolour = 'red';
                lostsound.play();
            }
            else{
                document.querySelector('#draws').textContent = blackjackgame['draws'];
                messagee = 'you tied!';
                messagecolour = 'pink';
                
            }
            document.querySelector('#results').textContent = messagee;
            document.querySelector('#results').style.color = messagecolour;

        }

    }

