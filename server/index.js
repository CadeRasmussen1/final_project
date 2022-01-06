const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const ctrl = require('./controller.js')

app.get('/api/songs', ctrl.getSongs)
app.post('/api/songs', ctrl.createSong)
app.put('/api/songs/:id', ctrl.updateSong)
app.delete('/api/songs/:id', ctrl.deleteSong)

app.listen(4000, () => console.log('listening on port 4000'))