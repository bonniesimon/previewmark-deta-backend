// install express with `npm install express` 
const express = require('express')
const app = express()
require('dotenv').config();
const morgan = require('morgan');

/**
 * Setting up the logger
 */
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

const {Deta} = require('deta');

const deta = Deta(process.env.DETA_PROJECT_KEY);
const db = deta.Base("previewmark");

const date = Date.now().toString();


app.get('/', async (req, res) => {
	try {
		// const value = await db.insert({string: "hey this is the string", date: date});
		// console.log(value);
		console.log("Hey");
	} catch (error) {
		console.log(error);	
	}
	res.send('Hello World!')}
)

app.listen(process.env.DEV_PORT, ()=>{
	console.log(`Server running successfully @ localhost:${process.env.DEV_PORT}`);
})
/**
 * NO NEED FOR app.listen
 * Deta Micros takes care of it.
 */

// export 'app'
module.exports = app