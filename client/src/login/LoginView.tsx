import React from "react";
import { set } from "idb-keyval";
import { Redirect } from "react-router-dom";
import { User } from "../types";
import styled from "styled-components";
import { authenticateUser } from "./LoginService";
import { darken } from "polished";

// Icon imports
import google from "../assets/icons/othersize/google-favicon.png";
import google2x from "../assets/icons/othersize/google-favicon@2x.png";
import google3x from "../assets/icons/othersize/google-favicon@3x.png";

import microsoft from "../assets/icons/othersize/microsoft.png";
import microsoft2x from "../assets/icons/othersize/microsoft@2x.png";
import microsoft3x from "../assets/icons/othersize/microsoft@3x.png";

import personIcon from "../assets/icons/24/icon-24-person-grey.png";
import personIcon2x from "../assets/icons/24/icon-24-person-grey@2x.png";
import personIcon3x from "../assets/icons/24/icon-24-person-grey@3x.png";

import pwdIcon from "../assets/icons/24/icon-24-password.png";
import pwdIcon2x from "../assets/icons/24/icon-24-password@2x.png";
import pwdIcon3x from "../assets/icons/24/icon-24-password@3x.png";

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
  min-height: 300px;
  max-width: 450px;
  width: 100%;
`;

const AuthButton = styled.div`
  padding: 0.5rem 1.5rem;
  background-color: #fff;
  border: 1px solid #f2f4f4;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  cursor: pointer;
  margin: 1rem 0;
  font-size: 0.75rem;

  img {
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: ${darken("0.2", "#f2f4f4")};
  }
`;

const Spacer = styled.div`
  margin: 1.5rem 0;
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 0.5rem 0;
`;

const StyledInput = styled.input`
  border-radius: 0.25rem;
  background: #f2f4f4;
  border: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  padding: 1rem 0;
  display: block;
  width: 100%;

  :placeholder {
    color: ${darken("0.2", "#f2f4f4")};
  }

  :focus {
    outline: none;
  }
`;

const InputIcon = styled.img`
  background: #f2f4f4;
  max-width: 15px;
  padding: 1rem 0.5rem;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
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
      // send data to persistance state and update local state
      set("userInfo", formattedData).then(() => {
        setUserInfo(formattedData);
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const renderform = () => {
    return (
      <>
        <AuthButton>
          <img
            src={google}
            srcSet={`${google2x} 2x, ${google3x} 3x`}
            alt="Google Logo"
          />
          Login with Google
        </AuthButton>
        <AuthButton>
          <img
            src={microsoft}
            srcSet={`${microsoft2x} 2x, ${microsoft3x} 3x`}
            alt="Microsoft logo"
          />
          Login with Microsoft
        </AuthButton>
        <Spacer>OR</Spacer>
        <FormGroup onSubmit={handleLogin}>
          <InputContainer>
            <InputIcon
              src={personIcon}
              srcSet={`${personIcon2x} 2x, ${personIcon3x} 3x`}
              alt="person"
            />
            <StyledInput
              type="email"
              name="email"
              placeholder="Your Employee ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <InputIcon
              src={pwdIcon}
              srcSet={`${pwdIcon2x} 2x, ${pwdIcon3x} 3x`}
              alt="password"
            />
            <StyledInput
              type="password"
              name="password"
              placeholder="Your Password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </InputContainer>
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
