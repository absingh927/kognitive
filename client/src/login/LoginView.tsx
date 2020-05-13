import React from "react";
import { set } from "idb-keyval";
import { Redirect } from "react-router-dom";
import { User } from "../types";
import styled from "styled-components";
import { authenticateUser } from "./LoginService";
import { darken } from "polished";

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f2f4f4;
`;

const Wrapper = styled.div`
  padding: 2rem;
  margin: 0 1rem;
  background-color: #fff;
  border-radius: 0.5rem;
  min-height: 400px;
  max-width: 450px;
  width: 100%;
`;

const AuthButton = styled.div`
  padding: 1rem 1.5rem;
  background-color: #fff;
  border: 1px solid #f2f4f4;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  cursor: pointer;
  margin: 1rem 0;

  &:hover {
    background-color: ${darken("0.2", "#f2f4f4")};
  }
`;

const Spacer = styled.div`
  margin: 1.5rem 0;
  text-align: center;
`;

const StyledInput = styled.input`
  border-radius: 0.25rem;
  background: #f2f4f4;
  border: none;
  margin: 0.5rem 0;
  padding: 1rem 0.25rem;
  display: block;
  width: 100%;

  ::placeholder {
    color: ${darken("0.2", "#f2f4f4")};
  }
`;

const LoginButton = styled.button`
  background-color: #007bff;
  border: 1px solid #007bff;
  color: #fff;
  padding: 0.5rem 0.75rem;
  text-align: center;
  border-radius: 10rem;
  margin-top: 1rem;
`;

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface LoginProps {
  userInfo: User | undefined;
}

const Login = (props: LoginProps) => {
  const [userInfo, setUserInfo] = React.useState<User | undefined>(undefined);
  const [email, setEmail] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  if ((props.userInfo && props.userInfo.user_id) || userInfo) {
    return <Redirect to="/tasks" />;
  }

  const validateForm = () => {
    return email.length > 0 && pwd.length > 0;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      email: email,
      password: pwd,
      tenantid: 3,
    };
    setLoading(true);

    try {
      const data = await authenticateUser(payload);
      const formattedData = {
        user_token: data.user_token,
        user_id: data.user_id,
        user_email: email,
      };
      setLoading(false);
      set("userInfo", formattedData).then(() => {
        setUserInfo(formattedData);
      });

      // state
    } catch (error) {
      setLoading(false);
    }
  };

  const renderform = () => {
    return (
      <>
        <AuthButton>Login with Google</AuthButton>
        <AuthButton>Login with Microsoft</AuthButton>
        <Spacer>OR</Spacer>
        <FormGroup onSubmit={handleLogin}>
          <StyledInput
            type="email"
            name="email"
            placeholder="Your Employee ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledInput
            type="password"
            name="password"
            placeholder="Your Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <LoginButton color="primary" disabled={!validateForm()} type="submit">
            LogIn
          </LoginButton>
        </FormGroup>
      </>
    );
  };
  return (
    <LoginContainer>
      <Wrapper>{loading ? <p>Logging you in.....</p> : renderform()}</Wrapper>
    </LoginContainer>
  );
};

export default Login;
