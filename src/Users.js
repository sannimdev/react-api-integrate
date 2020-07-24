import React, { useReducer, useEffect } from "react";
import axios from "axios";

//LOADING, SUCCESS, ERROR의 상태 관리
/*
프로젝트의 규모가 확장되면 파일을 별도로 꺼내서 작성하여
재사용성을 높일 수 있다.
*/
function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled Action Type: ${action.type}`);
  }
}

function Users() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  //컴포넌트 초기 로드 시
  const fetchUsers = async () => {
    dispatch({ type: "LOADING" });
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users/");
      dispatch({ type: "SUCCESS", data: response.data });
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const { loading, data: users, error } = state;
  if (loading) return <div>로딩 중</div>;
  if (error) return <div>오류 발생...</div>;
  if (!users) return null;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username}({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>다시 불러오기</button>
    </>
  );
}

export default Users;
