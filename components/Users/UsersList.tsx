import { Fragment } from "react";
import { Company } from "../../models/company";
import { Post } from "../../models/post";
import { User } from "../../models/user";
import UserProfile from "./User";

const UsersLists: React.FC<{ users: User<Post, Company>[] }> = (props) => {
  return (
    <Fragment>
      {props.users.map((elem: any) => {
        return <UserProfile key={elem.id} user={elem} />;
      })}
    </Fragment>
  );
};

export default UsersLists;
