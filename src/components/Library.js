import LibrarySong from './LibrarySong';

const Library = ({audioRef,songs,setCurrentSong,isPlaying,setIsPlaying,setSongs,libraryStatus}) =>{
    return(
       <div className={`library ${libraryStatus ? "active" : ""}`}>
           <h2>Library</h2>
           <div className="library-songs">
                {songs.map(song => (
                <LibrarySong 
                song={song}
                audioRef={audioRef}
                songs={songs}
                setCurrentSong={setCurrentSong}
                key={song.id}
                id={song.id}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                setSongs={setSongs}
                />
                ))}
           </div>
       </div> 
    )
}

export default Library;