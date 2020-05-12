import axios from "axios";

export interface LoginPayload {
  email: string;
  password: string;
  tenantid: number;
}
export const authenticateUser = async (loginPayload: LoginPayload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios
    .post("/api/login", JSON.stringify(loginPayload), config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => err);
};
