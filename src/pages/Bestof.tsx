import React, { useContext, useState } from "react";
import StoreContext from "../StoreContext";
import HeaderAndFooterLayout from "../layouts/HeaderAndFooterLayout";
import { FlexColumn, FlexLayout } from "../layouts/Flex";
import dayjs from "dayjs";

export const Bestof: React.FC = () => {
  const { bestof } = useContext(StoreContext);
  const [patch, setPatch] = useState(bestof[0])
  dayjs.locale('fr')

  return (
    <HeaderAndFooterLayout>
      <div className="patch">
        <FlexLayout
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          className="header__patch"
        >
          <h1>BEST OF</h1>
          <span>LES BEST OF DU SERVEUR</span>
        </FlexLayout>

        <FlexLayout className="patch__content">
          <div className="img__wrapper">
            <iframe src={patch?.url} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" frameBorder="0" allowFullScreen></iframe>
          </div>
          <FlexColumn className="last__patchs">
            {bestof.map((p, i) => <div onClick={() => setPatch(p)}>
              <FlexColumn className={"patch FadeIn " + (p?.id === patch?.id ? ' --selected' : '')} style={{ animationDelay: i * 0.1 + 's' }}>
                <p>BEST OF</p>
                <span>#{p.index}</span>
              </FlexColumn>
            </div>)
            }
          </FlexColumn>
        </FlexLayout>
      </div>
    </HeaderAndFooterLayout>
  );
};
