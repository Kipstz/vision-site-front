import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StoreContext from "../StoreContext";
import { motion } from "framer-motion";
import HeaderAndFooterLayout from "../layouts/HeaderAndFooterLayout";
import Button from "../components/UI/Button";
import { FlexLayout } from "../layouts/Flex";
import clsx from "clsx";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(StoreContext);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  const PagerItem = (
    props: any,
  ) => {
    const { title, href, description, bgImg, className, style, ...rest } = props

    return (
      <section
        {...rest}
        className={clsx('pager__item', className)}
        style={{
          ...style,
        }}
        onClick={() => navigate(href)}
      >
        <img src={`${bgImg}`} alt="" />
        <div>
          <h1 className="item__title">{title}</h1>
        </div>
        <p className="item__description">{description}</p>
      </section>
    )
  }

  return (
    <HeaderAndFooterLayout>
      <main className="HomePage">
        <div className="left">
          <h1>
            <img alt="logo" height={90} width={100} src="/assets/logo.svg" style={{ position: 'relative', left: 25, top: 20 }} />
            ision FA
          </h1>


          <span className="description">
            UNE VISION DIFFÉRENTE DU ROLEPLAY<br />
            <span style={{ fontSize: 23, marginTop: 10 }}>Disponible</span>
          </span>

          <Button style={{ height: 100 }} onClick={() => navigate('/auth')} _type="PRIMARY">
            JOUER
          </Button>
        </div>

        <div className="right">
          <div className="first__trailer">
            <iframe width="860" height="470" src="https://www.youtube.com/embed/c8DwEZKd6-g" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </div>
        </div>
      </main>

      <section className="pager">
        <FlexLayout className="top">
          <PagerItem
            description="ANIMATIONS ET ACTIVITÉS DE LA SEMAINE"
            title="EVENEMENTS"
            className="events"
            bgImg="/assets/home/events.jpg"
            href="/events"
            style={{
              flex: 1.2,
              backgroundColor: '#33963c60',
            }}
          />
          <PagerItem
            description="ECOUTEZ NOS ARTISTES"
            title="MUSIQUE"
            className="music"
            bgImg="/assets/home/music.jpg"
            href="/music"
            style={{
              flex: 0.8,
              backgroundColor: '#FF970060',
            }}
          />
          <PagerItem
            description="NEWS"
            title="NEWS"
            className="news"
            bgImg="/assets/home/news.png"
            href="/news"
            style={{
              flex: 0.8,
              backgroundColor: '#FF000060',
            }}
          />
        </FlexLayout>
        <FlexLayout className="bottom">
          <PagerItem
            description="CENTRALISATION ET AUTOMATISATION DES OUTILS DE JEU"
            title="PANEL"
            className="panel"
            bgImg="/assets/home/panel.png"
            href="/panel"
            style={{
              flex: 2,
              backgroundColor: '#1B00FF60',
            }}
          />
          <PagerItem
            description="SUIVEZ NOS STREAMERS"
            title="TWITCH"
            className="twitch"
            bgImg="/assets/home/twitch.png"
            href="/streamers"
            style={{
              flex: 1,
              backgroundColor: '#FF00F760',
            }}
          />
        </FlexLayout>
      </section>
    </HeaderAndFooterLayout>
  );
};
