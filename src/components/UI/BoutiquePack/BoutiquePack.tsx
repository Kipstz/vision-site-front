import React, { useEffect, useState, useContext } from "react";
import './style.scss'

const BoutiquePack: React.FC<any> = ({
    type,
    price,
    data,
    callback = () => {
        // 
    },
    submessage = '',
    disabled = false
}) => {


    const getCurrency = () => {
        if (type === 'buyVCoins') return <div className="BoutiquePack-currency">€</div>;
        if (type === 'buySubscription') return <div className="BoutiquePack-currency">
            <img src='assets/icons/logo.svg' />
        </div>
    }

    return (
        <div className={"BoutiquePack" + (' ' + type) + (' ' + data?.level)}>
            {
                type === 'buySubscription' && <div className="BoutiquePack-sub">
                    <div className="Title">ABONNEMENT</div>
                    <div className="Level">{data?.levelFront}</div>
                </div>
            }
            {
                type === 'buyVCoins' && <div className="BoutiquePack-sub">

                    <div className="Name">{data?.name}</div>
                    <div className="Value">{data?.value} <div className="Currency"><img src='assets/icons/logo.svg' />COINS</div></div>
                    {data?.bonus && <div className="Bonus">+{data?.bonus} OFFERTS</div>}
                </div>
            }
            <div className="Price" onClick={() => {if (!disabled) callback()}} style={disabled ? {cursor: 'not-allowed'} : {}}>
                {price}{getCurrency()}
                <div className="SubMessage">{submessage}</div>
            </div>
        </div>
    )
}

export default BoutiquePack;
