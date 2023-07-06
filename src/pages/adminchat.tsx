import TMCheckLayout from '../layout/TMCheckLayout';
import { Alert3 } from '@/components/AlertContainers';
import { Context, User } from '@/types/interface';
import ServerSideProps from '@/layout/ServerSideProps';
import Link from 'next/link';
import Image from 'next/image';
import PortalClass from '@/components/PortalClass';
import UserInfoAvatar from '@/components/UserInfoAvatar';
import Chat from '@/components/Chat';
import ChatAdmin from '@/components/ChatAdmin';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const AdminChat = ({ user }: { user: User }) => {

  const router = useRouter();
  useEffect(() => {
    if (user.email !== 'milkyway464203@gmail.com') {
      router.push('/auth');
    }
  }, [])
  return (
    <>
      {user && <UserInfoAvatar user={user} />}

      <ChatAdmin />
    </>
  )
}
AdminChat.getLayout = TMCheckLayout;
export const getServerSideProps = ServerSideProps;
export default AdminChat;