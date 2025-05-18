import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import { useNavigate } from "react-router-dom";
import BoutiquePack from "../../components/UI/BoutiquePack/BoutiquePack";
import './style.scss'

const ShopPacks: React.FC<any> = () => {


    return (
        <>
            <div className="ShopPacks">
                <BoutiquePack
                    type="buyVCoins"
                    price={10}
                    data={{
                        value: 1000,
                        name: 'PACK 1',
                        level: 'yellow'
                    }}
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
        </>
    );
};

export default ShopPacks;
