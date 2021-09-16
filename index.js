const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()
require('dotenv').config();

/**
 * Setting up cors middleware
 */
let whitelist = ['https://bonniesimon.github.io/preview-mark', 'http://localhost:3000'];
// if(!process.env.DETA_RUNTIME){
// 	whitelist.push('http://localhost:3000');
// }
var corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
}
}
app.use(cors(corsOptions));


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
 * Middleware to parse JSON for this app.
 * This should come before route handlers in the code.
 */
// app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.json())



/**
 * Routes
 */
app.get('/', async (req, res) => {
	res.send('Welcome to the Backend of PreviewMark');
}
)

app.post('/publish-page', async (req, res) => {
	const {markdown, date} = req.body;
	let responseJson;
	if(!markdown || !date){
		responseJson = {
			status: 404,
			completed: false,
			error: "Incomplete data sent"
		}
	}
	else{
		try {
			const resData = await db.put({markdown, date});
			responseJson = {
				...resData, 
				status: 200,
				completed: true	
			}
		} catch (error) {
			responseJson = {
				status: 503,
				completed: false,
				error: error
			}
		}
	}

	res.json(responseJson);	
})

app.get('/pages/:id', async (req, res) => {
	const {id} = req.params;
	let responseJson;
	try {
		const resData = await db.get(id);
		if(resData === null){
			throw new Error('Item not found in table');
		}
		responseJson = {
			...resData,
			status:200,
			completed: true
		}
	} catch (error) {
		responseJson = {
			status: 503,
			completed: false,
			error: error.message
		}
	}
	res.json(responseJson);
})


/**
 * NO NEED FOR app.listen() when deploying to Deta Micros
 * Deta Micros takes care of it.
 */
if(!process.env.DETA_RUNTIME){
	app.listen(process.env.DEV_PORT, ()=>{
		console.log(`Server running successfully @ localhost:${process.env.DEV_PORT}`);
	})
}

// export 'app'
module.exports = app