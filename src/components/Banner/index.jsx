import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import logo from "./banner.jpg";
import { Carousel } from "../Carousel";
const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: `url(${logo})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 24,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));
export const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 16,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Tracker
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "#e7e7e7",
              fontFamily: "Montserrat",
            }}
          >
            Get all the information about your favorite Crypto Currency.
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};
