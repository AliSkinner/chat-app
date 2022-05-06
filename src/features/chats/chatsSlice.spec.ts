import chatsReducer, {
  ChatsState,
  updateActiveThreadId,
  updateActiveMessageId,
} from "./chatsSlice";
import chatThreads from "./chatData.json";

describe("chats reducer", () => {
  const initialState: ChatsState = {
    chatThreads,
    activeThreadId: chatThreads[0].id,
    activeMessageId: null,
  };

  it("should handle initial state", () => {
    expect(chatsReducer(undefined, { type: "unknown" })).toEqual({
      ...initialState,
    });
  });

  it("should handle update active thread id", () => {
    const newId = chatThreads[1].id;
    const actual = chatsReducer(
      initialState,
      updateActiveThreadId({ id: newId })
    );
    expect(actual.activeThreadId).toEqual(newId);
  });

  it("should handle update active message id", () => {
    const newId = chatThreads[0].messages[0].id;
    const actual = chatsReducer(
      initialState,
      updateActiveMessageId({ id: newId })
    );
    expect(actual.activeMessageId).toEqual(newId);
  });

  it.skip("should handle create new message", () => {});

  it.skip("should handle edit message", () => {});
});

describe("chatsSlice selectors", () => {
  it.skip("selects active thread id", () => {});

  it.skip("selects chat threads", () => {});

  it.skip("selects active thread messages", () => {});

  it.skip("selects is edit mode", () => {});

  it.skip("selects input initial value", () => {});
});
