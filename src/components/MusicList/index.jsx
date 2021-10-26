import {
  Box,
  CardActionArea,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import { ThemeProvider, useTheme, withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import useStyles from "../style";

MusicList.propTypes = {
  musics: PropTypes.object.isRequired,
};

MusicList.defaultProps = {
  // musics: [],
};

function MusicList(props) {
  const {
    musics,
    selectMusic,
    setSelectMusic,
    indexRef,
    country,
    setCountry,
    kindOfMusic,
    setKindOfMusic,
    play,
    setPlay,
    firstTimeRef,
  } = props;
  const patch = useRouteMatch();
  const params = useParams();
  console.log(patch);
  console.log(params);
  let countryName = patch.path.slice(1);

  countryName = countryName.substring(countryName.indexOf("/") + 1);
  countryName = countryName.substring(0, countryName.indexOf("/"));

  musics.songs[countryName].map((el) => {
    el.name = el.name.replace("/", "-");
  });
  // alert(patch.params.theloai);
  // console.log("remove", musics.songs[countryName]);
  let indexInTop100 = musics.songs[countryName].findIndex(
    (obj) => obj.name === patch.params.theloai
  );

  const history = useHistory();

  const musicListNew = musics.songs[countryName][indexInTop100].songs;

  const musicList = musicListNew;
  let i = -1;
  musicList.map((el) => {
    el.index = i + 1;
    i = i + 1;
  });

  const classes = useStyles();

  //Handle MusicClick
  const handleMusicClick = (music) => {
    setKindOfMusic(indexInTop100);
    setCountry(countryName);
    firstTimeRef.current = false;
    if (music && firstTimeRef.current === false) {
      var indexMusic = musicList.findIndex((el) => el == music);

      selectMusic.active = false;

      const newSelectMusic = {
        title: music.title,
        creator: music.creator,
        img: music.avatar,
        url: music.music,
        img_thumb: music.bgImage,
        index: indexMusic,
        active: true,
      };
      indexRef.current = indexMusic;

      setSelectMusic(newSelectMusic);
    } else return;
  };

  useEffect(() => {
    const newIsPlay = true;
    let newTitle;
    console.log("PHAT HIEN THAY DOI BAI HAT");
    if (firstTimeRef.current === true) {
      console.log("First time, don't play");
      const newPlay = {
        isPlay: false,
        title: "Play",
      };
      setPlay(newPlay);
    } else {
      console.log("Not first time, countinue play");
    }

    console.log("Title", selectMusic.title);
    var elmnt = document.getElementById(selectMusic.title);
    console.log("Scroll", elmnt);
    if (elmnt) {
      elmnt.scrollIntoView({
        behavior: "smooth", //auto
        block: "center",
        inline: "center",
      });
    }
  }, [selectMusic]);

  //handle Firsttime don't play
  // useEffect(() => {
  //   const newPlay = {
  //     isPlay: false,
  //     title: "Play",
  //   };
  //   setPlay(newPlay);
  //   return;
  // }, []);
  //end handle Firsttime don't play

  //End Handle MusicClick
  //Handle Play music click
  const handlePlayClick = () => {
    const newIsPlay = !play.isPlay;
    let newTitle;
    if (newIsPlay === true) newTitle = "Pause";
    else newTitle = "Play";
    const newPlay = {
      isPlay: newIsPlay,
      title: newTitle,
    };
    setPlay(newPlay);
  };

  useEffect(() => {
    let audio = document.getElementById("music");

    if (play.isPlay === true) {
      audio.play();
    } else audio.pause();

    // audio.play();
    document.title = "NhacCuaHoai - " + selectMusic.title;
  }, [play]);

  //End handle Play music click

  //Handle PreviosClick
  const handlePreviosClick = () => {
    indexRef.current === 0
      ? (indexRef.current = 0)
      : (indexRef.current = indexRef.current - 1);

    selectMusic.active = false;
    const newCurrentMusic = {
      title: musicList[indexRef.current].title,
      creator: musicList[indexRef.current].creator,
      img: musicList[indexRef.current].avatar,
      img_thumb: musicList[indexRef.current].bgImage,
      url: musicList[indexRef.current].music,
      index: indexRef.current,
      active: true,
    };
    setSelectMusic(newCurrentMusic);
  };

  //End Handle PreviosClick
  //Handle NextClick
  const handleNextClick = () => {
    indexRef.current === 98
      ? (indexRef.current = 0)
      : (indexRef.current = indexRef.current + 1);

    selectMusic.active = false;

    const newCurrentMusic = {
      title: musicList[indexRef.current].title,
      creator: musicList[indexRef.current].creator,
      img: musicList[indexRef.current].avatar,
      img_thumb: musicList[indexRef.current].bgImage,
      url: musicList[indexRef.current].music,
      index: indexRef.current,
      active: true,
    };
    setSelectMusic(newCurrentMusic);
  };

  //End Handle NextClick
  const PrettoSlider = withStyles({
    root: {
      color: "#52af77",
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      marginTop: -8,
      marginLeft: -12,
      "&:focus, &:hover, &$active": {
        boxShadow: "inherit",
      },
    },
    active: {},
    valueLabel: {
      left: "calc(-50% + 4px)",
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

  const repeatRef = useRef(false);
  const [repeat, setRepeat] = useState({
    action: true,
  });

  // const handleRepeatClick = () => {
  //   var audio = document.getElementById("music");
  //   // const newRepeat = {
  //   //   status: !repeat.status,
  //   // };
  //   // setRepeat(newRepeat);

  //   repeatRef.current = !repeatRef.current;
  //   const newAction = !repeat.action;

  //   const newRepeat = {
  //     action: repeatRef.current,
  //   };

  //   setRepeat(newRepeat);

  //   // if (repeatRef.current === false) {

  //   //   audio.addEventListener("ended", function () {
  //   //     indexRef.current = indexRef.current + 1;

  //   //     const newCurrentMusic = {
  //   //       title: musicList[indexRef.current].title,
  //   //       creator: musicList[indexRef.current].creator,
  //   //       img: musicList[indexRef.current].avatar,
  //   //       img_thumb: musicList[indexRef.current].bgImage,
  //   //       url: musicList[indexRef.current].music,
  //   //       index: indexRef.current,
  //   //       active: true,
  //   //     };
  //   //     setSelectMusic(newCurrentMusic);

  //   //     const newPlay = {
  //   //       isPlay: true,
  //   //       title: "Pause",
  //   //     };
  //   //     setPlay(newPlay);
  //   //   });
  //   // } else {
  //   //   console.log("No Repeat");
  //   //   audio.addEventListener("ended", function () {
  //   //     console.log(indexRef.current);
  //   //     indexRef.current = indexRef.current;
  //   //     const newCurrentMusic = {
  //   //       title: musicList[indexRef.current].title,
  //   //       creator: musicList[indexRef.current].creator,
  //   //       img: musicList[indexRef.current].avatar,
  //   //       img_thumb: musicList[indexRef.current].bgImage,
  //   //       url: musicList[indexRef.current].music,
  //   //       index: indexRef.current,
  //   //       active: true,
  //   //     };
  //   //     setSelectMusic(newCurrentMusic);

  //   //     const newPlay = {
  //   //       isPlay: true,
  //   //       title: "Pause",
  //   //     };
  //   //     setPlay(newPlay);
  //   //   });
  //   // }
  // };

  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Grid
        item
        xs={12}
        sm={8}
        style={{
          backgroundColor: "transparent",
        }}
      >
        <div className={classes.list}>
          <Paper
            className={classes.card}
            style={{
              // backgroundImage: "linear-gradient(to bottom, #ad5389, #3c1053)",
              backgroundColor: "transparent",
            }}
          >
            <Grid item sm={12}>
              <Grid container spacing={2}>
                <Grid item xs={8} sm={6} alignItems="center">
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h5"
                    color="#ffffff"
                    style={{ color: "white" }}
                    align="left"
                  >
                    Bài hát
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4} alignItems="left">
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h5"
                    color="#ffffff"
                    style={{ color: "white" }}
                    align="left"
                  >
                    Ca sĩ
                  </Typography>
                </Grid>
                <Grid item xs={2} sm={2} alignItems="center">
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h5"
                    color="#ffffff"
                    style={{ color: "white" }}
                    align="center"
                  >
                    {/* Thời lượng */}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item sm={12} xs={12} className={classes.mainjs}>
                <Grid container spacing={2} id="listTable">
                  {musicList.map((musicListRender) => {
                    if (
                      musicListRender.index === indexRef.current &&
                      musicListRender.title === selectMusic.title
                    ) {
                      return (
                        <CardActionArea
                          className={(classes.musicItem, classes.musicSelected)}
                          onClick={() => handleMusicClick(musicListRender)}
                          bgcolor="primary.main"
                        >
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            key={musicListRender.title}
                          >
                            <Grid container spacing={2}>
                              <Grid item xs={8} sm={6} alignItems="center">
                                <div className={classes.musicItem}>
                                  <CardMedia
                                    className={classes.musicImg}
                                    component="img"
                                    alt="Contemplative Reptile"
                                    image={musicListRender.avatar}
                                    title="Contemplative Reptile"
                                  />
                                  <div className={classes.musicItemTitle}>
                                    <Typography
                                      variant="h6"
                                      color="primary"
                                      className={classes.mainContent}
                                      gutterBottom
                                      id={musicListRender.title}
                                    >
                                      {musicListRender.title}
                                    </Typography>

                                    <div>
                                      <Typography
                                        pl={3}
                                        variant="subtitle1"
                                        align="left"
                                        gutterBottom
                                        color="primary"
                                        className={classes.mainContent}
                                        style={{
                                          whiteSpace: "nowrap",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          display: "-webkit-box",
                                          boxOrient: "vertical",
                                          lineClamp: 1,
                                          wordBreak: "break-all",
                                          overflow: "hidden",
                                        }}
                                      >
                                        {musicListRender.title}
                                      </Typography>
                                    </div>
                                  </div>
                                </div>
                              </Grid>
                              <Grid
                                item
                                xs={4}
                                sm={4}
                                alignItems="left"
                                // className={classes.flexItem}
                              >
                                <Box
                                  display="flex"
                                  justifyContent="left"
                                  m={1}
                                  p={1}
                                  color="primary"
                                >
                                  {"  "}
                                  <Typography
                                    pl={3}
                                    variant="subtitle1"
                                    align="left"
                                    gutterBottom
                                    color="primary"
                                    className={classes.musicItem}
                                    className={classes.mainContent}
                                    className={classes.flexItem}
                                    style={{
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      display: "-webkit-box",
                                      boxOrient: "vertical",
                                      lineClamp: 1,
                                      wordBreak: "break-all",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {musicListRender.creator}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                xs={2}
                                sm={2}
                                alignItems="center"
                                id={`timeof${musicListRender.title}`}
                              ></Grid>
                            </Grid>
                          </Grid>
                        </CardActionArea>
                      );
                    } else {
                      return (
                        <CardActionArea
                          className={(classes.musicItem, musicListRender.title)}
                          onClick={() => handleMusicClick(musicListRender)}
                          bgcolor="primary.main"
                        >
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            key={musicListRender.title}
                          >
                            <Grid container spacing={1}>
                              <Grid item xs={8} sm={6} alignItems="center">
                                <div className={classes.musicItem}>
                                  <CardMedia
                                    className={classes.musicImg}
                                    component="img"
                                    alt="Contemplative Reptile"
                                    image={musicListRender.avatar}
                                    title="Contemplative Reptile"
                                  />
                                  <div className={classes.musicItemTitle}>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      className={classes.mainContent}
                                      id={musicListRender.title}
                                    >
                                      {musicListRender.title}
                                    </Typography>
                                    <div>
                                      <Typography
                                        pl={3}
                                        variant="subtitle1"
                                        align="left"
                                        gutterBottom
                                        className={classes.musicItem}
                                        className={classes.mainContent}
                                        style={{
                                          whiteSpace: "nowrap",
                                          // overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          display: "-webkit-box",
                                          boxOrient: "vertical",
                                          lineClamp: 1,
                                          wordBreak: "break-all",
                                          overflow: "hidden",
                                        }}
                                      >
                                        {musicListRender.title}
                                      </Typography>
                                    </div>
                                  </div>
                                </div>
                              </Grid>
                              <Grid
                                item
                                xs={4}
                                sm={4}
                                alignItems="center"
                                // className={classes.flexItem}
                              >
                                <Box
                                  display="flex"
                                  justifyContent="left"
                                  m={1}
                                  p={1}
                                >
                                  {"  "}
                                  <Typography
                                    variant="subtitle1"
                                    align="left"
                                    gutterBottom
                                    justifyContent="left"
                                    // className={classes.musicItem1}
                                    className={classes.musicItem}
                                    className={classes.mainContent}
                                    className={classes.flexItem}
                                    color="primary"
                                    style={{
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      display: "-webkit-box",
                                      boxOrient: "vertical",
                                      lineClamp: 1,
                                      wordBreak: "break-all",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {musicListRender.creator}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                xs={2}
                                sm={2}
                                alignItems="center"
                                id={`timeof${musicListRender.title}`}
                              >
                                {" "}
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardActionArea>
                      );
                    }
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Grid>
    </ThemeProvider>
  );
}

export default MusicList;