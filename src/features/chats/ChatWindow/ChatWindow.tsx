import { useAppSelector } from "../../../app/hooks";

import { selectActiveThreadMessages } from "../chatsSlice";

export function ChatWindow() {
  const messages = useAppSelector(selectActiveThreadMessages);
  return (
    <ul>
      {messages.map((message) => {
        return (
          <li key={message.id}>
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
