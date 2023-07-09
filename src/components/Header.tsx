import Image from "next/image"
import Link from "next/link";

const Header = () => {
    return (
        <>
            <header className='bg-[#373f86] text-white border-b-[5px] border-[#DE4326] '>
                {/* 373f46 */}
                <div className='max-w-7xl px-6 flex mx-auto items-center justify-between'>
                    <Link href='/' className='py-[10px] gap-4 flex-row flex'>
                        <button>
                            <div className="h-14 relative ">
                                <Image className=" relative -top-12" src="/trademarktoday.svg" loading='lazy' alt="Logo" width={150} height={48} />
                            </div>
                        </button>
                        <div className='w-0 border-r hidden md:block border-white'></div>
                        <button className=' hidden md:block font-mont text-2xl italic'>Trade Mark Today</button>
                    </Link>
                    <nav className="mr-36 2xl:mr-0">
                        <button className='px-3 py-2'>
                            <div className='flex flex-col md:flex-row gap-1 text-sm items-center'>
                                <div className='w-8 h-8 py-1 flex items-center text-center'><Image width={36} height={36} src='/icons8-help-94.png' alt="help" loading="lazy" /></div> Help
                            </div>
                        </button>
                        <button className='px-3 py-2'>
                            <div className='flex flex-col md:flex-row gap-1 text-sm items-center'>
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