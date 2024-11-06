import React from "react";
import { Categories, IToDo, toDoState } from "../atoms.tsx";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

const Container_button = styled.button`
  width: 90px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  margin-right: 10px;
  padding: 10px 25px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
  background: rgb(6, 14, 131);
  background: linear-gradient(
    0deg,
    rgba(6, 14, 131, 1) 0%,
    rgba(12, 25, 180, 1) 100%
  );
  border: none;
  :hover {
    background: rgb(0, 3, 255);
    background: linear-gradient(
      0deg,
      rgba(0, 3, 255, 1) 0%,
      rgba(2, 126, 251, 1) 100%
    );
  }
`;

const Container_li = styled.li`
  list-style: square inside
    url("https://www.finney-taylor.com/App_Themes/FTaylor/images/bullets/listBullet.gif");
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onDelete = () => {
    setToDos((oldTodos) => oldTodos.filter((todo) => todo.id !== id));
  };

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex), // Back
        newToDo, // 현재 값
        ...oldToDos.slice(targetIndex + 1), // Front
      ];
    });
  };
  return (
    <Container_li>
      <span>{text}</span>
      <br />
      {category !== Categories.DOING && (
        <Container_button name={Categories.DOING + ""} onClick={onClick}>
          Doing
        </Container_button>
      )}
      {category !== Categories.TO_DO && (
        <Container_button name={Categories.TO_DO + ""} onClick={onClick}>
          To Do
        </Container_button>
      )}
      {category !== Categories.DONE && (
        <Container_button name={Categories.DONE + ""} onClick={onClick}>
          Done
        </Container_button>
      )}
      <Container_button onClick={onDelete}>Delete</Container_button>
    </Container_li>
  );
}

export default ToDo;
