import { makeStyles } from "@material-ui/core";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  body: {
    // backgroundImage: "url('https://i.imgur.com/Q1Zwp1T.jpeg')",
    backgroundImage:" linear-gradient(to right, RGBA(173,83,137,0.85), RGBA(60,16,83,0.85)), url('https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80')",
    // backgroundImage:" linear-gradient(#c94b4b, #4b134f), url('https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80')",
    // backgroundImage: "url('https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",

    height: "100vh",
    color: "white",
    overflowY: "hidden",
    overflowX: "hidden",
    padding: "0",
    margin: "0",
  },
  app:{
    padding: "0 important",
    margin: "0 important",
  },
  root: {
    display: "flex",
    flexGrow: 1,
    maxWidth: "100%",

    overflowX: "scroll",
  },
  music_control: {
    backgroundColor: "transparent",
  },
  categoryItem: {
    height: "auto",
    width: "60%",
  },

  // media: {
  //   height: "400x",
  //   width: "400x",
  // },
  media: {
    width: "100%",
    height: "100%",
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,

    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  tableContainer: {
    boxShadow: "none",
  },
  cover: {
    width: 151,
  },
  card: {
    border: "none",
    boxShadow: "none",
    borderRadius: "0",
  },
  flexItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  flexItem1: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  "@keyframes spin ": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
  "@keyframes noSpin ": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(0deg)",
    },
  },
  music_Img_thum: {
    borderRadius: "50%",
    animation: `$spin linear 15000ms infinite`,
    width: "80%",
    marginTop: "50px",
  },
  music_Img_thum_noPlay: {
    borderRadius: "50%",
    animation: `$noSpin linear 15000ms infinite`,
    width: "80%",
    marginTop: "50px",
  },
  musicImg: {
    height: "60px",
    width: "60px",
  },
  musicImgThumb: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  oval: {
    // width: "90px",
    // height: "90px",
    // backgroundColor: "white",
    // position: "absolute",
    // top: "50%",
    // borderRadius: "100%",
    // // opacity: "50%",
  },

  musicItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: "#ffebee",
  },
  musicItemTitle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingLeft: "10px",
    color: "#ffebee",
  },
  // mainjs: {
  //   backgroundColor: "red",
  //   border: "solid 5px black",
  //   borderRadius: "5px",
  //   height: "300px",
  //   padding: "10px",
  //   width: "200px",
  //   scroolbarWidth: "none",
  //   overflowY: "scrool",
  // },
  mainjs: {
    overflowX: "hidden",
    overflowY: "scroll",
    // scrollbarWidth: "none",

    margin: 0,
    padding: 0,
    listStyle: "none",
    height: "600px",
    width: "200px",
    // "&::-webkit-scrollbar": {
    //   width: "0.4em",
    //   display: "none",
    // },
    "&::-webkit-scrollbar": {
      width: "15px",
      height: "15px",
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: "10px",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      // marginTop: "50px",
      // marginBottom: "50px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundImage: "linear-gradient(to left, #56ccf2, #2f80ed)",
      borderRadius: "10px",
      boxShadow: "rgba(0,0,0,.12) 0 3px 13px 1px",
    },
  },
  list: {
    // overflowY: "scroll",
    // overflowX: "hidden",
    // width: "100%",
    // height: "600px",
    // "&::-webkit-scrollbar": {
    //   width: "15px",
    //   height: "15px",
    // },
    // "&::-webkit-scrollbar-track": {
    //   borderRadius: "10px",
    //   backgroundColor: "rgba(255, 255, 255, 0.1)",
    // },
    // "&::-webkit-scrollbar-thumb": {
    //   backgroundImage: "linear-gradient(45deg, #00aeff, #a68eff)",
    //   borderRadius: "10px",
    // },
  },
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  "@keyframes spin ": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "50%": {
      transform: "rotate(180deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
  "@keyframes noSpin ": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(0deg)",
    },
  },
  app_content: {
    background: "linear-gradient(45deg, #fff8f2 30%, #ffffff 90%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "30px",
    maxHeight: "750px",
    padding: " 0 20px 20px 20px",
    boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
    // position: "relative",
  },
  music_img: {
    width: "220px",
    borderRadius: "1000px",
    animation: `$spin linear 15000ms infinite`,
  },
  music_control: {
    display: "flex",
    alignItems: "center",
  },
  music_play_button: {
    borderRadius: "1000px",
    background: "linear-gradient(to right, #da4453, #89216b)",
    border: "none",
    padding: "12px",
    boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
    margin: "12px",
  },
  next_pre_song: {
    border: "none",
    padding: "10px",
    backgroundColor: "transparent",
    margin: "10px",
  },
  noplay: {
    animation: `$noSpin linear 15000ms infinite`,
  },
  music_name: {
    paddingTop: "100px",
    padding: "10px",
    fontSize: "20px",
    fontWeight: "700",
  },
  music_author: {
    padding: "5px",
    fontSize: "15px",
  },
  text_area: {
    maxHeight: "500px",
    maxWidth: "500px",
  },
  musicTimeLine: {
    padding: "0 50px",
  },
  musicSelected: {
    backgroundColor: "rgba(199, 143, 230, 0.24)",
    padding: "0",
    margin:"0",
  },
  customBox: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    wordBreak: "break-all",
    overflow: "hidden",
  },
  mainContent: {
    display: "box",
    lineClamp: 1,
    boxOrient: "vertical",
    overflow: "hidden",
  },
  timeSlider: {
    paddingTop: "10px !important",
  },
}));

export default useStyles;
