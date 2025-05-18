import { useState, useEffect, useContext } from "react";
import { getRandomIntInclusive, shuffle } from "./utils";
import StoreContext from "./StoreContext";

export const useAudio = (musics: any[]) => {
    const [currentMusic, setCurrentMusic] = useState(null)
    const [audio, setAudio] = useState(new Audio());
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(30);
    const [time, _setTime] = useState(0);
    const [activePlaylist, setActivePlaylist] = useState([]);
    const [isRandom, setIsRandom] = useState(false);

    const togglePlayback = () => setPlaying(!playing);

    const handleError = () => {
        setAudio(new Audio())
        setPlaying(false)
        setCurrentMusic(null)
    }

    const handleEnded = () => {
        setPlaying(false)
        setCurrentMusic(null)
        if (activePlaylist?.length > 0) {
            const index = activePlaylist.findIndex(e => e.id === currentMusic.id);
            console.log(index)
            if (index === activePlaylist.length - 1) {
                setActivePlaylist(shuffle(musics));
                return
            }
            setCurrentMusic(activePlaylist[index + 1])
            setPlaying(true)
        }
    }

    const handleTimeUpdate = (e) => {
        _setTime(audio.currentTime)
    }

    const handlePrev = () => {
        const index = activePlaylist.findIndex(e => e.id === currentMusic.id);
        if (!index || index === 0) return;
        setCurrentMusic(activePlaylist[index - 1])
    }

    const handleNext = () => {
        handleEnded()
    }

    const setTime = (time) => {
        audio.currentTime = time
    }

    useEffect(() => {
        if (activePlaylist.length > 0) {
            if (isRandom) {
                setCurrentMusic(getRandomIntInclusive(0, activePlaylist.length))
            }
            else {
                setCurrentMusic(activePlaylist[0]);
            }
        }
    }, [activePlaylist])

    useEffect(() => {
        if (currentMusic) {
            try {
                setPlaying(false)
                audio.src = `${import.meta.env.VITE_MUSIC_URL}/${currentMusic.musician.id}/${currentMusic.id}.wav`
                audio.currentTime = 0
                audio.load()
                setTimeout(() => { setPlaying(true) }, 100)
            } catch (e) {
                console.log('error')
            }
        }
    }, [currentMusic]);

    useEffect(() => {
        audio.volume = volume / 100
    }, [volume])

    useEffect(() => {
        if (playing) {
            try { audio.play(); } catch (e) {
                console.log('error')
            }
        }
        else {
            audio.pause();
        }
    }, [playing]);

    useEffect(() => {
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);
        audio.addEventListener('timeupdate', handleTimeUpdate)
        return () => {
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
            audio.removeEventListener('timeupdate', handleTimeUpdate)
        };
    }, [playing, togglePlayback]);

    return [currentMusic, setCurrentMusic, audio, playing, togglePlayback, volume, setVolume, time, setTime, activePlaylist, setActivePlaylist, handleNext, handlePrev];
};

