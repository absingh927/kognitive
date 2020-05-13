import React from "react";
import styled from "styled-components";
import { darken } from "polished";
import Task from "./Task";

const Container = styled.div`
  background: #fff;
  padding: 1rem;
  width: 100%;
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

const renderTasks = () => {
  return (
    <>
      <StatusHeader>
        <StatusBtn isCritical={true}>Critical 2</StatusBtn>
      </StatusHeader>
      <Task />
      <Task />
      <Task />
    </>
  );
};

const TaskListView = () => {
  // Progress Bar
  return (
    <Container>
      <ListViewHeader>
        <Wrapper>
          <MyTaskBtn>My Tasks</MyTaskBtn>
        </Wrapper>
        <Wrapper>{renderTasks()}</Wrapper>
      </ListViewHeader>
    </Container>
  );
};

export default TaskListView;
