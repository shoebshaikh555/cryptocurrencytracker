import { Avatar, Button, Drawer } from "@material-ui/core";
import React, { useState } from "react";
import { CryptoState } from "../../../CryptoContext";
import { makeStyles } from "@material-ui/styles";
import { signOut } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { numberWithCommas } from "../../../Utils/utils";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
const useStyles = makeStyles(() => ({
  container: {
    width: 350,
    padding: 24,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace",
  },
  profile: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    height: "92%",
  },
  picture: {
    width: 200,
    height: 200,
    cursor: "pointer",
    backgroundColor: "#EEBC1D",
    objectFit: "contain",
  },
  logout: {
    height: "8%",
    width: "100%",
    backgroundColor: "#EEBC1D",
    marginTop: 20,
  },
  watchList: {
    flex: 1,
    width: "100%",
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 14,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll",
  },
  coin: {
    padding: 10,
    borderRadius: 5,
    color: "black",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EEBC1D",
    boxShadow: "0 0 3px black",
  },
}));
export const UserSidebar = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    right: false,
  });

  const { user, setAlert, watchList, coins, symbol } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logout = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout successful.",
    });
    toggleDrawer();
  };

  const removeFromTheWatchList = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      console.log("in try");
      await setDoc(
        coinRef,
        {
          coins: watchList.filter((watch) => watch !== coin?.id),
        },
        {
          merge: true,
        }
      );
      setAlert({
        open: true,
        message: `${coin.name} removed from the watchlist.`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar
                  className={classes.picture}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 24,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <div className={classes.watchList}>
                  <span style={{ fontSize: 14, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>
                  {coins.map((coin) => {
                    if (watchList.includes(coin.id)) {
                      return (
                        <div className={classes.coin}>
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}{" "}
                            {numberWithCommas(coin?.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{ cursor: "pointer" }}
                              fontSize="16"
                              onClick={() => removeFromTheWatchList(coin)}
                            />
                          </span>
                        </div>
                      );
                    }
                  })}
                </div>
                <Button
                  variant="contained"
                  className={classes.logout}
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};
