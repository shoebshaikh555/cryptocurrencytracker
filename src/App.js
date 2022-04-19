import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import "./App.css";
import { HomePage } from "./Pages/HomePage";
import { CoinPage } from "./Pages/CoinPage";
import { makeStyles } from "@material-ui/core";
import { Alert } from "./components/Alert";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/cryptocurrencytracker" element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
