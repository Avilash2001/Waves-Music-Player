import { useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay,faAngleLeft,faAngleRight,faPause} from '@fortawesome/free-solid-svg-icons';

import{playAudio} from '../util';
const Player = ({audioRef,currentSong,setIsPlaying,isPlaying,songInfo,setSongInfo,songs,setCurrentSong,setSongs}) => {
    useEffect(() => {
        const newSongs = songs.map((song) => {
            if(song.id === currentSong.id){
                return {
                    ...song,
                    active: true,
                }
            }else{
                return {
                    ...song,
                    active: false,
                }
            }
        });
        setSongs(newSongs);
        playAudio(audioRef,setIsPlaying);
    },[currentSong]);
    //Event Handlers
    const playSongHandler = () =>{
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    const getTime = (time) =>{
        return(
            Math.floor(time/60) + ":"+("0" + Math.floor(time%60)).slice(-2)
        );
    }

    const dragHandler = (e) =>{
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo,currentTime:e.target.value});
    }

    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === 'skip-foreward'){
            setCurrentSong(songs[(currentIndex + 1)%songs.length]);
        }else{
            if((currentIndex - 1)%songs.length === -1){
                setCurrentSong(songs[songs.length - 1]);
                return;
            }
            setCurrentSong(songs[currentIndex - 1]);
        }
    }
    //Add Styles
    const trackAnim = {
        transform:`translateX(${songInfo.animationPercentage}%)`
    }

    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`}} className="track">
                    <input 
                    min={0} 
                    max={songInfo.duration || 0} 
                    value={songInfo.currentTime} 
                    onChange={dragHandler}
                    type="range"
                    />
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration): "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className="skip-back" size="2x" icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-foreward')} className="skip-foreward" size="2x" icon={faAngleRight}/>
            </div>
            
        </div>
    )
}

export default Player;