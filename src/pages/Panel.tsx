import React, { useContext } from "react";
import HeaderAndFooterLayout from "../layouts/HeaderAndFooterLayout";
import StoreContext from "../StoreContext";

export const Panel: React.FC = () => {
  const { panelElements } = useContext(StoreContext)
  return (
    <HeaderAndFooterLayout>
      <div className="panels__wrapper">
        <div className="top">
          <div className="_container">
            <h3 className="titre-panel">SERVICES PUBLICS </h3>
            <div className="sub-container">
              {
                panelElements.filter(e => e.category === 'public').map(e => (
                  <div className="link-container" style={{
                    background: `${e.color}`
                  }}>
                    <a href={e.link} target="_blank">
                      <div className="link-element">
                        <div className="image-container"><img src={e.image} alt="logo LSPD" className="pictures-logo" /></div>
                        <span>{e.label.toUpperCase()}</span>
                      </div>
                    </a>
                  </div>
                ))
              }
            </div>
          </div>

          <div className="_container" style={{
            marginLeft: 'auto'
          }}>
            <h3 className="titre-panel" style={{
              textAlign: 'end'
            }}>LIFEINVADER</h3>
            <div className="sub-container">
              {
                panelElements.filter(e => e.category === 'lifeinvader').map(e => (
                  <div className="link-container" style={{
                    background: `${e.color}`
                  }}>
                    <a href={e.link} target="_blank">
                      <div className="link-element">
                        <div className="image-container"><img src={e.image} alt="logo LSPD" className="pictures-logo" /></div>
                        <span>{e.label.toUpperCase()}</span>
                      </div>
                    </a>
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        <div className="bottom">
        <div className="_container">
            <h3 className="titre-panel">ENTREPRISES</h3>
            <div className="sub-container">
              {
                panelElements.filter(e => e.category === 'company').map(e => (
                  <div className="link-container" style={{
                    background: `${e.color}`
                  }}>
                    <a href={e.link} target="_blank">
                      <div className="link-element">
                        <div className="image-container"><img src={e.image} alt="logo LSPD" className="pictures-logo" /></div>
                        <span>{e.label.toUpperCase()}</span>
                      </div>
                    </a>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </HeaderAndFooterLayout>
  )
};
