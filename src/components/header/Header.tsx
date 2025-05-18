import { Link } from "react-router-dom";
import { Dropdown } from "../dropdown/Dropdown";
import Logo from "../misc/Logo";
import { useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import StoreContext from "../../StoreContext";

const Header = () => {
  const [mobileHeader, setMobileHeader] = useState(false);
  const { user, streaming } = useContext(StoreContext);

  return (
    <>
      <div className="mobileHeader">
        <div onClick={() => setMobileHeader(!mobileHeader)}>
          <MenuIcon
            style={{
              width: 40,
              height: 50,
              cursor: "pointer",
              color: "white",
            }}
          />
        </div>
        <div className="right">
          <Link to={"/auth"}>
            {user ? (
              <div className="logged">
                <img
                  src={`https://cdn.discordapp.com/avatars/${user?.discordId}/${user?.discordAvatar}.jpg`}
                />
                <div className="name">{user?.discordName?.toUpperCase()}</div>
              </div>
            ) : (
              <div>
                <span>JOUEZ GRATUITEMENT {user?.name}</span>
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 46 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.1121 0.760742C10.8897 0.760742 0.992188 10.6804 0.992188 22.9028C0.992188 35.1252 10.8897 45.0448 23.1121 45.0448C35.3566 45.0448 45.2762 35.1252 45.2762 22.9028C45.2762 10.6804 35.3566 0.760742 23.1121 0.760742ZM38.4565 14.046H31.9246C31.2161 11.2782 30.1975 8.62116 28.869 6.1634C32.908 7.55392 36.3113 10.3521 38.4565 14.046ZM23.1342 5.27772C24.9941 7.96112 26.4212 10.9199 27.3633 14.046H18.9051C19.8472 10.9199 21.2743 7.96112 23.1342 5.27772ZM5.99629 27.3312C5.62384 25.8842 5.43049 24.3969 5.42059 22.9028C5.42059 21.375 5.64201 19.8915 5.99629 18.4744H13.4803C13.2874 19.9429 13.1839 21.4217 13.1703 22.9028C13.1703 24.4084 13.3032 25.8698 13.4803 27.3312H5.99629ZM7.81193 31.7596H14.3438C15.0524 34.5273 16.0709 37.1844 17.3994 39.6422C13.3563 38.2591 9.95056 35.4591 7.81193 31.7596ZM14.3438 14.046H7.81193C9.95056 10.3465 13.3563 7.54641 17.3994 6.1634C16.063 8.65636 15.0368 11.3036 14.3438 14.046ZM23.1342 40.5278C21.2743 37.8444 19.8472 34.8857 18.9051 31.7596H27.3633C26.4212 34.8857 24.9941 37.8444 23.1342 40.5278ZM28.3155 27.3312H17.953C17.7343 25.8648 17.6159 24.3853 17.5987 22.9028C17.5987 21.3971 17.7537 19.9136 17.953 18.4744H28.3155C28.5147 19.9136 28.6697 21.3971 28.6697 22.9028C28.6697 24.4084 28.5147 25.8698 28.3155 27.3312ZM28.869 39.6422C30.2054 37.1492 31.2316 34.502 31.9246 31.7596H38.4565C36.3113 35.4535 32.908 38.2516 28.869 39.6422ZM32.7881 27.3312C32.9653 25.8698 33.0981 24.4084 33.0981 22.9028C33.0981 21.3971 32.9653 19.9357 32.7881 18.4744H40.2722C40.6264 19.8915 40.8478 21.375 40.8478 22.9028C40.8478 24.4306 40.6264 25.9141 40.2722 27.3312H32.7881Z"
                    fill="#E8E8E8"
                  />
                </svg>
              </div>
            )}
          </Link>
        </div>
      </div>
      <header className={"main" + (mobileHeader ? " isOpen" : "")}>
        <ul className="middle">
          <img src="/assets/FRANCE.png" className="france" />
          <Link to={"/"}>
            <Logo width={50} height={50} />
          </Link>
          <Dropdown
            title="RESEAUX"
            items={[
              {
                href: "https://twitter.com/_VisionRP",
                label: "Twitter",
              },
              {
                href: "https://www.youtube.com/@VisionRP_",
                label: "Youtube",
              },
              {
                href: "https://discord.gg/visionrp",
                label: "Discord",
              },
              {
                href: "https://www.tiktok.com/@visionrp_",
                label: "TikTok",
              },
            ]}
          />
          <Link to={"/streamers"}>
            <span>STREAMERS</span>
            <div
              style={{
                ["--color" as string]: streaming.length > 0 ? "green" : "red",
              }}
              className="__icon red"
            ></div>
          </Link>
          <Link to={"/patch"}>
            <span>NOUVEAUTÉS</span>
            <div
              style={{
                ["--color" as string]: "green",
              }}
              className="__icon green"
            ></div>
          </Link>
          <Dropdown
            title="COMMUNAUTÉ"
            items={[
              {
                href: "/rules",
                label: "Règlement",
              },
              {
                href: "/music",
                label: "Musique",
              },
              {
                href: "/news",
                label: "Weazel News",
              },
              {
                href: "/cayo-news",
                label: "Cayo News",
              },
              {
                href: "/events",
                label: "EVENEMENTS",
              },
              {
                href: "/bestof",
                label: "BEST OF",
              },
            ]}
          />
          <Link to={"https://visionboutique.tebex.io/"} target="blank">
            <span>BOUTIQUE</span>
          </Link>
          {user?.role <= 1 ? (
            <Link to={"/admin"}>GESTION STAFF</Link>
          ) : (
            <Link to={"https://discord.gg/visionrp"}>NOUS CONTACTER</Link>
          )}
        </ul>
        <div className="right">
          <Link to={"/auth"}>
            {user ? (
              <div className="logged">
                <img
                  src={`https://cdn.discordapp.com/avatars/${user?.discordId}/${user?.discordAvatar}.jpg`}
                  onError={(e) => {
                    e.currentTarget.src = "./assets/discordblue.png";
                    e.currentTarget.onerror = () => null;
                  }}
                />
                <div className="name">{user?.discordName?.toUpperCase()}</div>
              </div>
            ) : (
              <div style={{ padding: "0px 20px" }}>
                <span>JOUEZ GRATUITEMENT {user?.name}</span>
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 46 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.1121 0.760742C10.8897 0.760742 0.992188 10.6804 0.992188 22.9028C0.992188 35.1252 10.8897 45.0448 23.1121 45.0448C35.3566 45.0448 45.2762 35.1252 45.2762 22.9028C45.2762 10.6804 35.3566 0.760742 23.1121 0.760742ZM38.4565 14.046H31.9246C31.2161 11.2782 30.1975 8.62116 28.869 6.1634C32.908 7.55392 36.3113 10.3521 38.4565 14.046ZM23.1342 5.27772C24.9941 7.96112 26.4212 10.9199 27.3633 14.046H18.9051C19.8472 10.9199 21.2743 7.96112 23.1342 5.27772ZM5.99629 27.3312C5.62384 25.8842 5.43049 24.3969 5.42059 22.9028C5.42059 21.375 5.64201 19.8915 5.99629 18.4744H13.4803C13.2874 19.9429 13.1839 21.4217 13.1703 22.9028C13.1703 24.4084 13.3032 25.8698 13.4803 27.3312H5.99629ZM7.81193 31.7596H14.3438C15.0524 34.5273 16.0709 37.1844 17.3994 39.6422C13.3563 38.2591 9.95056 35.4591 7.81193 31.7596ZM14.3438 14.046H7.81193C9.95056 10.3465 13.3563 7.54641 17.3994 6.1634C16.063 8.65636 15.0368 11.3036 14.3438 14.046ZM23.1342 40.5278C21.2743 37.8444 19.8472 34.8857 18.9051 31.7596H27.3633C26.4212 34.8857 24.9941 37.8444 23.1342 40.5278ZM28.3155 27.3312H17.953C17.7343 25.8648 17.6159 24.3853 17.5987 22.9028C17.5987 21.3971 17.7537 19.9136 17.953 18.4744H28.3155C28.5147 19.9136 28.6697 21.3971 28.6697 22.9028C28.6697 24.4084 28.5147 25.8698 28.3155 27.3312ZM28.869 39.6422C30.2054 37.1492 31.2316 34.502 31.9246 31.7596H38.4565C36.3113 35.4535 32.908 38.2516 28.869 39.6422ZM32.7881 27.3312C32.9653 25.8698 33.0981 24.4084 33.0981 22.9028C33.0981 21.3971 32.9653 19.9357 32.7881 18.4744H40.2722C40.6264 19.8915 40.8478 21.375 40.8478 22.9028C40.8478 24.4306 40.6264 25.9141 40.2722 27.3312H32.7881Z"
                    fill="#E8E8E8"
                  />
                </svg>
              </div>
            )}
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
