import {
  Box,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { ThemeProvider, useTheme } from "@material-ui/core/styles";
import React from "react";
import useStyles from "../style";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardActions from "@material-ui/core/CardActions";

import Button from "@material-ui/core/Button";
import {
  Link,
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Test from "../Test";
import MusicList from "../MusicList";
import { useEffect } from "react";

CategoryList.propTypes = {};

function CategoryList(props) {
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
  const musicList = musics;
  const theme = useTheme();
  const classes = useStyles();
  const match = useRouteMatch();
  const param = useParams();

  let countryCountry = param.paramID;

  useEffect(() => {
    // setKindOfMusic(0);
  }, []);

  const history = useHistory();
  // console.log(musics.songs.hasOwnProperty("top100_VN"));
  // console.log("top100_VN"===countryCountry);
  if (!musics.songs.hasOwnProperty(countryCountry)) {
    history.push("/404");
    countryCountry = "top100_VN";
    // setCountry(countryCountry);
    // alert("Sai")
  }
  // setCountry(countryCountry);

  let musicOfCountry = musics.songs[countryCountry];

  return (
    <Switch>
      <Route path={match.path} exact>
        <ThemeProvider theme={theme}>
          <Grid
            item
            xs={8}
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
                    {musicOfCountry.map((ms) => {
                      return (
                        <Grid
                          item
                          xs={4}
                          sm={4}
                          alignItems="center"
                          className={classes.flexItem}
                        >
                          <Link
                            to={`${match.url}/${ms.name.replace("/", "-")}`}
                          >
                            <Card className={classes.categoryItem}>
                              <CardActionArea>
                                <CardMedia
                                  component="img"
                                  alt="Contemplative Reptile"
                                  height="200"
                                  image={ms.songs[0].coverImage}
                                  title="Contemplative Reptile"
                                  className={classes.media}
                                />
                              </CardActionArea>
                            </Card>
                            <Typography
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                boxOrient: "vertical",
                                lineClamp: 1,
                                wordBreak: "break-all",
                                overflow: "hidden",
                                paddingTop: "5px",
                                color: "white",
                              }}
                            >
                              {ms.name}
                            </Typography>
                          </Link>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </Grid>
        </ThemeProvider>
      </Route>
      <Route path={`${match.url}/:theloai`}>
        <MusicList
          musics={musicList}
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
  );
}

export default CategoryList;
