let fs = require ('fs');
let argv = process.argv;

let s = fs.readFileSync(argv[2], 'utf8');
s.toString();

let stck = new Array();
let out = new Array();

let prior = { "-":0, "+":0, "/":1, "*":1, "^":2 };

for (i=0; i<s.length; i++) {
	
	let num = "";
	while (s[i] == parseInt(s[i]) ) {
		num += parseInt(s[i]);
		i++;
	}
	out.push(num);
	
	if (s[i] in prior) {
		while ( prior[s[i]] <= prior[stck[stck.length-1]] )
			out.push(stck.pop() );
		stck.push(s[i]);
	}
	
	if (s[i] == "(" )
		stck.push(s[i]);
	
	if (s[i] == ")" ){
		while ( stck[stck.length-1] != "(") 
			out.push(stck.pop() );
		stck.pop() ;
	}
}
while (stck.length != 0 )
	out.push(stck.pop() );


stcksol = new Array();
let res = 0;
for (i=0; i<out.length; i++){
	if (out[i] == parseInt(out[i])) 
		stcksol.push(parseInt(out[i]));
	
	if (out[i] in prior) {
		
		let two = new Array();
		while (two.length != 2)
			two.push(stcksol.pop() );
		
		if (out[i] == "+"){
			res = two[1] + two[0];
			stcksol.push(res);
		}
	
		
		if (out[i] == "-"){
			res = two[1] - two[0];
			stcksol.push(res);
		}
		
		if (out[i] == "*"){
			res = two[1] * two[0];
			stcksol.push(res);
		}
		
		if (out[i] == "/"){
			res = two[1] / two[0];
			stcksol.push(res);
		}
		
		if (out[i] == "^"){
			res =Math.pow(two[1], two[0]);
			stcksol.push(res);
		}
		
	}
}
	
out=out.toString();
let str = "";
for(i=0; i<out.length; i++){
	if (out[i] == "," ){
		continue;
	}
	else {
		str += out[i];
	}
}
console.log(str);
console.log (res);


