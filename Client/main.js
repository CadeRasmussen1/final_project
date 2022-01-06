const songlistContainer = document.querySelector('#songs-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/songs`

const songlistCallback = ({ data: songList }) => displaySongs(songList)
const errCallback = err => console.log(err)

const getAllSongs = () => axios.get(baseURL).then(songlistCallback).catch(errCallback)
const createSong = body => axios.post(baseURL, body).then(songlistCallback).catch(errCallback)
const deleteSong = id => axios.delete(`${baseURL}/${id}`).then(songlistCallback).catch(errCallback)
const updateSong = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(songlistCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let title = document.querySelector('#title')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let imageURL = document.querySelector('#image')
    let songURL = document.querySelector('#song')

    let bodyObj = {
        title: title.value,
        rating: rating.value,
        imageURL: imageURL.value,
        songURL: songURL.value
    }

    createSong(bodyObj)

    title.value = ''
    rating.checked = false
    imageURL.value = ''
    songURL.value = ''
}

function createSongCard(song) {
    const songCard = document.createElement('div')
    songCard.classList.add('song-card')

    songCard.innerHTML = `<img alt='song cover' src=${song.imageURL} class="song-cover"/>
    <p class="song-title">${song.title}</p>
    <div class="btns-container">
        <button onclick="updateSong(${song.id}, 'minus')">-</button>
        <p class="song-rating">${song.rating} stars</p>
        <button onclick="updateSong(${song.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteSong(${song.id})">delete</button>
    <button onclick="location.href='${song.songURL}';">go to song</button>
    `


    songlistContainer.appendChild(songCard)
}

function displaySongs(arr) {
    songlistContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createSongCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllSongs()