import { useContext, useEffect, useState } from "react";
import HeaderAndFooterLayout from "../layouts/HeaderAndFooterLayout";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import { api } from "../axios";
import { FlexColumn, FlexLayout } from "../layouts/Flex";
import { Link, useParams } from "react-router-dom";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import StoreContext from "../StoreContext";

export const SelectedNews: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [allNews, setAllNews] = useState<any>(null);
  const { id } = useParams();
  const index = allNews?.findIndex(e => e.id === selectedNews.id)
  const { serverType } = useContext(StoreContext);

  const fetchData = async (forceId?: string) => {
    const response = await api.get(`/news?id=${forceId ?? id}`);
    setSelectedNews(response.data?.data?.news ?? null);

    if (!allNews) {
      const response2 = await api.get(`/news/last?limit=100&serverType=${serverType}`);
      setAllNews(response2.data?.data?.news?.filter(e => e.type !== 'video') ?? [])
    }
  }

  useEffect(() => {
    fetchData().catch((e) => {
      console.log(e)
      enqueueSnackbar('Une erreur est survenue pendant la récupération de cet article.')
    })
  }, [id])

  const handleNextNews = () => {
    const newNews = allNews?.find((e, i) => i === (index + 1));
    if (!newNews) return;
    window.history.pushState('Vision RP', null, newNews.id);
    fetchData(newNews.id).catch((e) => {
      console.log(e)
      enqueueSnackbar('Une erreur est survenue pendant la récupération de cet article.')
    })
  }

  const handlePreviousNews = () => {
    const newNews = allNews?.find((e, i) => i === (index - 1));
    if (!newNews) return;
    window.history.pushState('Vision RP', null, newNews.id);
    fetchData(newNews.id).catch((e) => {
      console.log(e)
      enqueueSnackbar('Une erreur est survenue pendant la récupération de cet article.')
    })
  }

  return (
    <HeaderAndFooterLayout>
      <FlexColumn className="weazel__page">
        <FlexLayout className="weazel__header">
          <h1>WEAZEL NEWS</h1>
          <span>ACTUALITÉS QUOTIDIENNES</span>
        </FlexLayout>

        {selectedNews && selectedNews.type === 'text' && <FlexColumn className="article">
          <div className="article__img">
            <img src={selectedNews.media} alt="" />
          </div>

          <FlexColumn className="article__content">
            <div className="CustomContainer">
              <Link to={'/news'}><div className="Back"><ArrowBackIos /> RETOUR</div></Link>
              <div className="Navigate">
                <div
                  className={index === 0 ? 'Disabled' : ''}
                  onClick={handlePreviousNews}
                >
                  <ArrowBackIos />
                </div>
                <div
                  className={index === allNews?.length - 1 ? 'Disabled' : ''}
                  onClick={handleNextNews}
                >
                  <ArrowForwardIos />
                </div>
              </div>
            </div>
            <h1 className="article__title">
              {selectedNews.title}
            </h1>
            <span className="article__data">
              {dayjs(selectedNews.date).format('DD.MM.YYYY - HH:mm')}, {selectedNews.character.firstName} {selectedNews.character.lastName}
            </span>

            <FlexColumn className="article__text">
              {
                selectedNews.content
              }
            </FlexColumn>
          </FlexColumn>
        </FlexColumn>}

        {selectedNews && selectedNews.type === 'image' && <FlexColumn className="article">
          <FlexColumn className="article__content">
            <div className="CustomContainer">
              <Link to={'/news'}><div className="Back"><ArrowBackIos /> RETOUR</div></Link>
              <div className="Navigate">
                <div
                  className={index === 0 ? 'Disabled' : ''}
                  onClick={handlePreviousNews}
                >
                  <ArrowBackIos />
                </div>
                <div
                  className={index === allNews?.length - 1 ? 'Disabled' : ''}
                  onClick={handleNextNews}
                >
                  <ArrowForwardIos />
                </div>
              </div>
            </div>
            <h1 className="article__title">
              {selectedNews.title}
            </h1>
            <span className="article__data">
              {dayjs(selectedNews.date).format('DD.MM.YYYY - HH:mm')}, {selectedNews.character.firstName} {selectedNews.character.lastName}
            </span>
          </FlexColumn>
          <img className="journal" src={selectedNews.media} alt="" />
        </FlexColumn>}
      </FlexColumn>
    </HeaderAndFooterLayout>
  )
}
