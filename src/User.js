import React from "react";
import axios from "axios";
import useAsync from "./useAsync";

async function getUser(id) {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
  return response.data;
}

function User({ id }) {
  const [state] = useAsync(() => getUser(id), [id]); //id값이 바뀔 때마다 함수를 호출하겠다
  const { loading, data: user, error } = state;

  if (loading) return <div>로딩 중</div>;
  if (error) return <div>오류가 발생했습니다. </div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      <p>{user.email}</p>
    </div>
  );
}

export default User;
