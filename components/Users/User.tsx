import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import UserPost from "./UserPost";
import { User } from "../../models/user";
import { Post } from "../../models/post";
import classesModule from "./Users.module.css";
import { Avatar, CardActionArea, CardHeader, Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import { Company } from "../../models/company";
import PaginationComponent from "../UI/Pagination";

const useStyles = makeStyles({
  root: {
    minWidth: 175,
    marginTop: "3%",
    marginLeft: "4%",
    width: "80%",
    backgroundColor: "white",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "blue",
  },
  pos: {
    marginBottom: 12,
  },
  avatar: {
    width: "4rem",
    height: "4rem",
  },
  email: {
    marginRight: "2%",
    display: "flex",
    flexDirection: "row-reverse",
  },
});

const UserPage: React.FC<{ user: User<Post, Company> }> = (props) => {
  const classes = useStyles();
  const [pages, setPages] = useState(Math.round(props.user.post.length / 3));
  const router = useRouter();
  const [posts, setPosts] = useState(props.user.post.slice(0, 3));
  const handleClickUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push(`/user/${props.user.id}`);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    let numberPerPage = 3;
    let begin = (value - 1) * numberPerPage;
    let end = begin + numberPerPage;
    if (value === 1) {
      setPosts(props.user.post.slice(0, 3));
    } else if (value === pages) {
      setPosts(props.user.post.slice(props.user.post.length - 3));
    } else {
      setPosts(props.user.post.slice(begin, end));
    }
  };
  return (
    <Grid item xs={12} md={6} lg={6}>
      <Card className={classes.root}>
        <CardActionArea onClick={(e) => handleClickUser(e)}>
          <CardHeader
            avatar={
              <Avatar
                className={classes.avatar}
                src={props.user.image}
              ></Avatar>
            }
            subheader={props.user.name + ", " + props.user.username}
          />
          <Typography variant="inherit" className={classes.email}>
            {props.user.email}
          </Typography>
        </CardActionArea>
        <CardContent>
          <Typography
            variant="body2"
            component="div"
            style={{ height: "37rem" }}
          >
            {posts.map((elem) => {
              return (
                <div key={Math.random()} className={classesModule.list}>
                  <UserPost
                    key={Math.random()}
                    title={elem.title}
                    body={elem.body}
                  />
                </div>
              );
            })}
          </Typography>
          <PaginationComponent pages={pages} handleChange={handleChange} />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default UserPage;
