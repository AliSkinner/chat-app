import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import Hashes from "jshashes";
import chatData from "./chatData.json";
import { sortByRecent } from "../../common/util/sortByRecent";

const MD5 = new Hashes.MD5();

type Message = {
  id: string;
  last_updated: string;
  text: string;
};
type ChatThread = {
  id: string;
  name: string;
  last_updated: string;
  messages: Message[];
};
type ChatsState = {
  chatThreads: ChatThread[];
  activeThreadId: string;
  activeMessageId: string | null;
};

const sortedChatThreads = chatData.sort(sortByRecent).map((thread) => {
  return {
    ...thread,
    messages: thread.messages.sort(sortByRecent).reverse(),
  };
});

const initialState: ChatsState = {
  chatThreads: sortedChatThreads,
  activeThreadId: sortedChatThreads[0].id,
  activeMessageId: null,
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    updateActiveThreadId: (state, action: PayloadAction<{ id: string }>) => {
      state.activeThreadId = action.payload.id;
      state.activeMessageId = null;
    },

    updateActiveMessageId: (state, action: PayloadAction<{ id: string }>) => {
      state.activeMessageId = action.payload.id;
    },

    createNewMessage: (state, action: PayloadAction<{ text: string }>) => {
      const thread = state.chatThreads.find(
        (thread) => thread.id === state.activeThreadId
      )!;
      const dateString = new Date().toISOString();
      const newMessage = {
        text: action.payload.text,
        id: MD5.hex(dateString + state.activeThreadId),
        last_updated: dateString,
      };

      thread.messages = [...thread.messages, newMessage];
      thread.last_updated = new Date().toISOString();
      state.chatThreads = state.chatThreads.sort(sortByRecent);
    },

    editMessage: (state, action: PayloadAction<{ text: string }>) => {
      const thread = state.chatThreads.find(
        (thread) => thread.id === state.activeThreadId
      )!;
      const message = thread!.messages.find(
        (message) => message.id === state.activeMessageId
      )!;
      const newMessage = {
        id: message.id,
        text: action.payload.text,
        last_updated: new Date().toISOString(),
      };
      const filteredMessages = thread.messages.filter(
        (message) => message.id !== state.activeMessageId
      );

      thread.messages = [...filteredMessages, newMessage];
      state.activeMessageId = null;
      thread.last_updated = new Date().toISOString();
      state.chatThreads = state.chatThreads.sort(sortByRecent);
    },
  },
});

export const selectActiveThreadId = (state: RootState) =>
  state.chats.activeThreadId;

export const selectChatThreads = (state: RootState) => state.chats.chatThreads;

export const selectActiveThreadMessages = (state: RootState) =>
  state.chats.chatThreads.find(
    (thread) => thread.id === state.chats.activeThreadId
  )!.messages;

export const selectIsEditMode = (state: RootState) =>
  state.chats.activeMessageId !== null;

export const selectInputInitialValue = (state: RootState) => {
  if (state.chats.activeMessageId === null) {
    return "";
  }

  const thread = state.chats.chatThreads.find(
    (thread) => thread.id === state.chats.activeThreadId
  );
  const message = thread!.messages.find(
    (message) => message.id === state.chats.activeMessageId
  );

  return message!.text;
};

export const {
  updateActiveThreadId,
  updateActiveMessageId,
  createNewMessage,
  editMessage,
} = chatsSlice.actions;

export default chatsSlice.reducer;
