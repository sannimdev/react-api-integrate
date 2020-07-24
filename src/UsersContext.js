import React, { createContext, useReducer, useContext } from "react";
import * as api from "./api";
import createAsyncDispatcher, { initialAsyncState, createAsyncHandler } from "./asyncActionUtils";

const initialState = {
  users: initialAsyncState,
  user: initialAsyncState,
};

//6개의 ACTION
/*
여러 유저 가져오기
GET_USERS
GET_USERS_SUCCESS
GET_USERS_ERROR

GET_USER
GET_USER_SUCCESS
GET_USER_ERROR
*/

const usersHandler = createAsyncHandler("GET_USERS", "users");
const userHandler = createAsyncHandler("GET_USER", "user");

function usersReducer(state, action) {
  switch (action.type) {
    case "GET_USERS":
    case "GET_USERS_SUCCESS":
    case "GET_USERS_ERROR":
      return usersHandler(state, action);
    case "GET_USER":
    case "GET_USER_SUCCESS":
    case "GET_USER_ERROR":
      return userHandler(state, action);
    default:
      throw new Error("Unhandled action type", action.type);
  }
}

//컴포넌트 최적화를 위해 따로 Context를 만들어 준다.
const UsersStateContext = createContext(null);
const UsersDispatchContext = createContext(null);

export function UsersProvider({ children }) {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  return (
    <UsersStateContext.Provider value={state}>
      <UsersDispatchContext.Provider value={dispatch}>{children}</UsersDispatchContext.Provider>
    </UsersStateContext.Provider>
  );
}

//useContext로 사용하는 대신에 사용하기 용이하게 함수를 통해 내보내 주는 작업
export function useUsersState() {
  const state = useContext(UsersStateContext);
  if (!state) {
    throw new Error("Cannot find UserProvider");
  }
  return state;
}

export function useUsersDispatch() {
  const dispatch = useContext(UsersDispatchContext);
  if (!dispatch) {
    throw new Error("Cannot find DispatchProvider");
  }
  return dispatch;
}

export const getUsers = createAsyncDispatcher("GET_USERS", api.getUsers);
export const getUser = createAsyncDispatcher("GET_USER", api.getUser);
