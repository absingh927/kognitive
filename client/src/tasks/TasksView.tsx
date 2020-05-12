import React from "react"
import { get } from "idb-keyval"
import { Redirect } from "react-router-dom"
import { User } from "../types"

const Tasks = () => {
  const [userInfo, setUserInfo] = React.useState<User | boolean>(false)

  React.useEffect(() => {
    get("userInfo").then(val => {
      setUserInfo(val ? val as User : false)
    })
  }, [])

  if (!userInfo) {
    return <Redirect to="/login" />
  }

  return (
    <h1>View your tasks</h1>
  )
}

export default Tasks