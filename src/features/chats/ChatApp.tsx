import { ChatThreads } from "./ChatThreads";
import { ChatWindow } from "./ChatWindow";
import { MessageForm } from "./MessageForm";

export function ChatApp() {
  return (
    <div>
      <div>
        <ChatThreads />
      </div>
      <div>
        <ChatWindow />
      </div>
      <div>
        <MessageForm />
      </div>
    </div>
  );
}
