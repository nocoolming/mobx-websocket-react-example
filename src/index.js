import React from "react";
import ReactDOM from "react-dom";

import NotificationView from "./NotificationView";
import { GlobalProvider } from "./GlobalStore";

const App = () => {
  return (
    <GlobalProvider>
      <NotificationView />
    </GlobalProvider>
  )
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
