import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms.tsx";
import React from "react";
import { styled } from "styled-components";

interface IForm {
  toDo: string;
}

const Container_form = styled.form`
  position: relative;
  width: 400px;
  margin-left: 150px;
  margin-top: 50px;
`;

const Container_input = styled.input`
  font-size: 15px;
  color: #f7f7f7;
  width: 300px;
  border: none;
  border-bottom: solid #aaaaaa 1px;
  padding-bottom: 10px;
  padding-left: 10px;
  position: relative;
  background: none;
  z-index: 5;
  ::placeholder {
    color: #aaaaaa;
  }
  :focus {
    outline: none;
  }
`;

const Container_button = styled.button`
  width: 90px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
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

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState); // 값만 가지고싶다면 useRecoilvalue
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <Container_form onSubmit={handleSubmit(onSubmit)}>
      <Container_input
        {...register("toDo", {
          required: "Please write a To do",
        })}
        placeholder="Write a to do"
      />
      <Container_button>Add</Container_button>
    </Container_form>
  );
}

export default CreateToDo;
