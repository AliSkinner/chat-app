import { ChatThreads } from "./ChatThreads";
import { ChatWindow } from "./ChatWindow";

export function ChatApp() {
  return (
    <div>
      <div>
        <ChatThreads />
      </div>
      <div>
        <ChatWindow />
      </div>
    </div>
  );
}
