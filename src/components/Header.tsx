import Image from "next/image"
import Link from "next/link";
import UserInfoAvatar from "./UserInfoAvatar";
import { useRouter } from "next/router";
import jwt from 'jsonwebtoken'
import { useEffect, useState } from "react";
import { User } from "@/types/interface";
import { parseCookies } from "nookies";
import { JWT_SIGN_KEY } from "@/types/utils";
export const verifyToken = () => {
    let user: User | undefined;
    const cookies = parseCookies();
    const token = cookies.token;
    try {
        user = jwt.verify(token, JWT_SIGN_KEY) as User
    } catch (error) {
        user = undefined;
    }
    return user;
}
const Header = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | undefined>(undefined)
    const setUserFromToken = () => {
        setUser(verifyToken())
    }
    useEffect(() => setUserFromToken(), [])
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            setTimeout(() => { setUserFromToken() }, 1000);
        };

        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, []);

    return (
        <>
            <UserInfoAvatar user={user as User} />
            <header className='bg-white/90 text-black shadow-[0_0_1px_1px_#ccc] fixed top-0 w-full z-50'>
                {/* 373f86  border-b-[5px] border-[#DE4326] */}
                <div className='max-w-7xl px-6 flex mx-auto items-center justify-between'>
                    <div className="flex items-center gap-2">

                        <Link href='/' className='py-[10px] gap-4 flex-row flex'>
                            <button>
                                <div className="h-14 relative hover:scale-125 transition-all ease-in-out duration-1000 ">
                                    <Image className=" relative -top-12" src="/trademarktoday.svg" alt="Logo" width={150} height={48} priority style={{ visibility: 'hidden' }} />
                                </div>
                            </button>
                            <div className='w-0 border-r hidden md:block border-black'></div>
                            {/* <button className=' hidden md:block font-mont text-2xl italic text-red-500'>Trade Mark Today</button> */}
                        </Link>

                        <ul className="flex gap-4 pl-4 cursor-pointer flex-wrap">
                            <li>About Us</li>
                            <li>Services</li>
                            <li>Pricing</li>
                            <li>Resources</li>
                            <li onClick={() => router.push('/checkout')} className="hover:border-b border-black">Apply Filing</li>
                            {['milkyway464203@gmail.com', 'syedmosawi@gmail.com'].some(em => em === user?.email) &&
                                <li onClick={() => router.push('/adminchat')} className="hover:border-b border-black text-red-600 font-mont">Chat with users</li>}
                        </ul>
                    </div>
                    <nav className="mr-36 2xl:mr-0">
                        <button className='px-3 py-2'>
                            <div className='flex flex-row gap-1 text-sm items-center'>
                                <div className='w-8 h-8 py-1 flex items-center text-center'><Image width={36} height={36} src='/icons8-help-94.png' alt="help" loading="lazy" /></div> Help
                            </div>
                        </button>
                        <button className='px-3 py-2'>
                            <div className='flex flex-row gap-1 text-sm items-center'>
                                <div className='w-8 h-8 py-1 flex items-center text-center'><Image width={36} height={36} src='/icons8-popular-94.png' alt="help" loading="lazy" /></div> Feedback
                            </div>
                        </button>
                    </nav>
                </div>
            </header>
        </>
    )
}
export default Header;