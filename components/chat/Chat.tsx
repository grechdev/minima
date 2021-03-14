import { FC } from 'react';

import Dialog from 'components/chat/Dialog';
import ChatForm from 'components/chat/ChatForm';

const Chat: FC = () => (
  <div className="flex flex-1 flex-col bg-white p-4 rounded-md h-full overflow-hidden">
    <Dialog />
    <ChatForm />
  </div>
);

export default Chat;
