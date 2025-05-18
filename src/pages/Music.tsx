import { Autocomplete, Modal, TextField, Tooltip } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import StoreContext from "../StoreContext";
import { FlexLayout, FlexColumn } from "../layouts/Flex";
import HeaderAndFooterLayout from "../layouts/HeaderAndFooterLayout";
import { MusicSectionLayout } from "../components/MusicSectionLayout";
import { TbMicrophone2 } from 'react-icons/tb'
import { Add, Favorite, Home, MoreVert, Pause, QueueMusic, Search } from "@mui/icons-material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { loggedApi } from "../axios";
import { orderBy } from 'lodash'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import React from "react";

const Music: React.FC<any> = ({ handleCloseModal, modalValue = null }) => {
  const {
    user,
    currentMusic,
    setCurrentMusic,
    playing,
    togglePlayback,
    musics,
    setMusics,
    artists,
    setActivePlaylist,
    playlists,
    setPlaylists
  } = useContext(StoreContext);

  const [show, setShow] = useState('home');
  const [search, setSearch] = useState('');
  const [activeId, setActiveId] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPL, setSelectedPL] = useState(null)
  const [_modal, setModal] = useState<any>(false);

  const modal = modalValue ?? _modal;

  const currentArtist = (artists ?? []).find(e => e.id === activeId);

  const buildPlayButton = (id, playlistType) => {
    return <div className="PlayButton">
      {currentMusic?.id === id && playing ? <div onClick={() => togglePlayback()}>
        <Pause />
      </div> : <div onClick={() => {
        if (!currentMusic || currentMusic.id !== id) {
          if (playlistType?.type === 'favorite') {
            setActivePlaylist(musics.filter(e => e.isFavorite))
          }
          if (playlistType?.type === 'mostListened') {
            setActivePlaylist(musics.filter(e => e.musicianId === playlistType?.id))
          }
          if (playlistType?.type === 'playlist') {
            setActivePlaylist(playlistType?.musics)
          }
          setTimeout(() => {
            setCurrentMusic(musics.find(e => e.id === id))
          }, 50)
        }
        else
          togglePlayback()
      }}>
        <PlayCircleFilledWhiteIcon />
      </div>
      }
    </div >
  }

  const buildMusicList = (musics, key = 'list', showRemove = false, playlistType = null) => {
    return <div className="MusiqueListe" key={key}>
      {musics.map(music => <div className="MusiqueElement" key={'list' + music.id}>
        <img className="MusiqueImage" src={music.image} />
        <div className="MusiqueMain">
          <div className="MusiqueName">{music.name}</div>
          <div className="MusiqueSinger">{music.musician.stageName}</div>
        </div>
        <div className="MusiqueListens">{music.listenAmount}</div>
        <div className="Buttons">
          {buildPlayButton(music.id, playlistType)}
          {user && <div className="FavButton" onClick={() => toggleFavorite(music.id)}>
            {music.isFavorite ? <Favorite /> : <FavoriteBorderIcon />}
          </div>}
          {user && <div className="AddPlaylistButton" onClick={() => setModal({ type: 'addPL', id: music.id, showRemove })}><MoreVert /></div>}
        </div>
      </div>
      )}
    </div >
  }

  const buildMusicianRecap = (musician, i = null) => {
    return <div className={"Artist" + (i !== null ? ' FadeIn' : '')} style={{ animationDelay: (((i ?? 0) * 0.1) + 0.6) + 's' }}>
      <div style={{ backgroundImage: 'url(' + musician.banner + ')' }} className="header" />
      <div className="Name">{musician.stageName}</div>
      <div className="Title">Titres les plus populaires</div>
      <div className="List">
        {
          orderBy(musics.filter((m) => m.musicianId === musician.id), 'listenCount').slice(0, 3).map((m) => (
            <div className="Music" key={'recap' + m.id}>
              <img src={m.image} />
              <div className="Infos">
                <div className="MusicTitle">{m.name}</div>
              </div>
              {buildPlayButton(m.id, { type: 'mostListened', id: m.musicianId })}
            </div>
          ))
        }
      </div>
      <div className="PageArtiste" onClick={() => setActiveId(musician.id)}>Page artiste</div>
    </div>
  }

  const toggleFavorite = async (id) => {
    try {
      const response = await loggedApi.post('/music/update-favorite', { musicId: id });
      setMusics(musics.map(e => e.id === id ? { ...e, isFavorite: response?.data?.data?.isFavorite } : e))
    } catch (e) {
      if (e?.response?.data?.error?.code === 'UNAUTHORIZED') {
        enqueueSnackbar("Votre connexion a expirée. Veuillez vous reconnecter.")
      } else {
        enqueueSnackbar("Une erreur est survenue")
      }
    }
  }

  const submit = async () => {
    try {
      const response = await loggedApi.post('/playlist/create', {
        name,
        image,
        description
      });
      enqueueSnackbar("Nouvelle playlist créée");
      setPlaylists([...playlists, response.data.data.playList])
      setModal(null)
    } catch (e) {
      if (e?.response?.data?.error?.code === "BAD_VALUES") {
        enqueueSnackbar("Vous devez au moins entrer un nom.")
      } else {
        enqueueSnackbar("Une erreur inconnue est survenue.")
      }
    }
  }

  const submit2 = async () => {
    try {
      if (playlists.find(e => e.id === selectedPL.id).musics.filter(e => e.id === modal.id).length > 0) {
        enqueueSnackbar("Cette musique est déjà dans cette playlist.");
        return;
      }
      await loggedApi.post('/playlist/add', {
        musicId: modal.id,
        playlistId: selectedPL.id,
      });
      enqueueSnackbar("Musique ajoutée à la playlist " + selectedPL.name);
      setPlaylists(playlists.map(e => {
        if (e.id === selectedPL.id) {
          e.musics.push(musics.find(m => m.id === modal.id))
        }
        return e
      }))
      setModal(null)
    } catch (e) {
      if (e?.response?.data?.error?.code === "BAD_VALUES") {
        enqueueSnackbar("Vous devez sélectionner une playlist.")
      } else {
        enqueueSnackbar("Une erreur inconnue est survenue.")
      }
    }
  }

  return (
    <>
      {artists && musics &&
        <HeaderAndFooterLayout>
          <div className="MusicContainer">
            <div className="MusicNavbar">
              <div className="button" onClick={() => { setShow('home'); setActiveId(null); setPlaylist(null); }}>
                <Home />
                <div className="_label">Accueil</div>
              </div>
              <div className="button" onClick={() => { setShow('artist'); setActiveId(null); setPlaylist(null); }}>
                <TbMicrophone2 />
                <div className="_label">Artistes</div>
              </div>
              {user && <div className="button" onClick={() => { setShow('playlist'); setActiveId(null); setPlaylist(null); }}>
                <QueueMusic />
                <div className="_label">Playlists</div>
              </div>}
              {user && <div className="button" onClick={() => { setShow('favorites'); setActiveId(null); setPlaylist(null); }}>
                <FavoriteBorderIcon />
                <div className="_label">Aimés</div>
              </div>}
            </div>
            {show === 'home' && !activeId && <FlexLayout
              style={{
                gap: 20,
              }}
              className="music__page"
            >
              <FlexColumn className="music__content">
                <FlexLayout className="music__header">
                  <h1>Musique</h1>
                  <span>ÉCOUTEZ NOS ARTISTES</span>
                </FlexLayout>
                <FlexColumn className="music__view">
                  <MusicSectionLayout title="LES DERNIÈRES SORTIES">
                    <FlexLayout className="last__musics">
                      {orderBy(musics, 'createdAt', 'desc').slice(0, 3).map((music, i) => (
                        <FlexLayout key={'flexa' + music.id} style={{ animationDelay: i * 0.1 + 's' }} className="music__card FadeIn" onClick={() => {
                          if (!currentMusic || currentMusic.id !== music.id) {
                            setActivePlaylist(orderBy(musics, 'createdAt', 'desc'))
                            setTimeout(() => {
                              setCurrentMusic(musics.find(e => e.id === music.id))
                            }, 50)
                          }
                          else
                            togglePlayback()
                        }}>
                          <img alt="logo" src={music.image} height={50} width={50} />
                          <FlexColumn className="music__data">
                            <h2>{music.name}</h2>
                            <span>{music.musician.stageName}</span>
                          </FlexColumn>
                        </FlexLayout>
                      ))}
                    </FlexLayout>
                  </MusicSectionLayout>
                </FlexColumn>
                <FlexColumn className="music__view">
                  <MusicSectionLayout title="LES PLUS Écoutées">
                    <FlexLayout className="last__musics">
                      {orderBy(musics, 'listenAmount', 'desc').slice(0, 3).map((music, i) => (
                        <FlexLayout key={'flexa' + music.id} style={{ animationDelay: ((i * 0.1) + 0.3) + 's' }} className="music__card FadeIn" onClick={() => {
                          if (!currentMusic || currentMusic.id !== music.id) {
                            setActivePlaylist(orderBy(musics, 'listenAmount', 'desc'))
                            setTimeout(() => {
                              setCurrentMusic(musics.find(e => e.id === music.id))
                            }, 50)
                          } else togglePlayback()
                        }}>
                          <img alt="logo" src={music.image} height={50} width={50} />
                          <FlexColumn className="music__data">
                            <h2>{music.name}</h2>
                            <span>{music.musician.stageName}</span>
                          </FlexColumn>
                        </FlexLayout>
                      ))}
                    </FlexLayout>
                  </MusicSectionLayout>
                </FlexColumn>
                <FlexColumn className="music__view">
                  <MusicSectionLayout title="LES PLUS écoutés ce mois-ci">
                    <FlexLayout className="last__musics">
                      {artists.sort((c, d) =>
                        musics.filter(e => e.musicianId === d.id).reduce((b, a) => b + a.listenAmount, 0) -
                        musics.filter(e => e.musicianId === c.id).reduce((b, a) => b + a.listenAmount, 0))
                        .slice(0, 3)
                        .map((musician, i) => (
                          <React.Fragment key={'musician' + musician.id}>{buildMusicianRecap(musician, i)}</React.Fragment>
                        ))}
                    </FlexLayout>
                  </MusicSectionLayout>
                </FlexColumn>
                <FlexColumn className="music__view">
                  <MusicSectionLayout title="TOUS LES ARTISTES">
                    <div className="artistesContainer">
                      {artists.slice(0, 4).map((musician) => (
                        <React.Fragment key={'musician' + musician.id}>{buildMusicianRecap(musician)}</React.Fragment>
                      ))}
                    </div>
                  </MusicSectionLayout>
                </FlexColumn>
              </FlexColumn>
            </FlexLayout>}
            {show === 'artist' && !activeId &&
              <div className="ArtistPage">
                <div className="Head">
                  <div className="InputContainer">
                    <input type="text" placeholder="CHERCHER UN ARTISTE" value={search} onChange={(e) => setSearch(e.currentTarget.value)} />
                    <Search />
                  </div>
                  <h3>ÉCOUTEZ NOS ARTISTES</h3>
                </div>
                <div className="artistesContainer">
                  {artists.filter(e => e.stageName.toLowerCase().includes(search.toLowerCase())).map((musician) => (
                    <React.Fragment key={'musician' + musician.id}>
                      {buildMusicianRecap(musician)}
                    </React.Fragment>
                  ))}
                </div>
              </div>}
            {show === 'favorites' && !activeId && <FlexLayout
              style={{
                gap: 40,
              }}
              className="music__page"
            >
              {/* <NavBar /> */}
              <FlexColumn className="music__content">
                <FlexColumn className="music__view playlist__view__content">
                  <FlexLayout className="playlist__header">
                    <div className="playlist__img">
                      <Favorite />
                    </div>
                    <FlexColumn className="playlist__data">
                      <h1 className="playlist__title">
                        Titres aimés
                      </h1>
                      <span className="playlist__description">
                        Les titres que vous avez adoré !
                      </span>
                      <span className="playlist__info">
                        {musics.filter(e => e.isFavorite).length} musiques
                      </span>

                      <div className="musicBtn" onClick={() => setActivePlaylist(musics.filter(e => e.isFavorite))}>écouter</div>
                    </FlexColumn>
                  </FlexLayout>
                  <FlexColumn className="playlist__musics">
                    {buildMusicList(musics.filter(e => e.isFavorite), 'list', false, { type: 'favorite' })}
                  </FlexColumn>
                </FlexColumn>
              </FlexColumn>
            </FlexLayout>}
            {activeId && <div className="artiste__page__id">
              <div className="artiste__header" style={{ backgroundImage: 'url(' + currentArtist.banner + ')' }}>
                <FlexLayout className="artiste__data">
                  <div className="artiste__pp_wrapper">
                    <img
                      alt="artiste-image"
                      height={150}
                      width={150}
                      src={currentArtist.profilePicture}
                    />
                  </div>
                  <FlexColumn className="artiste__name__listeners">
                    <span className="artiste__name">{currentArtist.stageName}</span>
                    <span className="artiste__listeners">
                      {musics.filter(e => e.musicianId === activeId).reduce((b, a) => b + a.listenAmount, 0)} auditeurs totaux
                    </span>
                    {currentArtist.youtubeLink && <Link to={currentArtist.youtubeLink} className="Youtube">YOUTUBE <img src="/assets/music/youtube.webp" /></Link>}
                  </FlexColumn>
                </FlexLayout>
                <div className="artiste__links"></div>
              </div>
              <FlexColumn className="artiste__content">
                {
                  buildMusicList(musics.filter(e => e.musicianId === activeId), 'list', false, { type: 'mostListened', id: activeId })
                }
              </FlexColumn>
            </div>}
            {show === 'playlist' && !activeId && !playlist && <div className="Playlist">
              <div className="PlaylistCard" onClick={() => setModal({ type: 'createPL' })}>
                <div className="PlaylistImage">
                  <Add />
                </div>
                <div className="PlaylistName">Nouvelle playlist</div>
              </div>
              {
                playlists.map(e => <div className="PlaylistCard" key={'playlist' + e.id} onClick={() => setPlaylist(e)}>
                  <div className="PlaylistImage">
                    {
                      e?.image ? <img src={e.image}></img> : <div />
                    }
                  </div>
                  <div className="PlaylistName">{e.name}</div>
                </div>)
              }
            </div>}
            {modal && modal?.type === 'createPL' && <Modal
              open={modal ? true : false}
              onClose={() => { setModal(false); setName(''); setDescription(''); setImage('') }}
            >
              <div className="CreateModal">
                <h3>Créer une playlist</h3>
                <div className="label">Nom</div>
                <input type="text" value={name} onChange={(e) => setName(e.currentTarget.value)} />
                <div className="label">Lien d'image  <Tooltip style={{ marginLeft: 5 }} title={"Lien vers une image hébergée en ligne. Cela peut être une image enregistrée sur Discord par exemple."}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="square">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </Tooltip></div>
                <input type="text" value={image} onChange={(e) => setImage(e.currentTarget.value)} />
                <div className="label">Description</div>
                <input type="text" value={description} onChange={(e) => setDescription(e.currentTarget.value)} />
                <div className="button" onClick={() => submit()}>Créer</div>
              </div>
            </Modal>}
            {modal && modal?.type === 'addPL' && <Modal
              open={modal ? true : false}
              onClose={() => { setModal(false); setName(''); setDescription(''); setImage(''); setSelectedPL(null); handleCloseModal(); }}
            >
              <div className="CreateModal">
                <h3>{musics.find(e => e.id === modal.id).name.toUpperCase()}</h3>
                <div className="label">Ajouter à une playlist</div>
                <div className="ModalSelect">
                  <Autocomplete
                    value={selectedPL ?? null}
                    options={
                      [...playlists]
                    }
                    renderInput={(params) => <TextField {...params} />}
                    getOptionLabel={(e: any) => e?.name ?? ""}
                    onChange={(e, _value) => {
                      setSelectedPL(_value)
                    }}
                  />
                </div>
                <div className="button" onClick={() => submit2()}>Ajouter</div>
                {modal?.showRemove && <div className="button" style={{ background: 'linear-gradient(180deg, #AC0006 0%, #590004 100%)' }} onClick={async () => {
                  try {
                    await loggedApi.post('/playlist/remove', {
                      musicId: modal.id,
                      playlistId: playlist?.id,
                    });
                    setPlaylists(playlists.map(e => {
                      if (e.id === playlist.id) {
                        e.musics = e.musics.filter(m => m.id !== modal.id)
                      }
                      return e
                    }))
                    enqueueSnackbar(`${musics.find(e => e.id === modal.id).name} a été retiré de la playlist ${playlist.name}`)
                    setModal(null)
                  } catch (e) {
                    console.log(e)
                    enqueueSnackbar("Une erreur inconnue est survenue.")
                    setModal(null)
                  }
                }}>Retirer de {playlist?.name}</div>}
              </div>
            </Modal>}
            {playlist && <FlexLayout
              style={{
                gap: 40,
              }}
              className="music__page"
            >
              <FlexColumn className="music__content">
                <FlexColumn className="music__view playlist__view__content">
                  <FlexLayout className="playlist__header">
                    <div className="playlist__img">
                      <img src={playlist?.image} />
                    </div>
                    <FlexColumn className="playlist__data">
                      <h1 className="playlist__title">
                        {playlist.name}
                      </h1>
                      <span className="playlist__description">
                        {playlist.name ?? ''}
                      </span>
                      <span className="playlist__info">
                        {playlist.musics.length} musiques
                      </span>
                      <div className="musicBtn" onClick={() => setActivePlaylist(playlist.musics)}>écouter</div>
                    </FlexColumn>
                  </FlexLayout>
                  <FlexColumn className="playlist__musics">
                    {buildMusicList(playlist.musics, 'list', true, { type: 'playlist', musics: playlist.musics })}
                  </FlexColumn>
                </FlexColumn>
              </FlexColumn>
            </FlexLayout>}
          </div>
        </HeaderAndFooterLayout>
      }
    </>
  );
};

export default Music;
