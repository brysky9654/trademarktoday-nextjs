import { Server, Socket } from "socket.io";
import { Request, Response } from "express";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { admin_name } from "@/components/Chat";

let channels: string[] = [];
export default function SocketHandler(req: any, res: any) {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  const onConnection = async (socket: Socket) => {
    // const { channel: _chanelArr } = socket.handshake.query; // Extract the channel from the handshake query
    // const channels: string[] = JSON.parse(_chanelArr as string);

    //! here to handle START
    const createdMessage = ({ channel, author, message }: { channel: string, author: string, message: string }) => {
      socket.to(channel).emit(`newIncomingMessage`, { channel, author, message });
    };

    socket.on("createdMessage", createdMessage);
    socket.on('joinChannel', ({ channel, username }) => {
      socket.join(channel);
      channels = Array.from(new Set([...channels, channel])); // Add channel to the list only if it's not already present
      if (username !== 'admin') {
        socket.to('admin').emit(`channelCreated`, { channel, username })
      }
      // io.emit('updateChannels', channels); // Notify all clients about the updated channel list
      if(username === 'admin_initial') {
        // socket.to('admin').emit(`updateChannels`, channels)
        console.log(channels);
        channels.filter(chn => chn !== 'admin').forEach(chn => io.emit(`channelCreated`, { channel: chn, username: chn }))
      }
      console.log('rooms', socket.rooms);
    });
    socket.on('disconnect', () => {
      console.log(`User disconnected: socket's Id = ${socket.id}`);
    });
    socket.emit('updateChannels', channels);
    //! here to handle END
  };

  // Define actions inside
  io.on("connection", onConnection);

  console.log("Setting up socket");
  res.end();
}