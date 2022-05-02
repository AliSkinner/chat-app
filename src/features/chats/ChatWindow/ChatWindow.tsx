import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  selectActiveThreadMessages,
  updateActiveMessageId,
} from "../chatsSlice";
import style from './ChatWindow.module.css'

export function ChatWindow() {
  const messages = useAppSelector(selectActiveThreadMessages);
  const dispatch = useAppDispatch();
  const composeClickHandler = (id: string) => () =>
    dispatch(updateActiveMessageId({ id }));

  return (
    <ul className={style.messages}>
      {messages.map((message) => {
        return (
          <li key={message.id} onClick={composeClickHandler(message.id)} className={style.message}>
            <article>
              <p className={style.updated}>{message.last_updated}</p>
              <p className={style.text}>{message.text}</p>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
