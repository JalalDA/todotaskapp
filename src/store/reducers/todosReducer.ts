import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Itodo } from "../../types";

type TodosState = {
    todo : Itodo[];
    isLoading : boolean;
};

const initialState : TodosState = {
    todo : [],
    isLoading : false
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
      setIsLoading : (state, action)=>{
        state.isLoading = action.payload
      },
      resetTask : ()=>initialState,
      addTask: (state, action: PayloadAction<Itodo>) => {
        state.todo.push(action.payload);
      },
      deleteTask: (state, action: PayloadAction<string>) => {
        state.todo = state.todo.filter((item) => item.id !== action.payload);
      },
      updateTask: (state, action: PayloadAction<Itodo>) => {
        const index = state.todo.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.todo[index] = action.payload;
        }
      },
    },
});

export const {
    addTask,
    deleteTask,
    resetTask,
    setIsLoading,
    updateTask
} = todoSlice.actions;
export default todoSlice.reducer;