 # 🎵 Music Player  

A simple and elegant **music player** built using **HTML, CSS, and JavaScript**. This player dynamically loads albums and playlists using `info.json`, providing a seamless and organized listening experience.  

---

## 🚀 Features  

- ✅ Play, Pause, Next, and Previous song controls  
- ✅ Dynamic album and playlist loading from `info.json`  
- ✅ **Album cover images** for each playlist (`image.jpg`)  
- ✅ Responsive and user-friendly UI  
- ✅ Displays album art and song details  
- ✅ Smooth audio playback  

---
## 👩‍💻 Technologies Used  

- **HTML5** - Structure of the music player  
- **CSS3** - Styling and layout design  
- **JavaScript (ES6)** - Functionality and dynamic interactions  
- **JSON** - Storing album and playlist metadata  

---
## 📚 Project Structure  

```
Music-Player/
│── index.html         # Main HTML file  
│── script.js          # JavaScript for player functionality  
│── style.css          # Stylesheet for UI  
│── img/               # Folder containing images  
│── songs/             # Folder containing all albums & songs  
│   ├── Album1/        # Example album folder  
│   │   ├── song1.mp3  
│   │   ├── song2.mp3  
│   │   ├── info.json  # Album metadata (name, description)  
│   │   ├── image.jpg  # Cover image for this album  
│   ├── Album2/  
│── README.md          # Project documentation  
│── LICENSE            # Apache 2.0 License file  
```

---

## 🌟 How to Use  

1. **Clone the repository:**  
   ```bash
   git clone https://github.com/ibadullahkingkhan/Music-Player.git
   ```  
2. **Open `index.html` in a browser.**  
3. Enjoy your music! 🎶  

---

## 🔧 Understanding `info.json` Structure  

Each album or playlist folder contains an `info.json` file, which provides details about the playlist.  

### **Example `info.json` File:**  
```json
{
    "title": "Playlist Name",
    "description": "Short description"
}
```
- **`"title"`** → The playlist or album name displayed in the player.  
- **`"description"`** → A short description of the playlist.  

Additionally, every album folder should contain an **`image.jpg`** file.  
- This serves as the **album cover** for the playlist.  
- You can **upload any image**, but it **must be named `image.jpg`** for the player to display it correctly.  

---

## 🔧 Customization  

- 🎼 Add new **albums and songs** inside the `songs/` folder.  
- ✏️ Update `info.json` in each album folder to **modify album details**.  
- 🎨 Replace `image.jpg` with any album cover image **(keep the same name)**.  
- 🎭 Customize the UI in `style.css`.  

---

## 🌟 License  

This project is licensed under the **Apache License 2.0** – You are free to use, modify, and distribute it with proper attribution. See the `LICENSE` file for more details.  

---

