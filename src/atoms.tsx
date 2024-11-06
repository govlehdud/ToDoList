import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

// type Categories = "TO_DO" | "DOING" | "DONE";

const { persistAtom } = recoilPersist({
  key: "localStorage",
  storage: localStorage,
});

export const todoState = atom({
  key: "todo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export enum Categories {
  "TO_DO",
  "DOING",
  "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories; // 아무 string이 들어와도 되는게 아니라 명시된 위의 3개만 들어오겠금 제한
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
