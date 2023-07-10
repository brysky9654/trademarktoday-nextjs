import { User } from "@/types/interface"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/router"
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken'
import { JWT_SIGN_KEY } from "@/types/utils";
import { useEffect, useState } from "react";

const UserInfoAvatar = () => {//{ user }: { user: User }
    const [user, setUser] = useState<User | undefined>(undefined)
    const verifyToken = () => {
        const cookies = parseCookies();
        const token = cookies.token;
        try {
            setUser(jwt.verify(token, JWT_SIGN_KEY) as User)
        } catch (error) {
            setUser(undefined)
        }
    }
    useEffect(() => verifyToken(), [])
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            setTimeout(() => { verifyToken() }, 1000);
        };

        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, []);
    const router = useRouter();
    const handleLogout = () => {
        axios.get('/api/logout');
        router.push('/')
    }
    return (
        <div className="">
            {
                user ?
                    <div className='user-info-wrap flex flex-col gap-2 justify-center items-center fixed cursor-pointer text-black top-4 right-2 z-[51]'>
                        <style jsx>{`div.user-info-wrap:hover div.user-info { opacity:1; height:160px; }`}</style>
                        <div className="flex gap-2 w-full justify-end items-center">
                            <h2>{user.name} {
                                // JSON.stringify(user)
                            } </h2>
                            <Image className='rounded-full mr-2' src={user.picture} alt="logo" loading='lazy' onError={(e) => e.currentTarget.src = "/no-avatar.png"} width={40} height={40} />

                        </div>
                        <div className="user-info opacity-0  h-0 w-52  shadow-[1px_1px_4px_#00000040] transition-all duration-700 ease-in-out overflow-hidden bg-[#fefefe] rounded-lg">
                            <div className="w-full h-full p-2 flex flex-col">
                                <p onClick={() => router.push('/profile')} className="hover:bg-[#efefef] p-2 rounded-md flex items-center gap-3 transition-all duration-1000 hover:text-[18px] h-44 ease-in-out active:bg-red-700">
                                    <svg className='self-center w-[24px] h-[24px] align-baseline inline-block stroke-black'><use href="#profile"></use></svg>
                                    <a className=" leading-7 h-8">Profile</a>
                                </p>
                                <p className="hover:bg-[#efefef] p-2 rounded-md flex items-center gap-3 transition-all duration-1000 hover:text-[18px] h-44 ease-in-out active:bg-red-700">
                                    <svg className='self-center w-[24px] h-[24px] align-baseline inline-block stroke-black'><use href="#cog"></use></svg>
                                    <a className=" leading-7 h-8">Setting</a>
                                </p>
                                <hr />
                                <p onClick={handleLogout} className="hover:bg-[#efefef] p-2 rounded-md flex items-center gap-3 transition-all duration-1000 hover:text-[18px] h-44 ease-in-out active:bg-red-700">
                                    <svg className='self-center w-[24px] h-[24px] align-baseline inline-block stroke-black'><use href="#logout2"></use></svg>
                                    <a className=" leading-7 h-8">Log out</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    :
                    <button onClick={() => router.push('/auth')} className='user-info-wrap flex flex-col gap-2 justify-center items-center fixed cursor-pointer text-black z-[51] top-6 right-4  font-mont'>
                        Log in | Sign up
                    </button>
            }
        </div>
    )
}
export default UserInfoAvatar;