import { ChatThreads } from "./ChatThreads";
import { ChatWindow } from "./ChatWindow";
import { MessageForm } from "./MessageForm";
import style from "./ChatApp.module.css";

export function ChatApp() {
  return (
    <div className={style.chatApp}>
      <aside className={style.threads}>
        <ChatThreads />
      </aside>
      <div className={style.activeThread}>
        <section className={style.chatWindow}>
          <ChatWindow />
        </section>
        <section className={style.messageForm}>
          <MessageForm />
        </section>
      </div>
    </div>
  );
}
