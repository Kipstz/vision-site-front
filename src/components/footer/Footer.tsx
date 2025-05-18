import { Link } from "react-router-dom"
import { FlexColumn, FlexLayout } from "../../layouts/Flex"

const Footer = () => {
  return (
    <footer>
      <FlexColumn className="top">
        <div className="logo__wrapper">
          <img src="/assets/logo.svg" width={75} height={75} alt="logo" />
        </div>
        <span className="credits">Vision Roleplay n'est pas affilié à Take-Two, Rockstar North interactive ou tout autre détenteur de droits.<br /> Tous droits réservés à leurs propriétaires respectifs.</span>
        <span className="credits vision">© 2023. Tous droits réservés à Gamingo TV.</span>
      </FlexColumn>

      <FlexLayout className="middle">
        <Link to={import.meta.env.VITE_BASE_URL + '/confidentialite.pdf'} target="_blank">Politique de confidentialité</Link>
        <Link to={'/legal'}>Mentions légales</Link>
      </FlexLayout>

      <FlexLayout className="bottom">
        <div className="wrapper">
          <img src="/assets/footer/pegi.jfif" alt="pegi-16" width={70} height={70} />
        </div>
        <div className="wrapper">
          <img
            src="/assets/footer/violence.jfif"
            alt="pegi-16"
            width={70}
            height={70}
          />
        </div>
        <div className="wrapper">
          <img
            src="/assets/footer/achats.jfif"
            alt="pegi-16"
            width={70}
            height={70}
          />
        </div>
        <div className="wrapper">
          <img src="/assets/footer/usk.png" alt="pegi-16" width={70} height={70} />
        </div>
      </FlexLayout>
    </footer>
  )
}

export default Footer
