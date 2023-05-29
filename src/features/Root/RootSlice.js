import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../../core/services/LocalStorage";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  likeList: [],
  basketList: [],
  courseList: [],
  noteList: [],
  payList: [],
};

function likeItem(state, action) {
  state.likeList = action.payload;
}

function basketItem(state, action) {
  state.basketList = action.payload;
}

function courseItem(state, action) {
  state.courseList = action.payload;
}

function login(state, action) {
  setItem("email", action.payload.email);
  toast.success("شما وارد شدید");
  state.email = action.payload.email;
}

function notepad(state, action) {
  state.noteList = action.payload;
}

function payment(state, action) {
  state.payList = action.payload;
}

function close(state) {
  localStorage.clear();
  state.email = "";
  state.likeList = [];
  state.basketList = [];
  state.courseList = [];
  state.noteList = [];
  state.payList = [];
}

export const RootSlice = createSlice({
  name: "rootData",
  initialState,
  reducers: {
    login,
    close,
    likeItem,
    basketItem,
    courseItem,
    notepad,
    payment,
  },
});

export const {
  login: loginAction,
  close: closeAction,
  likeItem: likeAction,
  basketItem: basketAction,
  courseItem: courseAction,
  notepad: notepadAction,
  payment: paymentAction,
} = RootSlice.actions;

export default RootSlice.reducer;
