import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./login/LoginView";
import Tasks from "./tasks/TasksView";
import { Container } from "reactstrap";
import { User } from "./types";
import { get } from "idb-keyval";

function App() {
  const [userInfo, setUserInfo] = React.useState<User | undefined>(undefined);

  React.useEffect(() => {
    get("userInfo").then((val) => {
      setUserInfo(val ? (val as User) : undefined);
    });
  }, []);

  return (
    <Container fluid={true} style={{ height: "100vh" }}>
      <Router>
        <Switch>
          <Route
            path="/login"
            render={(props) => <Login {...props} userInfo={userInfo} />}
          />
          <Route
            path="/tasks"
            render={(props) => <Tasks {...props} userInfo={userInfo} />}
          />
          <Redirect exact path="/" to={"/login"} />
          <Route exact render={() => <h1>Opps, Page not found!</h1>} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
