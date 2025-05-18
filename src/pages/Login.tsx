import React, { useCallback, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { loggedApi } from "../axios";
import StoreContext from "../StoreContext";
import { FlexColumn, FlexLayout } from "../layouts/Flex";
import HeaderAndFooterLayout from "../layouts/HeaderAndFooterLayout";
import Button from "../components/UI/Button";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { setUser, sid } = useContext(StoreContext);

  const handleRefreshUser = useCallback(async () => {
    try {
      console.log(sid);
      const result = await loggedApi.get("/user/me");
      setUser(result.data.user);
    } catch (error) {
      enqueueSnackbar("Une erreur est survenue");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConnect = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const popup = window.open(
      import.meta.env.VITE_OAUTH,
      "Discord",
      "width=576,height=800,left=200,top=200"
    );

    if (!popup) {
      return;
    }

    const interval = setInterval(() => {
      if (popup.location.pathname === "/") {
        handleRefreshUser();
        popup.close();
      }

      if (popup.closed) {
        clearInterval(interval);
      }
    }, 500);
  };

  return (
    <HeaderAndFooterLayout>
      <div className="auth">
        <div className="bg__img"></div>
        <div className="left">
          <FlexColumn className="auth__card">
            <h1>
              ÉCRIS TA PROPRE <span className="special">HISTOIRE</span>
            </h1>
            <div className="buttons">
              <Button _type="PRIMARY" onClick={handleConnect}>CONNEXION</Button>
              <Link to={'https://panel.visionrp.fr/'}> <Button style={{ background: '#344b98' }}>WHITELIST</Button></Link>
            </div>
            <img src="/assets/logo.svg" width={40} height={40} alt="logo" />
          </FlexColumn>
        </div>
        <div className="right">
          <img width={500} src="/assets/auth/hero.png" alt="" />
        </div>
      </div >
    </HeaderAndFooterLayout >
  );
};
