import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {updateActiveThreadId, selectChatThreads, selectActiveThreadId} from '../chatsSlice';
import style from './ChatThreads.module.css'

export function ChatThreads() {
  const chatLog = useAppSelector(selectChatThreads);
  const activeThreadId = useAppSelector(selectActiveThreadId);
  const dispatch = useAppDispatch();
  const composeClickHandler = (id: string) => () => dispatch(updateActiveThreadId({id}));


  return (
    <ul>
      {chatLog.map(({ name, id }) => (
        <li key={id} onClick={composeClickHandler(id)} className={id === activeThreadId ? style.active : ''}>
          {name}
        </li>
      ))}
    </ul>
  );
}
