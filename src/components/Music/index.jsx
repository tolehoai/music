import { Grid, Typography } from "@material-ui/core";
import { createTheme, ThemeProvider, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import MusicCategory from "../MusicCategory";
import MusicControl from "../MusicControl";
import useStyles from "../style";

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
                <Route path="/category">
                  <MusicCategory
                    //MusicList
                    musics={musics}
                    //Sub
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
