import React from "react";

export default React.createContext<any>({
  user: null,
  setUser: () => {},
  sid: null,
  setSid: () => {},
});
