import Header from "./Header";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    backgroundColor: "darkgray",
    border: "1px solid lightgray",
    borderRadius: "0.1%",
  },
});

const Layout = (props: { children: any }) => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <Grid
        className={classes.root}
        container
        alignItems="stretch"
        alignContent="stretch"
        direction="row"
        spacing={1}
      >
        {props.children}
      </Grid>
    </>
  );
};

export default Layout;
