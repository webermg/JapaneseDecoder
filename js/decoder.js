

//Takes a japanese word and returns 
//a string with romaji representation
const decode = (word, table, special) => {
	 let current = 0;
	 let result = "";
	 while(current < word.length) {
		 let token = "";
		 let smallTsu = false;
		 let dash = false;
		 if(word[current] === special[0]) {
			smallTsu = true;
			current++;
		 }
		 token += word[current];
		 current++;
		 if(special[1][word[current]]) {
			 token += word[current];
			 current++;
		 }
		 if(word[current] === special[2]) {
			 dash = true;
			 current++;
		 }
		 console.log(token + ": " + table[token]);
		 token = table[token];
		 if(smallTsu) token = token[0] + token;
		 if(dash) token += token[token.length-1];
		 result += token;
	 }
	 return result;	
}

export default decode;