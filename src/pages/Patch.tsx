import React, { useContext, useState } from "react";
import StoreContext from "../StoreContext";
import HeaderAndFooterLayout from "../layouts/HeaderAndFooterLayout";
import { FlexColumn, FlexLayout } from "../layouts/Flex";
import dayjs from "dayjs";

export const Patch: React.FC = () => {
  const { patchNotes } = useContext(StoreContext);
  const [patch, setPatch] = useState(patchNotes[0]);
  dayjs.locale("fr");

  return (
    <HeaderAndFooterLayout>
      <div className="patch">
        <FlexLayout
          style={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="header__patch"
        >
          <h1>NOUVEAUTÉS</h1>
          <span>ACTUALITÉS DU SERVEUR</span>
        </FlexLayout>

        <FlexLayout className="patch__content">
          <div className="img__wrapper">
            <img src={patch?.image} alt="" />
          </div>
          <FlexColumn className="">
            {patchNotes.map((p, i) => (
              <div onClick={() => setPatch(p)}>
                <FlexColumn
                  className={
                    "patch FadeIn" + (p?.id === patch?.id ? " --selected" : "")
                  }
                  style={{ animationDelay: i * 0.1 + "s" }}
                >
                  <p>PATCH NOTE</p>
                  <span>{dayjs(p.date).format("DD MMMM")}</span>
                </FlexColumn>
              </div>
            ))}
          </FlexColumn>
        </FlexLayout>
      </div>
    </HeaderAndFooterLayout>
  );
};
