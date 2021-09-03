import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Post } from "../../models/post";

const useStyles = makeStyles({
  root: {
    minWidth: 175,
    backgroundColor: "black",
    color: "white",
    borderRadius: "10% 2% 10% 2%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

const UserPost: React.FC<Post> = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} key={props.title}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {props.title}
        </Typography>
        <Typography>{props.body}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserPost;
