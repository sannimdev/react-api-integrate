import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";
import { useAsync } from "react-async";
import User from "./User";

/*
react-async 바로 설치해서 사용할 수 있음. (컴포넌트 형태로도 사용 가능)
특정 Promise를 기다리는 작업을 도중에 취소할 수도 있음.

그러나 옵션이 복잡하다.
커스텀 훅보다는 더 많은 기능을 제공하므로 옵션이 다양하다. 그래서 처음에 혼동할 수 있음.
 */

async function getUsers() {
  const response = await axios.get("https://jsonplaceholder.typicode.com/users/");
  return response.data;
}

function Users() {
  const [userId, setUserId] = useState(null);
  const { data: users, error, isLoading, reload, run } = useAsync({
    deferFn: getUsers,
  });
  if (isLoading) return <div>로딩 중</div>;
  if (error) return <div>오류 발생...</div>;
  if (!users) return <button onClick={run}>불러오기</button>;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => setUserId(user.id)}>
            {user.username}({user.name})
          </li>
        ))}
      </ul>
      <button onClick={reload}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;
