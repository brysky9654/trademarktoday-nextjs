import TMCheckLayout from '../layout/TMCheckLayout';
import { Alert3 } from '@/components/AlertContainers';
import { Context, User } from '@/types/interface';
import ServerSidePropsAuthorized from '@/layout/ServerSidePropsAuthorized';
import Link from 'next/link';
import Image from 'next/image';
import PortalClass from '@/components/PortalClass';
import Chat from '@/components/Chat';
import ChatAdmin from '@/components/ChatAdmin';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const AdminChat = ({ user }: { user: User }) => {

  const router = useRouter();
  useEffect(() => {
    if (!(user.email === 'milkyway464203@gmail.com' || user.email === 'syedmosawi@gmail.com')) {
      router.push('/auth');
    }
  }, [])
  return (
    <>
      <ChatAdmin />
    </>
  )
}
AdminChat.getLayout = TMCheckLayout;
export const getServerSideProps = ServerSidePropsAuthorized;
export default AdminChat;