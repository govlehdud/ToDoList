import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  Categories,
  categoryState,
  toDoSelector,
  toDoState,
} from "../atoms.tsx";
import CreateToDo from "./CreateToDo.tsx";
import ToDo from "./ToDo.tsx";

const Container_h1 = styled.h1`
  position: relative;
  text-align: center;
  color: #ed5ff1;
  font-size: 50px;
  font-family: "Cormorant Garamond", serif;
`;

const Container_div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2b1357d5;
  width: 100vw;
  height: 100vh;
`;

const Container_hr = styled.hr`
  width: 100%;
`;

const Container_select = styled.select`
  width: 200px;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 12px 13px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  :focus {
    border: 1px solid #9b51e0;
    box-sizing: border-box;
    border-radius: 10px;
    outline: 3px solid #f8e4ff;
    border-radius: 10px;
  }
`;

// toDoSelector 와 categoryState는 atom을 이용해 가져왔다.
// 차이점이라면 useRecoilState는 modify 함수를 사용할 수 있고, useRecoilValue는 읽기 전용이다.

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  console.log(category);
  // const value = useRecoilValue(toDoState); // atom의 값을 읽어오는 함수 || 빈값을 가져옴
  // const modFn = useSetRecoilState(toDoState); // atom의 값을 수정하는 함수 || 빈값에 데이터를 넣어줌
  // value만 사용하고싶으면 useRecoilValue를 사용하고, setValue처럼 사용하고싶으면 useSetRecoilState를 사용하면된고
  // 둘다 사용하고싶으면 useRecoilState를 사용하면된다.
  console.log(toDos);
  return (
    <Container_div>
      <Container_h1>To Dos</Container_h1>
      <Container_hr />
      <form>
        <Container_select value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </Container_select>
      </form>
      <CreateToDo />
      {toDos.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Container_div>
  );
}

export default ToDoList;
