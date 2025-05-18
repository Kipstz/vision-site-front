import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { api, loggedApi } from "./axios";
import Oauth from "./pages/Oauth";
import StoreContext from "./StoreContext";
import { Home } from "./pages/Home";
import { Patch } from "./pages/Patch";
import { enqueueSnackbar } from "notistack";
import { Panel } from "./pages/Panel";
import { Streamers } from "./pages/Streamers";
import { Events } from "./pages/Events";
import { Admin } from "./pages/Admin";
import dayjs from "dayjs";
import fr from "dayjs/locale/fr";
import { News } from "./pages/News";
import { SelectedNews } from "./pages/SelectedNews";
import { CayoNews } from "./pages/CayoNews";
import { SelectedCayoNews } from "./pages/SelectedCayoNews";
import Music from "./pages/Music";
import { FlexColumn, FlexLayout } from "./layouts/Flex";
import { useAudio } from "./hook";
import { BsFillVolumeDownFill } from "react-icons/bs";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import {
  Favorite,
  Pause,
  PlaylistAdd,
  SkipNext,
  SkipPrevious,
} from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Bestof } from "./pages/Bestof";
import { Legal } from "./pages/Legal";
import { Rules } from "./pages/Rules";
import { Slider } from "@mui/material";
import { Boutique } from "./pages/Boutique";

dayjs.locale({
  ...fr,
  weekStart: 1,
});
export const App: React.FC = () => {
  const [user, setUser] = useState(null);
  const [sid, setSid] = useState<string | null>(null);
  const [patchNotes, setPatchNotes] = useState([]);
  const [show, setShow] = useState(true);
  const [musics, setMusics] = useState([]);
  const [
    currentMusic,
    setCurrentMusic,
    audio,
    playing,
    togglePlayback,
    volume,
    setVolume,
    time,
    setTime,
    activePlaylist,
    setActivePlaylist,
    handleNext,
    handlePrev,
  ] = useAudio(musics);
  const [artists, setArtists] = useState([]);
  const [bestof, setBestof] = useState([]);
  const [streamers, setStreamers] = useState([]);
  const [streaming, setStreaming] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [modalValue, setModalValue] = useState<any>(null);
  const [rules, setRules] = useState(null);
  const [panelElements, setPanelElements] = useState([]);
  const [serverType, setServerType] = useState(0);

  const handleCloseModal = () => {
    setModalValue(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const toggleFavorite = async (id) => {
    try {
      const response = await loggedApi.post("/music/update-favorite", {
        musicId: id,
      });
      setMusics(
        musics.map((e) =>
          e.id === id
            ? { ...e, isFavorite: response?.data?.data?.isFavorite }
            : e
        )
      );
    } catch (e) {
      if (e?.response?.data?.error?.code === "UNAUTHORIZED") {
        enqueueSnackbar(
          "Votre connexion a expirée. Veuillez vous reconnecter."
        );
      } else {
        enqueueSnackbar("Une erreur est survenue");
      }
    }
  };

  const fetchData = async (user) => {
    const [response1, response2, response3, response4] = await Promise.all([
      (user ? loggedApi : api).get("/music/get-all"),
      api.get("/musician/get-all"),
      api.get("/rules"),
      api.get("/panel-element/get-all"),
    ]);
    setMusics(response1.data.data.musics);
    setArtists(response2.data.data.musicians);
    setRules(response3.data);
    setPanelElements(response4.data.data.panelElement);
    if (user) {
      const response3 = await loggedApi.get("/playlist/get-my-playlists");
      setPlaylists(response3?.data?.data?.playLists);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/patch-note/last?limit=9");
      setPatchNotes(response.data?.data?.patchNotes ?? []);
    };
    fetchData().catch(() => {
      enqueueSnackbar(
        "Une erreur est survenue pendant la récupération des events."
      );
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/best-of/last?limit=9");
      setBestof(response.data?.data?.bestOfs ?? []);
    };
    fetchData().catch(() => {
      enqueueSnackbar(
        "Une erreur est survenue pendant la récupération des best-ofs."
      );
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/streaming/all");
      setStreamers(
        response.data?.data?.streamers.filter((e) => e.twitchName) ?? []
      );
    };
    fetchData().catch(() => {
      enqueueSnackbar(
        "Une erreur est survenue pendant la récupération des streamers."
      );
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/streaming/streaming-vision");
      setStreaming(response.data?.data?.streamers ?? []);
    };
    fetchData().catch(() => {
      enqueueSnackbar(
        "Une erreur est survenue pendant la récupération des streamers en ligne."
      );
    });
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      if (!localStorage.getItem("token")) throw null;
      const response = await loggedApi.get(`/user/me`);
      setUser(response.data.user);
      fetchData(response.data.user).catch((e) => {
        enqueueSnackbar(
          e?.response?.data?.error?.message ??
            e?.response?.data?.error?.code ??
            "Une erreur inconnue est survenue"
        );
      });
    } catch (e) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      fetchData(null).catch((e) => {
        enqueueSnackbar(
          e?.response?.data?.error?.message ??
            e?.response?.data?.error?.code ??
            "Une erreur inconnue est survenue"
        );
      });
    }
  }, []);

  const store = {
    user,
    setUser,
    sid,
    setSid,
    patchNotes,
    currentMusic,
    setCurrentMusic,
    audio,
    playing,
    togglePlayback,
    musics,
    setMusics,
    artists,
    setArtists,
    bestof,
    streamers,
    streaming,
    activePlaylist,
    setActivePlaylist,
    playlists,
    setPlaylists,
    rules,
    panelElements,
    serverType,
    setServerType,
  };

  const AudioPlayer = () => {
    return (
      <FlexLayout
        className={
          "music__player" +
          (currentMusic ? (show ? "" : " hidden") : " disabled")
        }
      >
        <div className="music__time__bar">
          <Slider
            value={!isNaN(time) ? time : 0}
            min={0}
            max={!isNaN(audio?.duration) ? audio?.duration : 100}
            style={{ color: "white" }}
            onChange={(e, value) => setTime(value)}
          />
        </div>
        <FlexLayout className="player__left">
          {show && (
            <img
              alt="img-musique"
              src={currentMusic?.image}
              height={50}
              width={50}
            />
          )}
          <FlexColumn
            style={{
              gap: 5,
            }}
          >
            <h1 className="music__title">{currentMusic?.name}</h1>
            <span className="music__author">{currentMusic?.author}</span>
          </FlexColumn>
        </FlexLayout>

        <FlexLayout className="player__middle">
          <div
            onClick={handlePrev}
            className={
              "PreviousSong" +
              (activePlaylist?.findIndex((e) => e.id === currentMusic?.id) ===
                0 || activePlaylist.length === 0
                ? " Disabled"
                : "")
            }
          >
            <SkipPrevious />
          </div>
          {playing ? (
            <div className="f" onClick={() => togglePlayback()}>
              <Pause />
            </div>
          ) : (
            <div
              className="f"
              onClick={() => {
                togglePlayback();
              }}
            >
              <PlayCircleFilledWhiteIcon />
            </div>
          )}
          <div onClick={() => handleNext()} className={"NextSong"}>
            <SkipNext />
          </div>
        </FlexLayout>

        <FlexLayout className="player__right">
          {user && (
            <div
              className="FavButton"
              onClick={() => toggleFavorite(currentMusic.id)}
            >
              {musics.find((e) => e.id === currentMusic?.id)?.isFavorite ??
              false ? (
                <Favorite />
              ) : (
                <FavoriteBorderIcon />
              )}
            </div>
          )}
          {user && (
            <div
              className="AddPlaylistButton"
              onClick={() =>
                setModalValue({ type: "addPL", id: currentMusic.id })
              }
            >
              <PlaylistAdd />
            </div>
          )}
          <BsFillVolumeDownFill />
          <input
            onChange={(e) => setVolume(e.currentTarget.value)}
            max={100}
            min={0}
            value={volume}
            type="range"
          />
        </FlexLayout>
        <div
          className="close"
          onClick={() => setShow(!show)}
          style={
            show
              ? { transform: "rotate(-90deg)" }
              : { transform: "rotate(90deg)" }
          }
        >
          <ChevronLeftIcon />
        </div>
      </FlexLayout>
    );
  };

  return (
    <>
      <div className="main">
        <div className="content">
          <StoreContext.Provider value={store}>
            <Routes>
              <Route path="/rules" element={<Rules />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/bestof" element={<Bestof />} />
              <Route path="/bestof" element={<Bestof />} />
              <Route
                path="/music"
                element={
                  <Music
                    handleCloseModal={handleCloseModal}
                    modalValue={modalValue}
                  />
                }
              />
              <Route path="/admin" element={<Admin />} />
              <Route path="/events" element={<Events />} />
              <Route path="/news" element={<News />} />
              <Route path="/cayo-news" element={<CayoNews />} />
              <Route path="/news/:id" element={<SelectedNews />} />
              <Route path="/cayo-news/:id" element={<SelectedCayoNews />} />
              <Route path="/streamers" element={<Streamers />} />
              <Route path="/panel" element={<Panel />} />
              <Route path="/auth" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/oauth" element={<Oauth />} />
              <Route path="/patch" element={<Patch />} />
            </Routes>
          </StoreContext.Provider>
        </div>
        {AudioPlayer()}
      </div>
    </>
  );
};
