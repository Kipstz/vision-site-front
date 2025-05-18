import React, { useContext, useState } from "react";
import StoreContext from "../StoreContext";
import HeaderAndFooterLayout from "../layouts/HeaderAndFooterLayout";
import { FlexColumn, FlexLayout } from "../layouts/Flex";
import dayjs from "dayjs";

export const Legal: React.FC = () => {
  const { bestof } = useContext(StoreContext);
  const [patch, setPatch] = useState(bestof[0])
  dayjs.locale('fr')

  return (
    <HeaderAndFooterLayout>
      <div className="legal">
        <h3>MENTIONS LÉGALES</h3>

        <span>
          Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique,
          il est précisé aux utilisateurs du site VisionRP l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
        </span>

        <h3>Edition du site</h3>

        <span>Le présent site, accessible à l’URL https://visionrp.fr (le « Site »), est édité par :</span>

        <span>Gamingo TV, société au capital de 1000 euros, inscrite au R.C.S. de TOULOUSE sous le numéro Toulouse B 903 811 586, dont le siège social est situé au 78 ALL JEAN JAURES 31000 TOULOUSE, représenté(e) par Adil BENYAHIA dûment habilité(e)</span>

        <h3>Hébergement</h3>

        <span>Le Site est hébergé par la société OVH SAS, situé 2 rue Kellermann - BP 80157 - 59053 Roubaix Cedex 1, (contact téléphonique ou email : 1007).</span>

        <h3>Directeur de publication</h3>

        <span>Le Directeur de la publication du Site est Adil BENYAHIA.</span>

      </div>
    </HeaderAndFooterLayout>
  );
};
