import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import UserPost from "./UserPost";
import { User } from "../../models/user";
import { Post } from "../../models/post";
import classesModule from "./Users.module.css";
import {
  Avatar,
  CardActionArea,
  CardHeader,
  Grid,
  Link,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { Company } from "../../models/company";
import { useEffect } from "react";
import axios from "axios";
import PaginationComponent from "../UI/Pagination";

const useStyles = makeStyles({
  root: {
    backgroundColor: "lightgray",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
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
  company: {
    marginTop: "10%",
    backgroundColor: "white",
    border: "2px solid black",
    padding: "1%",
  },
});

const callApi = async (id: string): Promise<User<Post, Company>> => {
  if (id) {
    const user: User<Post, Company> = await axios
      .get(`http://localhost:4000/api/users/${id}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjEtNzcwLTczNi04MDMxIHg1NjQ0MiIsImlhdCI6MTYzMDQ5ODE5M30.HWs3x5sJ3bJVzqLfjkISW9T69KOol8gZMTWeN-9agm0",
        },
      })
      .then((resp) => resp.data);
    return user;
  }
  return {
    id: "",
    email: "",
    username: "",
    image: "",
    company: { name: "", bs: "", catchPhrase: "" },
    post: [],
    name: "",
    website: "",
  };
};

const UserDetails: React.FC<{ user: User<Post, Company>; userId: string }> =
  React.memo((props) => {
    const classes = useStyles();
    const router = useRouter();
    const [pages, setPages] = useState(0);
    const [userInfo, setUserInfo] = useState(props.user || {});
    const [posts, setPosts] = useState([] as Post[]);
    const [slide, setSlide] = useState(false);
    const userId = router.query.userId as string;
    const handleClickUser = (e: React.MouseEvent<HTMLButtonElement>) => {
      router.push(`/user/${props.user.id}`);
    };

    useEffect(() => {
      const call = async () => {
        if (!props.user) {
          if (userId) {
            const user: any = await callApi(userId);
            setUserInfo(user);
            setPosts(user.post.slice(0, 3));
            setPages(Math.round(user.post.length / 3));
          }
        } else {
          setUserInfo(props.user);
          setPosts(props.user.post.slice(0, 3));
          setPages(Math.round(props.user.post.length / 3));
        }
      };
      call();
    }, [userId]);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      let numberPerPage = 3;
      let begin = (value - 1) * numberPerPage;
      let end = begin + numberPerPage;
      if (value === 1) {
        setPosts(userInfo.post.slice(0, 3));
      } else if (value === pages) {
        setPosts(userInfo.post.slice(userInfo.post.length - 3));
      } else {
        setPosts(userInfo.post.slice(begin, end));
      }
    };
    return (
      <Grid item lg={12} md={12} xs={12}>
        {userInfo && (
          <Card className={classes.root}>
            <CardActionArea onClick={(e) => handleClickUser(e)}>
              <CardHeader
                avatar={
                  <Avatar
                    className={classes.avatar}
                    src={userInfo?.image}
                  ></Avatar>
                }
              />
              <Typography variant="inherit" className={classes.title}>
                {userInfo?.name}, {userInfo?.username}
              </Typography>
              <Typography variant="inherit" className={classes.email}>
                {userInfo.email}
              </Typography>
            </CardActionArea>
            <CardContent>
              <Grid container>
                <Grid item lg={4}>
                  <div className={classes.company}>
                    <Typography>Company: {userInfo.company?.name}</Typography>
                    <Typography>
                      Company&apos;s bs: {userInfo.company?.bs}
                    </Typography>
                    <Typography>
                      Company&apos;s Catch Phrase:{" "}
                      {userInfo.company?.catchPhrase}
                    </Typography>

                    <Typography>
                      Website:{" "}
                      <Link href={`https://www.${userInfo.website}`}>
                        <>{userInfo.website}</>
                      </Link>
                    </Typography>
                  </div>
                </Grid>
                <Grid item lg={8}>
                  <Typography variant="body2" component="div">
                    {posts.map((elem: any) => {
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
                    <PaginationComponent
                      slide={slide}
                      pages={pages}
                      handleChange={handleChange}
                    />
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Grid>
    );
  });

export default UserDetails;
