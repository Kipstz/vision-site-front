import React, { useContext, useState } from "react";
import StoreContext from "../StoreContext";
import HeaderAndFooterLayout from "../layouts/HeaderAndFooterLayout";

export const Rules: React.FC = () => {
  const { rules, serverType, setServerType } = useContext(StoreContext);
  return (
    <HeaderAndFooterLayout>
      <div className="rules">

        <h1 className="title">
          <img src="assets/reglements/rules.png" />
        </h1>

        <div className="TypeSelector">
          <div className={"El" + (serverType === 0 ? ' Selected' : '')} onClick={() => setServerType(0)}>WL</div>
          <div className={"El" + (serverType === 1 ? ' Selected' : '')} onClick={() => setServerType(1)}>FA</div>
        </div>

        {
          rules?.[serverType]?.map(cat => (
            <div className="RulesCategory">
              <img className="main" src={cat?.image ?? ''} alt="" />

              {
                cat.items.map(subcat => {
                  if (subcat.type === "sub") return (
                    <div className="RulesSubCategory" >
                      <img className="sub" src={subcat?.image ?? ''} alt="" />
                      {
                        subcat.items.map(_subcat => {
                          if (_subcat.type === "text") return (
                            <div className="RulesText" dangerouslySetInnerHTML={{ __html: _subcat.value }}>
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                  if (subcat.type === "text") return (
                    <div className="RulesText" dangerouslySetInnerHTML={{ __html: subcat.value }}>
                    </div>
                  )
                })
              }

            </div>
          ))
        }
      </div>
    </HeaderAndFooterLayout >
  );
};
