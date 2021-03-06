export const playAudio = (audioRef,setIsPlaying) => {
    const playPromise = audioRef.current.play();
    if(playPromise !== undefined){
        playPromise.then((audio) => {
            audioRef.current.play();
            setIsPlaying(true);
        })
    }
}