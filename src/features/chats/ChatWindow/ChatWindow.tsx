import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  selectActiveThreadMessages,
  updateActiveMessageId,
} from "../chatsSlice";

export function ChatWindow() {
  const messages = useAppSelector(selectActiveThreadMessages);
  const dispatch = useAppDispatch();
  const composeClickHandler = (id: string) => () =>
    dispatch(updateActiveMessageId({ id }));

  return (
    <ul>
      {messages.map((message) => {
        return (
          <li key={message.id} onClick={composeClickHandler(message.id)}>
            <div>
              <p>{message.last_updated}</p>
              <p>{message.text}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
