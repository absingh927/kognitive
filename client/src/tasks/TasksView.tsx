import React from "react";
import { get, set } from "idb-keyval";
import { Redirect } from "react-router-dom";
import { User } from "../types";
import { getTaskList, RawTask } from "./TaskService";
import styled from "styled-components";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
import TaskListView from "./TaskList/TaskListView";

const TaskViewContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f2f4f4;
  margin: 0 1rem;
  flex-direction: column;
  height: calc(100vh - 125px);
`;

interface TaskViewProps {
  userInfo: User | undefined;
}

export interface TaskData {
  assignee: string;
  attr: {
    description: string;
    label: string[];
    priority: string[];
  };
  creator: string;
  due_dt: string;
  id: number;
  owner: number;
  parent_id: number;
  reminder_dt: string;
  start_dt: string;
  status: string;
}

const processRawData = (rawData: RawTask[]): TaskData[] => {
  const parsed = rawData.map((rt) => {
    return {
      ...rt,
      attr: JSON.parse(rt.attr),
    };
  });
  return parsed;
};

const Tasks = (props: TaskViewProps) => {
  const [userInfo, setUserInfo] = React.useState<User | undefined>(
    props.userInfo || undefined
  );
  const [loading, setLoading] = React.useState(true);
  const [tasks, setTasks] = React.useState<TaskData[]>([]);

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
        const processedData = processRawData(res);
        setTasks(processedData);
        set("taskList", processedData);
      });
    }
  }, [userInfo]);

  if (!userInfo && !loading) {
    return <Redirect to="/" />;
  } else if (loading) {
    return <h4>Loading....</h4>;
  }

  return (
    <>
      <TaskViewContainer>
        <MainNav />
        <TaskListView taskData={tasks} />
      </TaskViewContainer>
      <MobileNav />
    </>
  );
};

export default Tasks;
