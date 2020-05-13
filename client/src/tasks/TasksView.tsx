import React from "react";
import { get, set } from "idb-keyval";
import { Redirect } from "react-router-dom";
import { User } from "../types";
import { getTaskList } from "./TaskService";
import styled from "styled-components";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";

const TaskViewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f2f4f4;
  margin: 0 1rem;
`;

interface TaskProps {
  userInfo: User | undefined;
}

const Tasks = (props: TaskProps) => {
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
      getTaskList(userInfo.user_token).then((res) => {
        console.log("res.data", res.data);
        setTasks(res.data);
        set("taskList", res.data);
      });
    }
  }, [userInfo]);

  if (!userInfo && !loading) {
    return <Redirect to="/" />;
  }
  console.log("tasks", tasks);
  return (
    <>
      <TaskViewContainer>
        {/* Top NAV */}
        <MainNav />
        {/* Main Card Wrapper */}
      </TaskViewContainer>
      {/* Mobile Nav */}
      <MobileNav />
    </>
  );
};

export default Tasks;
