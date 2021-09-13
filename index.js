// install express with `npm install express` 
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

/**
 * NO NEED FOR app.listen
 * Deta Micros takes care of it.
 */

// export 'app'
module.exports = app