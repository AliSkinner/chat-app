import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  updateActiveThreadId,
  selectChatThreads,
  selectActiveThreadId,
} from "../chatsSlice";
import classnames from "classnames";
import style from "./ChatThreads.module.css";

export function ChatThreads() {
  const threads = useAppSelector(selectChatThreads);
  const activeThreadId = useAppSelector(selectActiveThreadId);
  const dispatch = useAppDispatch();
  const composeClickHandler = (id: string) => () =>
    dispatch(updateActiveThreadId({ id }));

  return (
    <ul className={style.threads}>
      {threads.map(({ name, id }) => (
        <li
          key={id}
          onClick={composeClickHandler(id)}
          className={classnames(
            style.thread,
            id === activeThreadId ? style.active : ""
          )}
        >
          {name}
        </li>
      ))}
    </ul>
  );
}
