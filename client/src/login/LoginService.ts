import axios from "axios";

export interface LoginPayload {
  email: string;
  password: string;
  tenantid: number;
}
export const authenticateUser = async (payload: LoginPayload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios
    .post("/api/login", JSON.stringify(payload), config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => err);
};
