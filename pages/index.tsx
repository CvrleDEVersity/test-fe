import type { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import UsersLists from "../components/Users/UsersList";
import axios from "axios";

const saveData = async () => {
  const users = axios.get("https://jsonplaceholder.typicode.com/users");
  const posts = axios.get("https://jsonplaceholder.typicode.com/posts");
  const images = axios.get("https://randomuser.me/api/?inc=picture&results=10");
  const usersWithPosts = await Promise.all([users, posts, images]).then(
    (values) => {
      const data = values.map((res) => res.data);
      const userData = data[0].map((user: any, id: number) => {
        const post = data[1].filter((post: any) => post.userId === user.id);
        const image = data[2].results[id].picture.thumbnail;
        return { ...user, image, post };
      });
      return userData;
    }
  );
  const addUsers = axios.post(
    "http://localhost:4000/api/users",
    JSON.stringify(usersWithPosts),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return usersWithPosts;
};

const getData = () => {
  return axios
    .get("http://localhost:4000/api/users", {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((resp) => resp.data);
};
const Home: React.FC = (props: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "LOAD", payload: props });
  }, [dispatch, props]);

  return <UsersLists users={props.users} />;
};

export const getServerSideProps: GetServerSideProps = async (
  context: Record<string, any>
) => {
  const usersWithPosts = await getData();
  //const usersWithPosts = saveData()
  return {
    props: {
      users: usersWithPosts,
    },
  };
};

export default Home;
