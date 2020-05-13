import React from "react";
import styled from "styled-components";
import { darken } from "polished";
import Task from "./Task";
import { TaskData } from "../TasksView";
import { Line } from "rc-progress";

const Container = styled.div`
  background: #fff;
  padding: 1rem;
  width: 93%;
  border-radius: 0.5rem;
`;

const ListViewHeader = styled.div`
  display: block;
`;

const MyTaskBtn = styled.button`
  background-color: #8e3cc9;
  border: 1px solid #8e3cc9;
  color: #fff;
  padding: 0.5rem 0.75rem;
  text-align: center;
  border-radius: 0.5rem;
  cursor: pointer;
  display: block;

  &:hover {
    background-color: ${darken("0.1", "#8e3cc9")};
  }
`;

const StatusHeader = styled.div`
  margin: 1rem 0;
`;

const StatusBtn = styled(MyTaskBtn)<{ isCritical?: boolean }>`
  background-color: ${(props) => (props.isCritical ? "#ff602b" : "#2b2928")};
  border-color: ${(props) => (props.isCritical ? "#ff602b" : "#2b2928")};
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;

  &:hover {
    background-color: none;
  }
`;

const Wrapper = styled.div`
  margin: 1rem 0;
`;

const TaskGroup = styled.div`
  margin: 1rem 0;
  max-height: 185px;
  overflow: scroll;
`;

interface TaskListViewProps {
  taskData: TaskData[];
}

const sortedByTime = (data: TaskData[]) => {
  return data.sort((a, b) => b.due_dt.localeCompare(a.due_dt));
};

const groubyPriority = (data: TaskData[]) => {
  return data.reduce<any>((acc, curr) => {
    const key = curr.attr.priority[0];
    acc[key] = [...(acc[key] || []), curr];
    return acc;
  }, {});
};

const renderCriticalTasks = (data: TaskData[]) => {
  if (data.length === 0) {
    return (
      <TaskGroup>
        <p>No Tasks available.</p>
      </TaskGroup>
    );
  }

  const grouped = groubyPriority(data)["High"];

  return (
    <>
      <StatusHeader>
        <StatusBtn isCritical={true}>Critical {grouped.length}</StatusBtn>
      </StatusHeader>
      <TaskGroup>
        {grouped.map((t: TaskData, idx: number) => {
          return <Task key={idx} isCritical={true} task={t} />;
        })}
      </TaskGroup>
    </>
  );
};

const renderAllTasks = (data: TaskData[]) => {
  if (data.length === 0) {
    return (
      <TaskGroup>
        <p>No Tasks available.</p>
      </TaskGroup>
    );
  }
  return (
    <>
      <StatusHeader>
        <StatusBtn isCritical={false}>Critical {data.length}</StatusBtn>
      </StatusHeader>
      <TaskGroup>
        {data.map((t: TaskData, idx: number) => {
          return <Task key={idx} isCritical={false} task={t} />;
        })}
      </TaskGroup>
    </>
  );
};

const getPercentCompleteTasks = (data: TaskData[]) => {
  if (data.length === 0) {
    return 0;
  }
  const d = data.reduce<any>((acc, curr) => {
    const key = curr.status;
    acc[key] = [...(acc[key] || []), curr];
    return acc;
  }, {});

  return Math.floor((d["Done"].length / data.length) * 100);
};

const TaskListView = (props: TaskListViewProps) => {
  const sortedData = sortedByTime(props.taskData);
  // Progress Bar
  return (
    <Container>
      <ListViewHeader>
        <Wrapper>
          <MyTaskBtn>My Tasks</MyTaskBtn>
        </Wrapper>
        <Wrapper>
          Today's Progress : {getPercentCompleteTasks(sortedData) + "%"}
          <Line
            percent={getPercentCompleteTasks(sortedData)}
            strokeWidth={4}
            strokeColor="#21ab07"
          />
        </Wrapper>
        <Wrapper>
          {renderCriticalTasks(sortedData)}
          {renderAllTasks(sortedData)}
        </Wrapper>
      </ListViewHeader>
    </Container>
  );
};

export default TaskListView;
