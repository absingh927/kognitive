import React from "react"
import {get} from "idb-keyval"
import { Redirect } from "react-router-dom"
import { User } from "../types"

const Login = () => {
  const [userInfo, setUserInfo] = React.useState<User|boolean>(false)
  
  React.useEffect(() => {
    get("userInfo").then(val => {
      setUserInfo(val ? val as User : false)
    })
  }, [])

  if (userInfo) {
    console.log("isUser", userInfo)
    return <Redirect to="/tasks" />
  }

  console.log("isUser else", userInfo)
  return (
    <h1>This is the login form</h1>
  )
}

export default Login