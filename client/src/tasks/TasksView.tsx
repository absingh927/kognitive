import React from "react";
import { get } from "idb-keyval";
import { Redirect } from "react-router-dom";
import { User } from "../types";

interface TaskProps {
  userInfo: User | undefined;
}

const Tasks = (props: TaskProps) => {
  console.log("task view props", props);
  const [userInfo, setUserInfo] = React.useState<User | undefined>(
    props.userInfo || undefined
  );
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!props.userInfo) {
      get("userInfo").then((val) => {
        setUserInfo(val ? (val as User) : undefined);
        setLoading(false);
      });
    }
  }, [props.userInfo]);

  if (!userInfo && !loading) {
    return <Redirect to="/" />;
  }

  return <h1>View your tasks</h1>;
};

export default Tasks;
