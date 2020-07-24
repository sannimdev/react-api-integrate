import React, { useReducer, useEffect, useCallback } from "react";

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

//callback: API 호출하는 함수
//deps(dependencies)
function useAsync(callback, deps = [], skip = false) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });
  const fetchData = useCallback(async () => {
    dispatch({ type: "LOADING" });
    try {
      const data = await callback();
      dispatch({ type: "SUCCESS", data });
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  }, [callback]);
  useEffect(() => {
    if (skip) {
      return;
    }
    fetchData();
    //eslint-disable-next-line
  }, deps);

  return [state, fetchData];
}

export default useAsync;
