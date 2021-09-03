import { NextPage } from "next";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { Post } from "../../models/post";
import UserDetails from "../../components/Users/UserDetails";
import { Grid } from "@material-ui/core";
import AddPost from "../../components/AddPost";

export type UserState = {
  id: string;
  name: string;
  email: string;
  company: string;
  website: string;
  userPosts: Post[];
};

const User: NextPage = () => {
  const state = useSelector((state: any): any => state);
  const router = useRouter();
  const [userInfo, setUserInfo] = useState((state: UserState): any => state);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const asyncCall = async () => {
      if (router.query.userId) {
        const user = state.users.find(
          (elem: UserState) => elem.id == router.query.userId
        );
        setUserInfo(user);
        setUserId(router.query.userId as string);
      }
    };
    asyncCall();
  }, [state.users, userInfo, router.query.userId]);

  return (
    <Fragment>
      <>
        <Grid item lg={8}>
          <UserDetails user={userInfo} userId={userId} />
        </Grid>
        <Grid item lg={4}>
          <AddPost />
        </Grid>
      </>
    </Fragment>
  );
};

export default User;
