// install express with `npm install express` 
const express = require('express')
const app = express()

const {Deta} = require('deta');

const deta = Deta('a036obeb');
const db = deta.Base("previewmark");

const date = Date.now().toString();


app.get('/', async (req, res) => {
	// const value = await db.insert({string: "hey this is the string", date: date});
	// console.log(value);
	res.send('Hello World!')}
)

app.listen(3001, ()=>{
	console.log("Server running successfully");
})
/**
 * NO NEED FOR app.listen
 * Deta Micros takes care of it.
 */

// export 'app'
module.exports = app