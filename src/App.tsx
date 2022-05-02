import React from 'react';
import { ChatApp } from './features/chats/ChatApp';
import style from './App.module.css'

function App() {
  return (
    <div className={style.appWrapper}>
      <ChatApp />
    </div>
  );
}

export default App;
