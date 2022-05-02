import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import data from "./chatData.json";

export interface Message {
  id: string;
  last_updated: string;
  text: string;
}

export interface ChatThread {
  id: string;
  name: string;
  last_updated: string;
  messages: Message[];
}

export interface ChatsState {
  chatThreads: ChatThread[];
  activeThreadId: string;
}

const initialState: ChatsState = {
  chatThreads: data,
  activeThreadId: data[0].id,
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    updateActiveThreadId: (state, action: PayloadAction<{ id: string }>) => {
      console.log(state, action);
      state.activeThreadId = action.payload.id;
    },
  },
});

export const selectActiveThreadId = (state: RootState) =>
  state.chats.activeThreadId;
export const selectChatThreads = (state: RootState) => state.chats.chatThreads;
export const selectActiveThreadMessages = (state: RootState) =>
  state.chats.chatThreads.find(
    (chat) => chat.id === state.chats.activeThreadId
  )!.messages;

export const { updateActiveThreadId } = chatsSlice.actions;
export default chatsSlice.reducer;
