import React from "react";
import { get, set } from "idb-keyval";
import { Redirect } from "react-router-dom";
import { User } from "../types";
import { getTaskList } from "./TaskService";

interface TaskProps {
  userInfo: User | undefined;
}

const Tasks = (props: TaskProps) => {
  console.log("task view props", props);
  const [userInfo, setUserInfo] = React.useState<User | undefined>(
    props.userInfo || undefined
  );
  const [loading, setLoading] = React.useState(true);
  const [tasks, setTasks] = React.useState();

  React.useEffect(() => {
    if (!props.userInfo) {
      get("userInfo").then((val) => {
        setUserInfo(val ? (val as User) : undefined);
        setLoading(false);
      });
    }
  }, [props.userInfo]);

  React.useEffect(() => {
    if (userInfo) {
      getTaskList(userInfo.user_token, "357").then((res) => {
        setTasks(res.data);
        set("taskList", res.data);
      });
    }
  }, [userInfo]);

  if (!userInfo && !loading) {
    return <Redirect to="/" />;
  }
  console.log("tasks", tasks);
  return <h1>View your tasks</h1>;
};

export default Tasks;
