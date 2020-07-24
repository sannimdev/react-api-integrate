import React, { useEffect } from "react";
import { useUsersDispatch, getUser, useUsersState } from "./UsersContext";

function User({ id }) {
  const state = useUsersState();
  const dispatch = useUsersDispatch();

  const { loading, data: user, error } = state.user;

  useEffect(() => {
    getUser(dispatch, id);
  }, [dispatch, id]);

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
