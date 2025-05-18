import React, { useContext, useState } from "react";
import StoreContext from "../StoreContext";
import HeaderAndFooterLayout from "../layouts/HeaderAndFooterLayout";
import { FlexColumn, FlexLayout } from "../layouts/Flex";
import dayjs from "dayjs";
import ShopPacks from "../components/ShopPacks/ShopPacks";
import BoutiquePack from "../components/UI/BoutiquePack/BoutiquePack";

export const Boutique: React.FC = () => {
  const { bestof, user } = useContext(StoreContext);
  const [patch, setPatch] = useState(bestof[0])

  console.log(user)

  const getSubMessage = () => {
    if (!user) return 'Vous devez être connecté pour procéder à l\'achat.'
    if (!user?.licence) return 'Vous devez vous être connecté au moins une fois au serveur Vision FA.'
    return 'Vous serez redirigé vers Tebex Checkout pour completer votre achat.'
  }

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
          <h1>BOUTIQUE</h1>
        </FlexLayout>

        <FlexLayout className="BoutiqueContainer">
          <div className="BoutiquePacks">
            <BoutiquePack
              type="buyVCoins"
              price={10}
              data={{
                value: 1000,
                name: 'PACK 1',
                level: 'yellow'
              }}
              disabled={!user || !user?.licence}
              submessage={getSubMessage()}
            />
            <BoutiquePack
              type="buyVCoins"
              price={20}
              data={{
                value: 2200,
                bonus: 200,
                name: 'PACK 2',
                level: 'orange'
              }}
            />
            <BoutiquePack
              type="buyVCoins"
              price={30}
              data={{
                value: 3500,
                bonus: 500,
                name: 'PACK 3',
                level: 'red'
              }}
            />
            <BoutiquePack
              type="buyVCoins"
              price={50}
              data={{
                value: 6000,
                bonus: 1000,
                name: 'PACK 4',
                level: 'purple'
              }}
            />
          </div>
        </FlexLayout>
      </div>
    </HeaderAndFooterLayout>
  );
};
