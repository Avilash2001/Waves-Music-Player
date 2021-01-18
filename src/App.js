import { useState,useRef } from 'react';
//StyleSheet
import './styles/app.scss';
//Adding Components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';
//Import Util
import data from './data';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  //Ref
  const audioRef = useRef(null);
  //State
  const [songs,setSongs] =  useState(shuffleArray(data()));
  const [currentSong,setCurrentSong] = useState(songs[0]);
  const [isPlaying,setIsPlaying] = useState(false);
  const [songInfo,setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0
  });
  const [libraryStatus,setLibraryStatus] = useState(false);

  const timeUpdateHandler = (e) =>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    //Percentage
    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round((roundedCurrent/roundedDuration)*100);

    setSongInfo({...songInfo,currentTime:currentTime,duration:duration,animationPercentage});
  }

  const songEndHandler = () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    setCurrentSong(songs[(currentIndex + 1)%songs.length]);
  }
  // setIsPlaying(true);
  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav
      libraryStatus={libraryStatus}
      setLibraryStatus={setLibraryStatus}
      />
      <Song 
      currentSong= {currentSong}
      />
      <Player 
      audioRef={audioRef}
      songInfo={songInfo}
      setSongInfo={setSongInfo}
      setIsPlaying={setIsPlaying}
      isPlaying={isPlaying}  
      currentSong= {currentSong}
      songs={songs}
      setCurrentSong={setCurrentSong}
      setSongs={setSongs}
      />
      <Library
      songs={songs}
      audioRef={audioRef}
      setCurrentSong={setCurrentSong}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
      setSongs={setSongs}
      libraryStatus={libraryStatus}
      /> 
      <audio 
      onTimeUpdate={timeUpdateHandler} 
      onLoadedMetadata={timeUpdateHandler}
      ref={audioRef} 
      src={currentSong.audio}
      onEnded={songEndHandler}
      >
      </audio>
    </div>
  );
}

export default App;
