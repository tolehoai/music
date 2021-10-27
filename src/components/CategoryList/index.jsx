import {
  CardActionArea,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { ThemeProvider, useTheme } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import {
  Link,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import MusicList from "../MusicList";
import useStyles from "../style";

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
  // const musicList = musics;
  const theme = useTheme();
  const classes = useStyles();
  const match = useRouteMatch();
  const param = useParams();

  useEffect(() => {
    // setKindOfMusic(0);
  }, []);

  const history = useHistory();
  //Get kind of music
  let countryCountry = param.paramID;
  if (!musics.songs.hasOwnProperty(countryCountry)) {
    history.push("/404");
    countryCountry = "top100_VN";
  }
  // setCountry(countryCountry);

  let musicOfCountry = musics.songs[countryCountry];

  const musicList = musicOfCountry;
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
      <Route path={`${match.url}/:theloai/:id?`}>
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
