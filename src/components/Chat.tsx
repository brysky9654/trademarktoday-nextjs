import io, { Socket } from "socket.io-client";
import { useState, useEffect, KeyboardEvent, useRef } from "react";
import { Message } from "@/types/interface";
import Image from "next/image";
export const admin_name = 'Steven Hocking';
let socket: Socket;
export default function Chat({ username }: { username: string }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([{ author: 'Chatbot', message: 'Joining to agent...', channel: 'admin' }]);
  const chatWindow = useRef<HTMLDivElement>(null);
  const [minimized, setMinimized] = useState(true);
  const channel = username.replace(' ', '-'); //! change channel.
  useEffect(() => {
    
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch(`/api/chatsocket`); // Pass the channel as a query parameter

    socket = io();//io({ query: { channel: JSON.stringify(channels) } }); // Pass the channel as a query parameter when initializing the socket connection
    socket.emit('joinChannel', { channel, username });

    socket.on("newIncomingMessage", (msg: Message) => {
      setMessages((currentMsg) => [
        ...currentMsg,
        { author: msg.author, message: msg.message, channel },
      ]);
    });
    socket.on('disconnected', (msg: Message) => {
      console.log('disconnected');
      alert('disconnected');
    });

  };

  useEffect(() => {
    if (chatWindow.current) {
      chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
    }
  }, [messages])
  const sendMessage = async () => {
    if (message.trim() === '') return;
    socket.emit("createdMessage", { channel: channel, author: username, message });
    setMessages((currentMsg) => [
      ...currentMsg,
      { author: username, message, channel },
    ]);
    setMessage("");
  };

  const handleKeypress = (e: KeyboardEvent<HTMLInputElement>) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      if (message) {
        sendMessage();
      }
    }
  };

  const handleChat = () => {
    if (!socket) {
      socketInitializer();
    }
    setMinimized(false)
  }
  return (
    <>
      <button onClick={handleChat} className="flex justify-center items-center rounded-full w-12 h-12 overflow-hidden cursor-pointer bg-white absolute right-3 bottom-3 shadow-[0_0_2px_2px_#888] hover:w-16 hover:h-16 transition-all ease-in-out duration-500 ">
        <Image src="/message.gif" loading='lazy' alt="Logo" width={40} height={40} />
      </button>

      <main className={`max-w-sm p-3 transition-all ease-in-out duration-700 ${minimized ? 'h-0 opacity-0' : 'h-[500px] opacity-100'} absolute right-0 bottom-0`}>
        <div className="flex flex-col overflow-hidden justify-end bg-white h-full min-w-[33%] max-w-[100%] rounded-md shadow-[0_0_2px_2px_#999]">
          <div onClick={() => setMinimized(true)} className="flex justify-between cursor-pointer bg-[#373f86]">
            <div className="flex items-center gap-4 px-2 h-12 ">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <h6 className="text-white text-sm">Trademarktoday Agent</h6>
            </div>
            <h6 className="flex items-center p-2 text-xl text-white hover:bg-blue-600 transition-all ease-in-out"> &times; </h6>
        </div>
        <div ref={chatWindow} className="h-full last:border-b-0 overflow-y-auto overflow-x-clip aside-scrollbars-gray scroll-smooth">
          <style jsx>{`
                    .aside-scrollbars-gray::-webkit-scrollbar {
                        width: 8px;
                        height: 8px;
                    }
                    .aside-scrollbars-gray::-webkit-scrollbar-thumb {
                      border-radius: 0.25rem;
                      background-color: #8d8d8d;
                    }
                    .aside-scrollbars-gray::-webkit-scrollbar-track {
                      background-color: #e2e2e2;
                    }
                `}</style>
          {messages.map((msg, i) => {
            return (
              <div key={i}>
                {(msg.author !== username) ?
                  <>
                    <h6 className="w-full text-left px-4 text-[12px]">From:{msg.author}</h6>
                    <div className="flex justify-start border-b border-gray-200 pb-2">
                      <div className="relative w-fit max-w-[90%]">
                        <div className="chat-content break-words break-all w-fit py-1 px-2 bg-yellow-700 text-white rounded-md mx-4 overflow-visible" >
                          {msg.message}
                        </div>
                        <div className="absolute bottom-[0px] left-[9px] w-3 h-3 bg-yellow-700" />
                        <div className="absolute bottom-[0px] -left-[4px] w-5 h-5 bg-white rounded-full" />
                      </div>
                    </div>
                  </> :
                  <>
                    <h6 className="w-full text-right px-4 text-[12px]">Me</h6>
                    <div className="flex justify-end border-b border-gray-200 pb-2">
                      <div className="relative w-fit max-w-[90%]">
                        <div className="chat-content break-words break-all w-fit py-1 px-2 bg-blue-500 text-white rounded-md mx-4 overflow-visible" >
                          {msg.message}
                        </div>
                        <div className="absolute bottom-[0px] right-[9px] w-3 h-3 bg-blue-500" />
                        <div className="absolute bottom-[0px] -right-[4px] w-5 h-5 bg-white rounded-full" />
                      </div>
                    </div>
                  </>
                }
              </div>
            );
          })}
        </div>
        <div className="border-t border-gray-300 w-full flex rounded-bl-md">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            className="outline-none py-2 px-2 rounded-bl-md flex-1"
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={handleKeypress}
          />
          <div className="border-l border-gray-300 flex justify-center items-center  rounded-br-md group hover:bg-purple-500 transition-all">
            <button
              className="group-hover:text-white px-3 h-full"
              onClick={() => {
                sendMessage();
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </main >
    </>
  );
}
