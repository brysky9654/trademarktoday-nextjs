import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import TMCheckLayout from "../layout/TMCheckLayout";

const Start = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/consider');
  }
  return (
    <main className='max-w-7xl mx-auto px-6 py-4'>      
      <section className='grid gap-6'>
          <div className='pt-8 flex gap-4'>
            <h1 className='font-mont leading-[40px] text-[40px]'>TM Checker</h1>
            <div className='flex justify-center items-center bg-[#E0F3F4] px-4 py-2 rounded-sm font-bold'><span>PILOT</span></div>
          </div>
          <div className='flex gap-4 items-center'>
            <div className='flex flex-col md:flex-row gap-1 text-sm items-center'>
              <div className='w-11 h-11 py-1 flex items-center text-center'><svg className='w-[33px] h-[33px] mx-auto stroke-black fill-none'><use href="#timer"></use></svg></div>
            </div>
            <p className='text-[22px] bg-white rounded-full shadow-[0_0_8px_8px_#fff]'>An initial check only takes a few minutes and is <strong>free</strong>.</p>
          </div>
          <div className='flex gap-4 items-center'>
            <div className='flex flex-col md:flex-row gap-1 text-sm items-center'>
              <div className='w-11 h-11 py-1 flex items-center text-center'><svg className='w-[33px] h-[33px] mx-auto stroke-black fill-none'><use href="#money"></use></svg></div>
            </div>
            <p className='text-[22px] bg-white rounded-full shadow-[0_0_8px_8px_#fff]'>If you decide to apply, it can cost as little as $330.</p>
          </div>
          <div className='p-2'>
            <Link className='text-[22px] underline hover:no-underline hover:bg-[#E0F3F4] font-bold' href="#"> More about trade marks. </Link>
          </div>
          <div>
            <button onClick={handleClick} className='rounded-md font-semibold hover:bg-[#72757E] transition-all ease-in-out bg-[#1D252C] w-72 h-12 text-white'>Start</button>
          </div>
        </section>
      <div id="start-back-image" className='flex fixed right-0 bottom-0 items-end justify-end -z-10'>
        <Image className='max-h-screen' alt="image" loading='lazy' layout='responsive' src="/back-start-2.jpg" width={1250} height={10} />
      </div>
    </main>
  )
}

Start.getLayout = TMCheckLayout;
export default Start;