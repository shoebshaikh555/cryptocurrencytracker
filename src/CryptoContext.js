import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React, { createContext, useContext, useState, useEffect } from "react";
import { CoinList } from "./config/api";
import { auth, db } from "./firebase";
const Crypto = createContext();
export const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [user, setUser] = useState(null);
  const [watchList, setWatchList] = useState([]);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (userInfo) => {
      if (userInfo) setUser(userInfo);
      else setUser(null);
    });
  }, []);

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
    fetchCoins();
  }, [currency]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);
      const unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin);
          setWatchList(coin.data().coins);
        } else {
          console.log("no items in the watchlist.");
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  return (
    <Crypto.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        alert,
        setAlert,
        user,
        watchList,
        coins,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};
export const CryptoState = () => {
  return useContext(Crypto);
};
