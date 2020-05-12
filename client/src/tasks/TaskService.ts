import axios from "axios";

export const getTaskList = (token: string, parentId?: string) => {
  const config = {
    headers: {
      usertoken: token,
    },
  };

  const url = parentId ? `api/tasks/${parentId}` : "api/tasks";

  return axios
    .get(url, config)
    .then((res) => res.data)
    .catch((err) => err);
};
