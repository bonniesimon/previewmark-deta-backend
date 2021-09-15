// install express with `npm install express` 
const express = require('express')
const app = express()
require('dotenv').config();

/**
 * Setting up the logger
 */
const morgan = require('morgan');
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));


/**
 * Setting up deta base
 */
const {Deta} = require('deta');
const deta = Deta(process.env.DETA_PROJECT_KEY);
const db = deta.Base("previewmark");


/**
 * Routes
 */
app.get('/', async (req, res) => {
	const date = Date.now().toString();
	try {
		// const value = await db.insert({string: "hey this is the string", date: date});
		// console.log(value);
		console.log("Hey");
	} catch (error) {
		console.log(error);	
	}
	res.send('Hello World!')}
)

/**
 * NO NEED FOR app.listen() when deploying to Deta Micros
 * Deta Micros takes care of it.
 */
app.listen(process.env.DEV_PORT, ()=>{
	console.log(`Server running successfully @ localhost:${process.env.DEV_PORT}`);
})

// export 'app'
module.exports = app