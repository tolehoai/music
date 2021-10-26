import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Hidden,
  Typography,
} from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import RepeatIcon from "@material-ui/icons/Repeat";
import RepeatOneIcon from "@material-ui/icons/RepeatOne";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import TimeSlider from "react-input-slider";
import useStyles from "../style";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
MusicControl.propTypes = {
  musics: PropTypes.object.isRequired,
};

MusicControl.defaultProps = {};

function MusicControl(props) {
  const {
    musics,
    selectMusic,
    indexRef,
    setSelectMusic,
    play,
    setPlay,
    firstTimeRef,
    country,
    setCountry,
    kindOfMusic,
    setKindOfMusic,
    timeOfPlayClick,
  } = props;

  let musicList = [];
  // console.log("Quoc gia:",country)
  // console.log("The loai:",kindOfMusic)

  let musicListNew = musics.songs[country][kindOfMusic].songs;
  // console.log("Quoc gia:",country)
  // console.log("The loai:",kindOfMusic)
  musicList = musicListNew;

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [durationString, setDurationString] = useState("");
  const [currentTimeString, setCurrentTimeString] = useState("");

  const classes = useStyles();

  const repeatRef = useRef(false);
  const countryRef = useRef("");
  const kindOfMusicRef = useRef("");

  useEffect(() => {
    console.log("Kind of Music Change to", kindOfMusic);
    setKindOfMusic(kindOfMusic);
    kindOfMusicRef.current = kindOfMusic;
    musicList = musics.songs[country][kindOfMusic].songs;
    console.log("Music list after change kind of music, ", musicList);
  }, [kindOfMusic]);

  useEffect(() => {
    console.log("Country Change to", country);
    setCountry(country);
    countryRef.current = country;
    musicList = musics.songs[country][kindOfMusic].songs;
    console.log("Music list after change country, ", musicList);
  }, [country]);

  useEffect(() => {
    musicList = musics.songs[country][kindOfMusic].songs;
    console.log("PHAT HIEN DANH SACH BAI HAT THAY DOI", musicList);
    const newIsPlay = true;
    let newTitle;

    if (newIsPlay === true) newTitle = "Pause";
    else newTitle = "Play";
    const newPlay = {
      isPlay: newIsPlay,
      title: newTitle,
    };
    setPlay(newPlay);

    var elmnt = document.getElementById(selectMusic.title);
    if (elmnt) {
      elmnt.scrollIntoView({
        behavior: "smooth", //auto
        block: "center",
        inline: "center",
      });
    }
  }, [selectMusic]);

  useEffect(() => {
    if (firstTimeRef.current === true) {
      const newPlay = {
        isPlay: false,
        title: "Play",
      };
      setPlay(newPlay);
    }
    if (firstTimeRef.current === false) {
      const newPlay = {
        isPlay: true,
        title: "Pause",
      };
      setPlay(newPlay);
    }
    const newRepeat = !repeatRef.current;
    setRepeat(newRepeat);
    let audio = document.getElementById("music");

    // console.log("Danh sach hien tai: ", musicList)
    audio.addEventListener("ended", function () {
      console.log("Quoc gia:", countryRef.current);
      console.log("The loai:", kindOfMusicRef.current);
      musicList =
        musics.songs[countryRef.current][kindOfMusicRef.current].songs;
      console.log("Het bai");
      console.log("Danh sach hien tai: ", musicList);

      if (repeatRef.current === true) {
        console.log("Repeat");
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

        const newPlay = {
          isPlay: true,
          title: "Pause",
        };
        setPlay(newPlay);
        console.log("MUSIC LIST WHEN ENDED SONG:", musicList);
        console.log("Bai hat tiep theo: ", newCurrentMusic);
      } else {
        console.log("Chay tiep", indexRef.current, indexRef.current + 1);
        indexRef.current === 98
          ? (indexRef.current = 0)
          : (indexRef.current = indexRef.current + 1);
        // indexRef.current = indexRef.current + 1;
        console.log(indexRef.current);
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

        const newPlay = {
          isPlay: true,
          title: "Pause",
        };
        setPlay(newPlay);
        // console.log("MUSIC LIST WHEN ENDED SONG:", musicList);
        console.log("Bai hat tiep theo: ", newCurrentMusic);
      }
    });
  }, []);

  // //End Handle MusicClick
  // //Handle Play music click
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
    firstTimeRef.current = false;
  };

  useEffect(() => {
    let audio = document.getElementById("music");

    if (play.isPlay === true) {
      // setTimeout(() => {
      //Khong can audio Load
      // audio.load();//Nay sai roi, khong can
      audio.play();
      // }, 500);
    } else audio.pause();

    // audio.play();
    document.title = "NhacCuaHoai - " + selectMusic.title;
  }, [play]);

  // //End handle Play music click

  // //Handle PreviosClick
  const handlePreviosClick = () => {
    indexRef.current === 0
      ? (indexRef.current = 0)
      : (indexRef.current = indexRef.current - 1);
    console.log("Index: ", indexRef.current);

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
    console.log("music", newCurrentMusic);
    console.log("Select Music: ", selectMusic);
  };

  // //End Handle PreviosClick
  // //Handle NextClick
  const handleNextClick = () => {
    // console.log("Next bai: ", musicList[indexRef.current].title);
    indexRef.current === 98
      ? (indexRef.current = 0)
      : (indexRef.current = indexRef.current + 1);
    console.log("Index: ", indexRef.current);
    selectMusic.active = false;
    console.log(selectMusic);
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

  const handleTimeSliderChange = ({ x }) => {
    var audio = document.getElementById("music");
    audio.currentTime = x;
    setCurrentTime(x);
  };
  const [repeat, setRepeat] = useState(false);

  const handleRepeatClick = () => {
    var audio = document.getElementById("music");
    // const newRepeat = {
    //   status: !repeat.status,
    // };
    // setRepeat(newRepeat);

    repeatRef.current = !repeatRef.current;
    const newAction = !repeat.action;

    const newRepeat = {
      action: repeatRef.current,
    };

    setRepeat(newRepeat);

    // if (repeatRef.current === false) {

    //   audio.addEventListener("ended", function () {
    //     indexRef.current = indexRef.current + 1;

    //     const newCurrentMusic = {
    //       title: musicList[indexRef.current].title,
    //       creator: musicList[indexRef.current].creator,
    //       img: musicList[indexRef.current].avatar,
    //       img_thumb: musicList[indexRef.current].bgImage,
    //       url: musicList[indexRef.current].music,
    //       index: indexRef.current,
    //       active: true,
    //     };
    //     setSelectMusic(newCurrentMusic);

    //     const newPlay = {
    //       isPlay: true,
    //       title: "Pause",
    //     };
    //     setPlay(newPlay);
    //   });
    // } else {
    //   console.log("No Repeat");
    //   audio.addEventListener("ended", function () {
    //     console.log(indexRef.current);
    //     indexRef.current = indexRef.current;
    //     const newCurrentMusic = {
    //       title: musicList[indexRef.current].title,
    //       creator: musicList[indexRef.current].creator,
    //       img: musicList[indexRef.current].avatar,
    //       img_thumb: musicList[indexRef.current].bgImage,
    //       url: musicList[indexRef.current].music,
    //       index: indexRef.current,
    //       active: true,
    //     };
    //     setSelectMusic(newCurrentMusic);

    //     const newPlay = {
    //       isPlay: true,
    //       title: "Pause",
    //     };
    //     setPlay(newPlay);
    //   });
    // }
  };

  const repeatClick = () => {
    console.log("Repeat Click");
    if (repeatRef.current === true) {
      repeatRef.current = false;
    } else repeatRef.current = true;
    console.log(repeatRef.current);
    const newRepeat = !repeatRef.current;
    setRepeat(newRepeat);
    console.log(repeat);
  };

  return (
    <Grid item xs={12} sm={4} alignItems="center">
      <Card
        className={classes.card_left}
        className={classes.card}
        style={{
          // backgroundImage: "linear-gradient(to bottom, #ad5389, #3c1053)",
          backgroundColor: "transparent",
          color: "white",
        }}
      >
        <Grid container spacing={0}>
          <Hidden only="xs">
            <Grid item xs={0} sm={0} md={12} lg={12} xl={12}>
              <div className={classes.musicImgThumb}>
                {play.isPlay ? (
                  <CardMedia
                    className={classes.music_Img_thum}
                    component="img"
                    alt={selectMusic.creator}
                    image={
                      !selectMusic.img_thumb == ""
                        ? selectMusic.img_thumb
                        : "https://image.freepik.com/free-vector/astronaut-listening-music-with-headphone-cartoon-vector-icon-illustration-science-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3492.jpg"
                    }
                    title="Contemplative Reptile"
                    onError={(e) => {
                      console.log("Error when load image:", e.target.onerror);
                      e.target.onerror = null;
                      e.target.src =
                        "https://image.freepik.com/free-vector/astronaut-listening-music-with-headphone-cartoon-vector-icon-illustration-science-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3492.jpg";
                    }}
                  />
                ) : (
                  <CardMedia
                    className={classes.music_Img_thum_noPlay}
                    component="img"
                    alt={selectMusic.creator}
                    image={
                      !selectMusic.img_thumb == ""
                        ? selectMusic.img_thumb
                        : "https://image.freepik.com/free-vector/astronaut-listening-music-with-headphone-cartoon-vector-icon-illustration-science-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3492.jpg"
                    }
                    title="Contemplative Reptile"
                  />
                )}
              </div>
            </Grid>
          </Hidden>
        </Grid>
        <div className={classes.flexItem}>
          <CardActionArea className={classes.flexItem}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className={classes.mainContent}
              >
                {selectMusic.title}
              </Typography>
              <Typography
                variant="body2"
                color="white"
                component="p"
                className={classes.mainContent}
              >
                {selectMusic.creator}
              </Typography>
            </CardContent>
          </CardActionArea>
          {/* Start here */}
          <Grid container spacing={1}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <TimeSlider
                axis="x"
                xmax={duration}
                x={currentTime}
                onChange={handleTimeSliderChange}
                styles={{
                  track: {
                    backgroundColor: "#ede7f6",
                    height: "5px",
                    width: "100%",
                  },
                  active: {
                    background: "linear-gradient(to right, #da4453, #89216b)",
                    height: "5px",
                  },
                  thumb: {
                    marginTop: "-2px",
                    width: "18px",
                    height: "18px",
                    backgroundColor: "#7e57c2",
                    borderRadius: 100,
                  },
                }}
              />
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
          <div className={classes.margin} />
          <Grid container spacing={2}>
            <Grid item xs={3} className={classes.timeSlider}>
              {currentTimeString}
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={3} className={classes.timeSlider}>
              {durationString}
            </Grid>
          </Grid>
          <div className={classes.music_control}>
            <button
              // onClick={handlePreviosClick}
              style={{
                color: "white",
                fontSize: 20,
                cursor: "pointer",
              }}
              className={classes.next_pre_song}
            >
              <VolumeDownIcon />
            </button>
            <button
              onClick={handlePreviosClick}
              style={{
                color: "white",
                fontSize: 20,
                cursor: "pointer",
              }}
              className={classes.next_pre_song}
            >
              <SkipPreviousIcon />
            </button>
            <audio
              // controls
              onLoadedData={(e) => {
                setDuration(e.currentTarget.duration.toFixed(2));
                var s = parseInt(e.currentTarget.duration % 60);
                var m = parseInt((e.currentTarget.duration / 60) % 60);
                s = "0" + s;
                m = "0" + m;
                setDurationString(m.substr(-2) + ":" + s.substr(-2));
              }}
              onTimeUpdate={(e) => {
                let audio = document.getElementById("music");
                setCurrentTime(audio.currentTime.toFixed(2));
                var s = parseInt(audio.currentTime % 60);
                var m = parseInt((audio.currentTime / 60) % 60);
                s = "0" + s;
                m = "0" + m;
                setCurrentTimeString(m.substr(-2) + ":" + s.substr(-2));
              }}
              id="music"
              src={selectMusic.url}
            >
              {" "}
              <source src={selectMusic.url} />
            </audio>

            <button
              onClick={handlePlayClick}
              className={classes.music_play_button}
            >
              {play.title === "Play" ? (
                <PlayArrowIcon
                  style={{
                    color: "white",
                    fontSize: 40,
                    cursor: "pointer",
                  }}
                />
              ) : (
                <PauseIcon
                  style={{
                    color: "white",
                    fontSize: 40,
                    cursor: "pointer",
                  }}
                />
              )}
            </button>

            <button
              onClick={handleNextClick}
              style={{
                color: "white",
                fontSize: 20,
                cursor: "pointer",
              }}
              className={classes.next_pre_song}
            >
              <SkipNextIcon />
            </button>
            <button
              className={classes.next_pre_song}
              onClick={repeatClick}
              style={{
                color: "black",
                fontSize: 20,
                cursor: "pointer",
              }}
              onClick={repeatClick}
            >
              {repeat === true ? (
                <RepeatIcon
                  style={{
                    cursor: "pointer",
                    color: "white",
                  }}
                />
              ) : (
                <RepeatOneIcon
                  style={{
                    cursor: "pointer",
                    color: "white",
                  }}
                />
              )}
            </button>
          </div>
        </div>
      </Card>
    </Grid>
  );
}

export default MusicControl;
