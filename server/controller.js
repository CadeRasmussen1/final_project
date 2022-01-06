const songList = []
let globalId = 0
module.exports = {
    getSongs: (req, res) => {
        res.status(200).send(songList)
    },
    createSong: (req,res) => {
        const {title, rating, imageURL, songURL} = req.body
        let newSong = {
            title,
            rating: +rating,
            imageURL,
            id: globalId,
            songURL
        }
        songList.push(newSong)
        res.status(200).send(songList)
        globalId++
    },
    updateSong: (req, res) => {
        const { id } = req.params
        const {type} = req.body

        let index = songList.findIndex(elem => +elem.id === +id)

        if (songList[index].rating === 5 && type === 'plus'){
            res.status(400).send('cannot go above rating 5')
        }else if(songList[index.rating === 1 && type === 'minus']){
            res.status(400).send('cannot go below rating 1')
        }else if(type === 'plus'){
            songList[index].rating++
            res.status(200).send(songList)
        }else if(type === 'minus'){
            songList[index].rating--
            res.status(200).send(songList)
        }
    },
    deleteSong: (req, res) => {
        let {id} = req.params

        let index = songList.findIndex(elem => +elem.id === +id)
        songList.splice(index, 1)
        res.status(200).send(songList)
    }
    
}