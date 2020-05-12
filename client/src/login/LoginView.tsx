import React from "react";
import { set } from "idb-keyval";
import { Redirect } from "react-router-dom";
import { User } from "../types";
import {
  Row,
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { authenticateUser } from "./LoginService";

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
        <div className="d-flex flex-column">
          <Button outline color="primary" className="mb-2">
            Login with Google
          </Button>
          <Button outline color="primary" className="mt-2">
            Login with Microsoft
          </Button>
        </div>
        <div className="text-center mt-4 mb-4">OR</div>
        <Form onSubmit={handleLogin}>
          <FormGroup>
            <Input
              type="email"
              name="email"
              placeholder="Your Employee Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-2"
            />
            <Input
              type="password"
              name="password"
              placeholder="Your Password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className="mt-2"
            />
          </FormGroup>
          <Button color="primary" disabled={!validateForm()} type="submit">
            Login
          </Button>
        </Form>
      </>
    );
  };
  return (
    <Row
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card>
        <CardBody>
          {loading ? <p>Logging you in.....</p> : renderform()}
        </CardBody>
      </Card>
    </Row>
  );
};

export default Login;
