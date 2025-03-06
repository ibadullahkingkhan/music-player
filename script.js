console.log("Hello js")

// Global variables 
let currentsong = new Audio();
let songs;
let currentfolder;

// Function for taking songs from folder
async function getsongs(folder){
    // let songs = []
    currentfolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/${folder}/`)
    let response = await a.text();
    // console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    songs = []
    for(let index = 0; index < as.length; index++){
        const element = as[index]   
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    } 

    // Show All Songs in the Playlist
    let songul = document.querySelector(".songslist").getElementsByTagName("ul")[0]
    songul.innerHTML = ""
    for(const song of songs){
        songul.innerHTML = songul.innerHTML + `
        <li>                    
        <div class="songimg">
            <img src="img/music.svg" alt="">
        </div>
        <div class="songinfo">
            <div class="songname">
                ${song.replaceAll("%20", " ")}
            </div>
            <div class="songartist">
                Song Artist
            </div>
        </div>
        <div class="playsong">
            <span>Play Now</span>
            <img src="img/play.svg" alt="">
        </div>
    </li>`
    }

    // Add event listener to songs
    Array.from(document.querySelector(".songslist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element=>{
            playmusic(e.querySelector(".songinfo").firstElementChild.innerHTML.trim())
        })
    })
    // return song for using it somewhere else
    return songs;
}

// making function to chang the value of seconds into minutes and seconds
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

// function for playing the music
const playmusic = (track, pause=false) => {
    currentsong.src = `/${currentfolder}/` + encodeURIComponent(track)  //encodeURIComponent ensures that any special characters (e.g., spaces, parentheses) are encoded properly.
    if(!pause){
        currentsong.play()
        play.src = "img/pause.svg"
    }
    
    document.querySelector(".songtitle").innerHTML = decodeURI(track) //show song title in the track
    document.querySelector(".songduration").innerHTML = "00:00" //show time of song
};

let cardcontainer = document.querySelector(".cardcontainer")
async function displayalbums(){
    let a = await fetch(`http://127.0.0.1:3000/songs/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
     
    let anchorlinks = div.getElementsByTagName("a")
    let array = Array.from(anchorlinks)
         for (let index = 0; index < array.length; index++) {
            const e = array[index];
            if (e.href.includes("/songs/")){
                let folder = e.href.split("/").slice(-2)[0]
                // getting metadata of folder
                let a = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`)
                let response = await a.json()
                cardcontainer.innerHTML = cardcontainer.innerHTML + ` <div data-folder="${folder}" ="" class="card">
                <img src="/songs/${folder}/image.jpg" alt="song">
                <h2>${response.title}</h2>
                <p>${response.description}</p>
                </div>`
            }
        }

      // Load the Playlist Whenever Card is clicked
      Array.from(document.getElementsByClassName("card")).forEach(e=>{
         
         e.addEventListener("click", async item=>{
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`)
            
            //play first song of card automatically

            playmusic(decodeURIComponent(songs[0]))
         })
    })

    
    
}

async function main(){
    // Get List of all songs
    await getsongs("songs/ncs")
    // console.log(songs)

    displayalbums()

    // Bring first music to playbar by defoult
    playmusic(songs[0],true)

    

    


    // Add event listiner to Play
    play.addEventListener("click", () => {
        if(currentsong.paused){
            currentsong.play()
            play.src = "img/pause.svg"
        }
        else{
            currentsong.pause()
            play.src = "img/play.svg"
        }
    })

    // Listen for current song time update event
    currentsong.addEventListener("timeupdate", () =>{
        document.querySelector(".songduration").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)}/${secondsToMinutesSeconds(currentsong.duration)}`
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 +"%" ;
    })

    // Add an event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e=>{
        let percent =  (e.offsetX/e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = ((currentsong.duration) * percent)/100

    })

    // Add an event listener to next
    next.addEventListener("click", () => {
        currentsong.pause();
        console.log("Next clicked");
        // Extract and decode current filename
        let currentFile = decodeURIComponent(currentsong.src.split("/").pop());
        console.log("Current file:", currentFile);
        // Ensure all comparisons are done using decoded filenames
        let index = songs.findIndex(song => decodeURIComponent(song) === currentFile);
        console.log("Current song index:", index);
        // Ensure valid index and move to the next song if within bounds
        if (index !== -1 && index + 1 < songs.length) {
            playmusic(decodeURIComponent(songs[index + 1])); // Ensure the next song is also decoded
        } else {
            console.log("End of playlist");
        }
    });

    // Add an event listener to previous
    previous.addEventListener("click", () => {
        currentsong.pause();
        console.log("Previous clicked");
        // Extract and decode current filename
        let currentFile = decodeURIComponent(currentsong.src.split("/").pop());
        console.log("Current file:", currentFile);
        // Ensure all comparisons are done using decoded filenames
        let index = songs.findIndex(song => decodeURIComponent(song) === currentFile);
        console.log("Current song index:", index);
        // Ensure valid index and move to the previous song if within bounds
        if (index !== -1 && index - 1 >= 0) {
            playmusic(decodeURIComponent(songs[index - 1])); // Ensure the previous song is also decoded
        } else {
            console.log("Start of playlist");
        }
    });

     
    // Add an event listener to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", e =>{
        console.log(e.target.value)
        currentsong.volume = parseInt(e.target.value)/100
    })

    // Add an event listener to Mute or Unmute the volume 
    document.querySelector(".songvolume img").addEventListener("click", e=>{
        console.log(e.target.src)
        if(e.target.src.includes("volume.svg")){
            e.target.src = e.target.src.replace("volume.svg","mute.svg")
            currentsong.volume = 0
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0
        }
        else{
            e.target.src = e.target.src.replace("mute.svg","volume.svg")
            currentsong.volume = .20;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 20;
        }
    })

    //Add an event listener to hamburger
    document.querySelector(".hamburger").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "0"
    })

    //Add an event listener to close
    document.querySelector(".close").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "-100%"
    })

}

main()