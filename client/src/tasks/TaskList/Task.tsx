import React from "react";
import styled from "styled-components";

// icon imports
import CritcalIcon from "../../assets/icons/16/icons-16-emptyTask-critical.png";
import CritcalIcon2x from "../../assets/icons/16/icons-16-emptyTask-critical@2x.png";
import CritcalIcon3x from "../../assets/icons/16/icons-16-emptyTask-critical@3x.png";

import Empty from "../../assets/icons/16/icons-16-emptyTask.png";
import Empty2x from "../../assets/icons/16/icons-16-emptyTask@2x.png";
import Empty3x from "../../assets/icons/16/icons-16-emptyTask@3x.png";

// import Roi from "../../assets/icons/16/icons-16-emptyTask-roi.png";
// import Roi2x from "../../assets/icons/16/icons-16-emptyTask-roi@2x.png";
// import Roi3x from "../../assets/icons/16/icons-16-emptyTask-roi@3x.png";

import RightArrow from "../../assets/icons/16/icons-16-rightarrowSmall.png";
import RightArrow2x from "../../assets/icons/16/icons-16-rightarrowSmall@2x.png";
import RightArrow3x from "../../assets/icons/16/icons-16-rightarrowSmall@3x.png";
import { TaskData } from "../TasksView";

const TaskContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;
const StatusIcon = styled.div`
  width: 10%;
  text-align: center;
  align-self: baseline;
`;

const TaskInfo = styled.div`
  width: 90%
  padding-left: 0.5rem;
  font-weight: 800;
  color: #2b2928;
`;

const TaskDue = styled.div`
  color: #ff602b;
  display: flex;
  padding-top: 0.25rem;

  img {
    margin-right: 0.25rem;
  }
`;

interface TaskProps {
  task: TaskData;
  isCritical: boolean;
}

const getIcon = (isCritical?: boolean) => {
  const critical = (
    <img
      src={CritcalIcon}
      srcSet={`${CritcalIcon2x} 2x, ${CritcalIcon3x} 3x`}
      alt="CritcalIcon"
    />
  );
  const dummy = (
    <img src={Empty} srcSet={`${Empty2x} 2x, ${Empty3x} 3x`} alt="Icon" />
  );
  return isCritical ? critical : dummy;
};

const Task = (props: TaskProps) => {
  return (
    <TaskContainer>
      <StatusIcon>{getIcon(props.isCritical)}</StatusIcon>
      <TaskInfo>
        {props.task.attr.label[0]}
        <TaskDue>
          <img
            src={RightArrow}
            srcSet={`${RightArrow2x} 2x, ${RightArrow3x} 3x`}
            alt="RightArrow"
          />
          {props.task.due_dt}
        </TaskDue>
      </TaskInfo>
    </TaskContainer>
  );
};

export default Task;
