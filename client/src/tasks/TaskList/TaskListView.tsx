import React from "react";
import styled from "styled-components";
import { darken } from "polished";

const Container = styled.div`
  background: #fff;
  padding: 2rem;
`;

const ListViewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MyTaskBtn = styled.div`
  background-color: #8e3cc9;
  border: 1px solid #8e3cc9;
  color: #fff;
  padding: 0.5rem 0.75rem;
  text-align: center;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: ${darken("0.1", "#8e3cc9")};
  }
`;

const TaskListView = () => {
  // Header
  // Progress Bar
  // loop of tasks, by importance
  return (
    <Container>
      <ListViewHeader>
        <MyTaskBtn>My Tasks</MyTaskBtn>
      </ListViewHeader>
      {/* Progress Bar */}
    </Container>
  );
};

export default TaskListView;
