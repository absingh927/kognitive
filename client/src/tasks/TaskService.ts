import axios from "axios";

export interface RawTask {
  assignee: string;
  attr: string;
  creator: string;
  due_dt: string;
  id: number;
  owner: number;
  parent_id: number;
  reminder_dt: string;
  start_dt: string;
  status: string;
}

export const getTaskList = (token: string, parentId?: string) => {
  const config = {
    headers: {
      usertoken: token,
    },
  };

  const url = parentId ? `api/tasks/${parentId}` : "api/tasks/";

  return axios
    .get(url, config)
    .then((res) => res.data as RawTask[])
    .catch((err) => err);
};
