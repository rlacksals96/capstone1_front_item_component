import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
export default function MusicPlayer({name}){


    return(
        <div>
            <AudioPlayer
                autoPlay
                src={process.env.PUBLIC_URL+'/music/'+name+'.mp3'}
                onPlay={e => console.log("onPlay")}
                loop={true}
            />
        </div>
    )
}