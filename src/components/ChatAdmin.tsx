import io, { Socket } from "socket.io-client";
import { useState, useEffect, KeyboardEvent, useRef } from "react";
import { Message } from "@/types/interface";
import Image from "next/image";
let socket: Socket;
export default function ChatAdmin() {
    const [message, setMessage] = useState("");
    const [curChannel, setCurChannel] = useState('');
    const [messages, setMessages] = useState<{ [key: string]: Array<Message> }>({});//[{ author: 'Chatbot', message: 'Start chat here.' }]
    const chatWindow = useRef<HTMLDivElement>(null);

    const [channels, setChannels] = useState<{ name: string, unreadCount: number }[]>([]);

    useEffect(() => {
        socketInitializer();
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);
    const handleNewIncomingMessage = (msg: Message) => {
        if (curChannel !== msg.channel) {
            setChannels(prev => {
                prev = prev.map(chn => (chn.name !== msg.channel ? chn : ({ name: chn.name, unreadCount: chn.unreadCount + 1 })));
                prev.sort((a, b) => b.unreadCount - a.unreadCount);
                return prev;
            })
        }
        setMessages((currentMsg) => {
            const prev_msg = (currentMsg && currentMsg[msg.channel]) ? currentMsg[msg.channel] : []
            return {
                ...currentMsg,
                [msg.channel]: [...prev_msg, { author: msg.author, message: msg.message, channel: msg.channel }]
            }
        });
    }
    const handleChannelCreated = ({ channel: chn, username }: { channel: string, username: string }) => {
        socket.emit('joinChannel', { channel: chn, username: 'admin' });
        if (channels.every(item => item.name !== chn)) {
            setChannels(prev => ([...prev, { name: chn, unreadCount: 0 }]))
        }
    }
    useEffect(() => {
        if (socket) {
            socket.on("channelCreated", handleChannelCreated);
            socket.on("newIncomingMessage", handleNewIncomingMessage);
        }
        // Clean up the event listener when curChannel changes or component unmounts
        return () => {
            socket.off("channelCreated", handleChannelCreated);
            socket.off("newIncomingMessage", handleNewIncomingMessage);
        };
    }, [curChannel])
    const socketInitializer = async () => {
        // We just call it because we don't need anything else out of it
        await fetch(`/api/chatsocket`); // Pass the channel as a query parameter

        socket = io();//io({ query: { channel: JSON.stringify(channels) } }); // Pass the channel as a query parameter when initializing the socket connection
        socket.emit('joinChannel', { channel: 'admin', username: 'admin_initial' });

        socket.on("channelCreated", handleChannelCreated);
        socket.on("newIncomingMessage", handleNewIncomingMessage);
        socket.on('updateChannels', (updatedChannels: string[]) => {
            // setChannels(updatedChannels.map(chn => ({ name: chn, unreadCount: 0 })));
        });
        socket.on('disconnected', (msg: Message) => {
            console.log('disconnected');
            alert('disconnected');
        });

    };
    useEffect(() => {
        setChannels(prev => prev.map(chn => (chn.name !== curChannel ? chn : ({ name: chn.name, unreadCount: 0 }))))
    }, [curChannel])
    useEffect(() => {
        if (chatWindow.current) {
            chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
        }
    }, [messages])
    const sendMessage = async () => {
        if (message.trim() === '') return;
        // channels.filter(chn => chn !== 'admin').forEach(chn => socket.emit("createdMessage", { channel: chn, author: 'Trademarktoday agent', message }))
        socket.emit("createdMessage", { channel: curChannel, author: 'Trademarktoday agent', message })
        setMessages((currentMsg) => {
            const prev_msg = (currentMsg && currentMsg[curChannel]) ? currentMsg[curChannel] : []
            return {
                ...currentMsg,
                [curChannel]: [...prev_msg, { author: 'admin', message: message, channel: 'admin' }]
            }
        });
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

    return (
        <>
            <div className="w-full h-full flex gap-4">
                <div className="flex flex-col gap-1 justify-start px-4 w-1/5 h-full pt-4">
                    {channels.filter(chn => chn.name !== 'admin').map((chn, i) =>
                        <div key={i} onClick={() => setCurChannel(chn.name)} className={`border border-[#ddd] p-3 rounded-md cursor-pointer relative ${curChannel === chn.name ? 'bg-[#373f86] text-white' : ''} hover:bg-[#ddd] transition-all ease-in-out duration-700`}>
                            {chn.name}
                            {chn.unreadCount > 0 &&
                                <div className="w-5 h-5 flex justify-center items-center rounded-full bg-pink-600 absolute right-0 top-0 text-white p-1 text-xs">{chn.unreadCount}</div>
                            }
                        </div>
                    )}
                </div>
                <div className="w-full">
                    <main className={`p-3 transition-all ease-in-out duration-700 h-[500px] opacity-100 `}>
                        <div className="flex flex-col overflow-hidden justify-end bg-white h-full w-full rounded-md shadow-[0_0_2px_2px_#999]">
                            <div className="flex justify-between cursor-pointer bg-[#373f86]">
                                <div className="flex items-center gap-4 px-2 h-12 ">
                                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                                    <h6 className="text-white text-sm">Chat with {curChannel}</h6>
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
                                {messages[curChannel]?.map((msg, i) => {
                                    return (
                                        <div key={i}>
                                            {(msg.author !== 'admin') ?
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
                    </main>
                </div>
            </div>
        </>
    );
}
