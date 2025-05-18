import { useContext, useEffect, useState } from "react";
import HeaderAndFooterLayout from "../layouts/HeaderAndFooterLayout";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import { api } from "../axios";
import { FlexColumn, FlexLayout } from "../layouts/Flex";
import { BsJournal } from 'react-icons/bs'
import { Link } from "react-router-dom";
import StoreContext from "../StoreContext";

export const News: React.FC = () => {
  const [news, setNews] = useState<any>([]);
  const { serverType, setServerType } = useContext(StoreContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/news/last?limit=100&serverType=${serverType}`);
      setNews(response.data?.data?.news ?? [])
    }
    fetchData().catch(() => {
      enqueueSnackbar('Une erreur est survenue pendant la récupération des events.')
    })
  }, [serverType])

  return (
    <HeaderAndFooterLayout>
      <FlexColumn className="weazel__home">
        <FlexLayout className="weazel__header">
          <div className="div">
            <h1>WEAZEL NEWS</h1>
            <h2>ACTUALITÉS QUOTIDIENNES</h2>
          </div>
          <div className="TypeSelector">
            <div className={"El" + (serverType === 0 ? ' Selected' : '')} onClick={() => setServerType(0)}>WL</div>
            <div className={"El" + (serverType === 1 ? ' Selected' : '')} onClick={() => setServerType(1)}>FA</div>
          </div>
        </FlexLayout>

        <FlexColumn
          style={{
            gap: 20,
          }}
        >
          <h3 className="last__actus">LES DERNIÈRES ACTUALITÉS</h3>
          <FlexLayout className="last__actus__wrapper">
            {news.slice(0, 3).map((n) => {
              if (n.type === 'text') return <div className="actus FadeIn">
                <Link to={`/news/${n.id}`}>
                  <div className="actus__img">
                    <img alt="artiste-img" src={n.media} />
                  </div>
                  <FlexColumn>
                    <h2 className="actus__title">
                      {n.title}
                    </h2>
                    <span className="actus__data">
                      {dayjs(n.date).format('DD.MM.YYYY - HH:mm')}, {n.character.firstName} {n.character.lastName}
                    </span>
                  </FlexColumn>
                  <BsJournal />
                </Link>
              </div>
              if (n.type === 'image') return <div className="actus FadeIn">
                <Link to={`/news/${n.id}`}>
                  <div className="actus__img">
                    <img alt="artiste-img" src={n.media} />
                  </div>
                  <FlexColumn>
                    <h2 className="actus__title">
                      {n.title}
                    </h2>
                    <span className="actus__data">
                      {dayjs(n.date).format('DD.MM.YYYY - HH:mm')}, {n.character.firstName} {n.character.lastName}
                    </span>
                  </FlexColumn>
                  <BsJournal />
                </Link>
              </div>
              if (n.type === 'video') return <div className="videoContainer FadeIn">
                <iframe src={'https://www.youtube.com/embed/' + n.media.split('/').pop()} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" frameBorder="0" allowFullScreen></iframe>
                <div className="infos">
                  <div className="title">{n.title}</div>
                  <div className="vision">Vision | Weazel News</div>
                </div>
              </div>
            })}

          </FlexLayout>
        </FlexColumn>

        <FlexLayout className="actus__bottom__wrapper">
          <FlexColumn className="actus__videos">
            <h2>VIDÉOS</h2>

            <FlexColumn className="actus__video__wrapper">
              {
                news.filter((n) => n.type === 'video').map((n) => (
                  <div className="actus__video --video">
                    <div className="iframe_container">
                      <iframe src={'https://www.youtube.com/embed/' + n.media.split('/').pop()} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" frameBorder="0" allowFullScreen></iframe>
                    </div>
                    <div className="infos">
                      <div className="title">{n.title}</div>
                      <div className="vision">Vision | Weazel News</div>
                    </div>
                  </div>
                ))
              }

            </FlexColumn>
          </FlexColumn>
          <FlexColumn className="actus__articles">
            <h2>Articles</h2>
            <FlexColumn className="actus__articles__wrapper">
              {
                news.filter((n) => n.type === 'text' || n.type === 'image').map((n, i) => (
                  <div className="actus FadeIn " style={{ animationDelay: i * 0.1 + 's' }}>
                    <Link to={`/news/${n.id}`}>
                      <div className="actus__img">
                        <img alt="artiste-img" src={n.media} />
                      </div>
                      <h2 className="actus__title">
                        {n.title}
                      </h2>
                      <span className="actus__data">
                        {dayjs(n.date).format('DD.MM.YYYY - HH:mm')}, {n.character.firstName} {n.character.lastName}
                      </span>
                    </Link>
                  </div>
                ))
              }

            </FlexColumn>
          </FlexColumn>
        </FlexLayout>
      </FlexColumn>
    </HeaderAndFooterLayout>
  )
}
