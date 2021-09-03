import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useRouter } from "next/router";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
  root: {
    flexGrow: 0,
    backgroundColor: "white",
    height: "100%",
    margin: 0,
  },
  tab: {
    color: "lightskyblue",
    //marginLeft: "50%",
    fontWeight: "bold",
    fontSize: "30",
    marginBottom: "none",
    height: "100%",
  },
});

export default function Header() {
  const classes = useStyles();
  const router = useRouter();
  const tab = useSelector((state: RootStateOrAny) => state.tab);
  const dispatch = useDispatch();
  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    event.preventDefault();
    const url = router.query.userId ? `${newValue}` : `user/${newValue}`;
    switch (newValue) {
      case 0:
        dispatch({ type: "LIST" });
        router.push("/");

        break;
      case 1:
        dispatch({ type: "ADD" });
        router.push(`/addpost`);

        break;
      case 2:
        router.push(url);
        break;
    }
  };

  return (
    <Paper
      variant="outlined"
      elevation={10}
      style={{ border: "none", height: "4rem" }}
    >
      <Tabs
        value={tab}
        onChange={handleChange}
        className={classes.tab}
        TabIndicatorProps={{ style: { backgroundColor: "black" } }}
      >
        <Tab label="List All Users" />
        {/* <Tab label="Add a Post" /> */}
      </Tabs>
    </Paper>
  );
}
