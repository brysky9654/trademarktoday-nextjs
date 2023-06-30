import Image from "next/image"

const Header = () => {
    return (
        <>
            <header className='bg-[#373f46] text-white border-b-[5px] border-[#DE4326] '>
                <div className='max-w-7xl px-6 flex mx-auto items-center justify-between'>
                    <div className='py-[10px] gap-4 flex-row flex'>
                        <button><Image src="/ipaustralia.svg" loading='lazy' alt="Logo" width={197} height={48} /></button>
                        <div className='w-0 border-r hidden md:block border-white'></div>
                        <button className=' hidden md:block'><Image src="/tmchecker.svg" loading='lazy' alt="Logo" width={150.5} height={48} /></button>
                    </div>
                    <nav className="mr-36 2xl:mr-0">
                        <button className='px-3 py-2'>
                            <div className='flex flex-col md:flex-row gap-1 text-sm items-center'>
                                <div className='w-8 h-8 py-1 flex items-center text-center'><svg className='w-6 h-6 mx-auto stroke-white fill-none'><use href="#faq"></use></svg></div> Help
                            </div>
                        </button>
                        <button className='px-3 py-2'>
                            <div className='flex flex-col md:flex-row gap-1 text-sm items-center'>
                                <div className='w-8 h-8 py-1 flex items-center text-center'><svg className='w-6 h-6 mx-auto stroke-white fill-none'><use href="#feedback"></use></svg></div> Feedback
                            </div>
                        </button>
                    </nav>
                </div>
            </header>
        </>
    )
}
export default Header;