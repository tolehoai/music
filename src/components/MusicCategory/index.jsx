import { CardMedia, Grid, Paper, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { makeStyles, ThemeProvider, useTheme } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import CategoryList from "../CategoryList";
import useStyles from "../style";

MusicCategory.propTypes = {};

function MusicCategory(props) {
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
  console.log("Quoc gia hien tai:", country);
  console.log("Kind of music current: ", kindOfMusic);
  const match = useRouteMatch();
  useEffect(() => {
    const newPlay = {
      isPlay: false,
      title: "Play",
    };
    setPlay(newPlay);

    return;
  }, []);
  const useStyle = makeStyles({
    img: {
      width: "300px !important",
      height: "300px !important",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9,
      marginTop: "30",
    },
    flexItem: {
      display: "flex",
      alignItems: "stretch",
    },
  });
  const theme = useTheme();

  const classes = useStyles();
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
                  backgroundColor: "transparent",
                }}
              >
                <Grid item sm={12}>
                  <Grid container spacing={2}>
                    {Object.keys(musics.songs).map((ms) => {
                      let category = {};
                      if (ms === "top100_VN") {
                        category = {
                          title: "Top 100 Việt Nam",
                          categoryImg:
                            "https://i.scdn.co/image/ab67706f00000003176473996390e4cedcda7d18",
                        };
                      }
                      if (ms === "top100_AM") {
                        category = {
                          title: "Top 100 American",
                          categoryImg:
                            "https://avatar-ex-swe.nixcdn.com/playlist/2015/11/23/d/9/e/f/1448272273014_500.jpg",
                        };
                      }
                      if (ms === "top100_KL") {
                        category = {
                          title: "Top 100 Không Lời",
                          categoryImg:
                            "https://direct.rhapsody.com/imageserver/images/alb.253168725/500x500.jpg",
                        };
                      }
                      if (ms === "top100_CA") {
                        category = {
                          title: "Top 100 Châu Á",
                          categoryImg:
                            "https://m.media-amazon.com/images/I/71sp2RipbDL._SS500_.jpg",
                        };
                      }

                      return (
                        <Grid
                          item
                          xs={6}
                          sm={6}
                          alignItems="center"
                          className={classes.flexItem}
                        >
                          <Link to={"category/" + ms}>
                            <Card>
                              <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="200"
                                image={category.categoryImg}
                                title="Contemplative Reptile"
                                style={{
                                  height: "380px",
                                  width: "100%",
                                }}
                              />
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
                              {category.title}
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
      <Route path={`${match.path}/:paramID`}>
        <CategoryList
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
  );
}

export default MusicCategory;
