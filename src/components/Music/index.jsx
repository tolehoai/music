import { CssBaseline, Grid, Typography } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import {
  createTheme,
  ThemeProvider,
  useTheme,
  withStyles,
} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import MusicControl from "../MusicControl";
import MusicList from "../MusicList";
import useStyles from "../style";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import MusicCategory from "../MusicCategory";
import Header from "../Header";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import CategoryList from "../CategoryList";

const theme = createTheme({
  palette: {
    primary: {
      light: "#fff",
      main: "#fff",
      dark: "#fff",
      contrastText: "#fff",
    },
    secondary: {
      light: "#fff",
      main: "#fff",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

Music.propTypes = {
  musics: PropTypes.array,
};

Music.defaultProps = {
  musics: [],
};

function Music(props) {
  const { musics } = props;
  const [country, setCountry] = useState("top100_VN");
  const [kindOfMusic, setKindOfMusic] = useState(0);

  const musicListOld = musics.songs[country][kindOfMusic].songs;
  console.log("top100_KL:", musics.songs.top100_KL[0]);

  let index = 0;
  const musicList = musicListOld.map((music, index) => ({
    ...music,
    index: index++,
  }));

  const classes = useStyles();
  const theme = useTheme();

  const indexRef = useRef(0);
  const firstTimeRef = useRef(true);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [durationString, setDurationString] = useState("");
  const [currentTimeString, setCurrentTimeString] = useState("");

  useEffect(() => {
    console.log("Country change to ", country);
    setCountry(country);
  }, [country]);
  useEffect(() => {
    console.log("Kind of music change to ", kindOfMusic);
    setKindOfMusic(kindOfMusic);
  }, [kindOfMusic]);

  // console.log(timeOfPlayClick.current)
  const [selectMusic, setSelectMusic] = useState({
    // title: musicList[0].title,
    // creator: musicList[0].creator,
    // img: musicList[0].avatar,
    // img_thumb: musicList[0].bgImage,
    // url: musicList[0].music,
    // index: 0,
    // active: true,
    title: "Tô Lê Hoài",
    creator: "Tô Lê Hoài",
    img: "https://image.freepik.com/free-vector/astronaut-listening-music-with-headphone-cartoon-vector-icon-illustration-science-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3492.jpg",
    img_thumb:
      "https://image.freepik.com/free-vector/astronaut-listening-music-with-headphone-cartoon-vector-icon-illustration-science-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3492.jpg",
    url: "",
    index: 0,
    active: true,
  });

  const [play, setPlay] = useState({
    isPlay: false,
    title: "Play",
  });

  useEffect(() => {
    const newPlay = {
      isPlay: false,
      title: "Play",
    };
    setPlay(newPlay);

    return;
  }, []);

  return (
    <div className={classes.app}>
      <ThemeProvider theme={theme}>
        <div className={classes.body}>
          <main className={classes.content}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={4}
                    align="left"
                    style={{
                      color: "white",

                      cursor: "pointer",
                    }}
                  >
                    <Typography>
                      <Link
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          boxOrient: "vertical",
                          lineClamp: 1,
                          wordBreak: "break-all",
                          overflow: "hidden",
                          textDecoration: "none",
                          color: "white",
                        }}
                        to="/category"
                      >
                        Category
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item xs={4}></Grid>
                  <Grid item xs={4}></Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* Main start here */}
            <Grid container spacing={2}>
              <MusicControl
                musics={musics}
                selectMusic={selectMusic}
                setSelectMusic={setSelectMusic}
                indexRef={indexRef}
                play={play}
                setPlay={setPlay}
                firstTimeRef={firstTimeRef}
                country={country}
                setCountry={setCountry}
                kindOfMusic={kindOfMusic}
                setKindOfMusic={setKindOfMusic}
              />
              <Switch>
                {/* <Route path="/" exact>
                  <MusicCategory
                    musics={musics}
                    selectMusic={selectMusic}
                    setSelectMusic={setSelectMusic}
                    indexRef={indexRef}
                    country={country}
                    setCountry={setCountry}
                    kindOfMusic={kindOfMusic}
                    setKindOfMusic={setKindOfMusic}
                    play={play}
                    setPlay={setPlay}
                    firstTimeRef={firstTimeRef}
                  />
                </Route> */}
              </Switch>
              <Switch>
                <Route path="/category">
                  <MusicCategory
                    musics={musics}
                    selectMusic={selectMusic}
                    setSelectMusic={setSelectMusic}
                    indexRef={indexRef}
                    country={country}
                    setCountry={setCountry}
                    kindOfMusic={kindOfMusic}
                    setKindOfMusic={setKindOfMusic}
                    play={play}
                    setPlay={setPlay}
                    firstTimeRef={firstTimeRef}
                  />
                </Route>
              </Switch>
            </Grid>
          </main>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default Music;
