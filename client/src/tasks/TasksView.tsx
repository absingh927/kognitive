import React from "react";
// import { get } from "idb-keyval";
import { Redirect } from "react-router-dom";
import { User } from "../types";

interface TaskProps {
  userInfo: User | undefined;
}

const Tasks = (props: TaskProps) => {
  // const [userInfo, setUserInfo] = React.useState<User | boolean>(false);

  // React.useEffect(() => {
  //   get("userInfo").then((val) => {
  //     setUserInfo(val ? (val as User) : false);
  //   });
  // }, []);

  if (!props.userInfo) {
    return <Redirect to="/login" />;
  }

  return <h1>View your tasks</h1>;
};

export default Tasks;
