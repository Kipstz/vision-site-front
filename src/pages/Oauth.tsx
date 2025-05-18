import { CircularProgress } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import StoreContext from "../StoreContext";

const Oauth: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { setUser, setSid } = useContext(StoreContext);

  const code = new URLSearchParams(location.search).get("code");
  const oauthVerifier = new URLSearchParams(location.search).get(
    "oauth_verifier"
  );

  const sendOAuth = useCallback(async () => {
    try {
      const result = await axios.post<any>(`${import.meta.env.VITE_API_URL}/auth/oauth`, {
        code,
      });

      localStorage.setItem("token", result.data.data.sid);
      localStorage.setItem("user", JSON.stringify(result.data.data.user));
      setUser(result.data.data.user);
      setSid(result.data.data.sid);
      navigate("/");
    } catch (error: any) {
      console.log(error.response);
      if (error.response.data.error.code === "NO_SERVER") {
        enqueueSnackbar("Vous n'êtes pas sur le serveur Discord de Vision.");
      } else if (error.response.data.error.code === "NO_FITING_ROLE") {
        enqueueSnackbar(
          "Erreur inconnue"
        );
      } else {
        enqueueSnackbar("Une erreur est survenue");
      }
    }
  }, [fetch, code, oauthVerifier, history]);

  useEffect(() => {
    if (!code && !oauthVerifier) {
      navigate("/");
    }

    if (!isLoading) {
      setIsLoading(true);

      setTimeout(() => {
        sendOAuth();
      }, 600);
    }
  }, [code, history, isLoading, oauthVerifier, sendOAuth]);

  return (
    <div className="h-100 w-100 d-flex align-items-center">
      <div className="mx-auto d-flex align-items-center">
        <CircularProgress />
      </div>
    </div>
  );
};

export default Oauth;
