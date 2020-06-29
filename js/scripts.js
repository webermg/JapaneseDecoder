
import hData from "./hiragana.js";
import kData from "./katakana.js";
import decode from "./decoder.js";

let dict;
const requestURL = 'jmdict-eng-common-3.0.1/jmdict-eng-common-3.0.1.json';

//put these in respective files
const hSpecial = ["っ",{
	"ゃ": true,
	"ゅ": true,
"ょ": true}, "ー"];
const kSpecial = ["ッ",{
	"ャ": true,
	"ュ": true,
	"ョ": true,
	"ェ": true,
	"ィ": true,
	"ゥ": true,
	"ァ": true,
"ォ": true}, "ー"];

const title = document.getElementById("maintitle");

const getNewButton = document.getElementById("getnew");
//const showKanaButton = document.getElementById("showhidekana");
const checkButton = document.getElementById("checker");

const kanjiField = document.getElementById("kanji-field");
const kanaField = document.getElementById("kana-field");
const answerField = document.getElementById("answer-field");
const entryField = document.getElementById("entry-field");
const defField = document.getElementById("def-field");

let index = 0;
let romaji;

const getNewButtonPress = () => {
	//reset two entry fields
	clearFields();
	
	//generate new random index on all words
	index = getNewIndex("words");
	
	//get new word and set kanji and kana fields
	const word = getWord(index);
	setKanjiField(word[0]);
	setKanaField(word[1]);
	
	//set romaji
	romaji = hData[word[1][0]] ? decode(word[1],hData,hSpecial) : decode(word[1],kData,kSpecial);
	
	//get and set eng definition
	const def = getDef(index);
	setDef(def);
}

const clearFields = () => {
	answerField.innerHTML = "";
	entryField.value = "";
}

const getNewIndex = (item) => {
	return Math.floor(Math.random() * dict[item].length);
}

const setKanjiField = (word) => {
	kanjiField.innerHTML = word;
}

const setKanaField = (word) => {
	kanaField.innerHTML = word;
}

const getDef = (index) => {
	return dict["words"][index]["sense"][0]["gloss"][0]["text"];
}

const setDef = (def) => {
	defField.innerHTML = def;
}

const getWord = (index) => {
	//get word from dict
	let result = [];
	if(dict["words"][index]["kanji"].length > 0) result[0] = dict["words"][index]["kanji"][0]["text"];
	else result[0] = dict["words"][index]["kana"][0]["text"];
	result[1] = dict["words"][index]["kana"][0]["text"];
	return result;
}

const checkButtonPress = () => {
	let word = getWord(index);
	let answer = entryField.value;
	if(checkAnswer(answer)) {
		entryField.readOnly = true;
		answerField.innerHTML = "Right!";
		window.setTimeout(getNewButtonPress, 3000);
		entryField.readOnly = false;
	}
	else answerField.innerHTML = "Wrong!";
}

const checkAnswer = (answer) => {
	return answer === romaji;
}

const changeTitle = () => {
	if(showKanaButton.innerHTML === "Show kana") showKanaButton.innerHTML = "Hide kana";
	else showKanaButton.innerHTML = "Show kana";
}

const searchForKanji = (category,kanji) => {
	let backup = [];
	let size = dict["words"][index][category].length;
	
	for(let i = 0; i < size; i++) {
		if(dict["words"][index][category][i]["appliesToKanji"] === kanji) return i;
		if(dict["words"][index][category][i]["appliesToKanji"] === "*") backup.push(i);
	}
	
	return backup;
}

// const keyPress = (e) => {
	// if(e.code === 'Enter') getNewButtonPress;
	// checkButtonPress();
// }

getNewButton.addEventListener('click', getNewButtonPress);
checkButton.addEventListener('click', checkButtonPress);
entryField.addEventListener('keyup', (e) => {
	console.log(e.code);
	if(e.code === 'Enter' || e.code === 'NumpadEnter') getNewButtonPress();
	if(e.which <= 90 && e.which >= 48 || e.which >= 96 && e.which <= 105) checkButtonPress();
});
//showKanaButton.addEventListener('click', changeTitle);

//json
//XMLHttpRequest -> API
const loadJSON = (callback) => {
//create new request and set it to GET and url
let request = new XMLHttpRequest();
request.open('GET', requestURL);

request.onreadystatechange = () => {
	if(request.readyState === 4 && request.status === 200) {
		callback(request.responseText);
	}
};

request.send();
}

//wait for response and process it
const init = () => {
	loadJSON((response) => {
		dict = JSON.parse(response);
	});
}

init();

	