import { useContext, useEffect, useState } from "react";
import HeaderAndFooterLayout from "../layouts/HeaderAndFooterLayout";
import StoreContext from "../StoreContext";

export const Streamers: React.FC = () => {
  const { streamers: streamers, streaming: streaming } = useContext(StoreContext)
  const [show, setShow] = useState('streaming')
  const [offset1, setOffset1] = useState(0);
  const [offset2, setOffset2] = useState(0);

  return (
    <HeaderAndFooterLayout>
      {show === 'streamers' &&
        <div className="streamers__page">
          <div className="title">
            <h1>Streaming</h1>
            <div>
              <h2 className="stream">Suivez nos streameurs</h2>
              <h2 className="twitch">Sur twitch</h2>
            </div>
          </div>
          <div className="category">
            <div className="live-btn" onClick={() => { setShow('streaming') }}>En direct</div>
            <div className="all-streamers --selected">Tout les streamers</div>
          </div>
          <div className="logo-pseudo">
            {streamers.map((e) => <a href={e.twitchUrl} target="_bank">
              <img src={e.twitchLogo} />
              <p className="pseudo">{e.twitchName}</p>
            </a>)}
          </div>
          <h3 className="live">En direct</h3>
          <div className="carousel-container">
            <div className="arrow-btn-left">
              <img src="/assets/streamers/arrow.png" style={{ transform: 'rotate(180deg)' }} onClick={() => {
                if (offset1 === 0) return
                setOffset1(offset1 - 1)
              }} />
            </div>
            <div className="arrow-btn-right">
              <img src="/assets/streamers/arrow.png" onClick={() => {
                if (offset1 === streaming.length - 1) return
                setOffset1(offset1 + 1)
              }} />
            </div>
            <div className="carousel">
              <div className="videos">
                {streaming.map((e, index) => (
                  <a href={e.twitchUrl} className="streaming" style={{ transform: `translateX(-${offset1 * 100}%)` }} target="_blank">
                    <div className="viewers">{e.viewCount} spectateurs</div>
                    <img src={e.twitchThumbnail} alt="" className="thumbnail" />
                    <img src="/assets/streamers/live.png" alt="logo-live" className="logo-live" />
                    <div className="infos">
                      <div className="left">
                        <img src={e.twitchLogo} alt="" className="logo" />
                      </div>
                      <div className="right">
                        <h4 className="title-stream">{e.twitchLiveTitle}</h4>
                        <p className="title-gamer">{index} {e.twitchName}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      }
      {
        show === 'streaming' &&
        <div className="streamers__page">
          <div className="title">
            <h1>Streaming</h1>
            <div>
              <h2 className="stream">Suivez nos streameurs</h2>
              <h2 className="twitch">Sur twitch</h2>
            </div>
          </div>

          <div className="category">
            <div className="live-btn --selected">En direct</div>
            <div className="all-streamers" onClick={() => { setShow('streamers') }}>Tout les streamers</div>
          </div>

          <div className="container main _streaming">
            {streaming.map((e, i) => (
              <a className="streaming ScaleHover FadeIn" style={{ animationDelay: i * 0.1 + 's' }} href={e.twitchUrl} target="_blank">
                <div className="viewers">{e.viewCount} spectateurs</div>
                <img src={e.twitchThumbnail} alt="" className="thumbnail" />
                <img src="/assets/streamers/live.png" alt="logo-live" className="logo-live" />
                <div className="infos">
                  <div className="left">
                    <img src={e.twitchLogo} alt="" className="logo" />
                  </div>
                  <div className="right">
                    <h4 className="title-stream">{e.twitchLiveTitle}</h4>
                    <p className="title-gamer">{e.twitchName}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>


          <h3 className="streamers">Découvrez nos streamers</h3>
          <div className="carousel-container _streamers">
            <div className="arrow-btn-left">
              <img src="/assets/streamers/arrow.png" style={{ transform: 'rotate(180deg)' }} onClick={() => {
                if (offset2 === 0) return
                setOffset2(offset2 - 1)
              }} />
            </div>
            <div className="arrow-btn-right">
              <img src="/assets/streamers/arrow.png" onClick={() => {
                if (offset2 === streaming.length - 1) return
                setOffset2(offset2 + 1)
              }} />
            </div>
            <div className="carousel">
              <div className="logos">
                {streamers.map((e, i) => (
                  <a href={e.twitchUrl} className="streaming FadeIn" style={{ transform: `translateX(-${offset2 * 100}%)`, animationDelay: i * 0.1 + 's' }} target="_blank">
                    <img src={e.twitchLogo} className="logo-live-stream" />
                    <p className="title-logo">{e.twitchName}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    </HeaderAndFooterLayout>
  )
}
