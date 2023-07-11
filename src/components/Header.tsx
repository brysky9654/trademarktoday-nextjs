import Image from "next/image"
import Link from "next/link";
import UserInfoAvatar from "./UserInfoAvatar";
import { useRouter } from "next/router";

const Header = () => {
    const router = useRouter();
    return (
        <>
            <UserInfoAvatar />
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