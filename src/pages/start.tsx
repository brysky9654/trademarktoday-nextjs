import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import TMCheckLayout from "../layout/TMCheckLayout";
import Chat from "@/components/Chat";

const Start = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/consider');
  }
  return (
    <main className='max-w-7xl mx-auto px-6 py-4'>
      <section className='grid gap-6'>
        <div className='pt-8 flex gap-4'>
          <h1 className='font-mont leading-[40px] text-[40px]'>Don&apos;t let copycats hijack your brand&apos;s identity</h1>
          <div className='flex justify-center items-center bg-[#E0F3F4] px-4 py-2 rounded-sm font-bold'><span>TM</span></div>
        </div>
        <div className="p-2 font-mont text-[20px] flex items-center bg-white rounded-full w-fit shadow-[0_0_8px_8px_#fff]">
          Let&apos;s kick off the process of
          <div className="badge-container inline-block overflow-y-clip w-[150px] px-3 py-6 h-[32px] mx-2 bg-blue-500 text-white rounded-md relative shadow-[0_0_8px_8px_#ccc]">
            <style jsx>{`
                  div.badge-content {
                    animation-name: badgeflowing;
                    animation-duration: 10s;
                    animation-iteration-count: infinite;
                  }
            `}</style>
            <div className="badge-content flex flex-col text-center absolute -top-[0px] gap-3 py-2">
              <h2>Protecting</h2>
              <h2>Registering</h2>
              <h2>Creating</h2>
              <h2>Protecting</h2>
            </div>
          </div>
          your brand and have some fun while doing it!
        </div>
        <div className='flex gap-4 items-center'>
          <div className='flex flex-col md:flex-row gap-1 text-sm items-center'>
            <div className='w-11 h-11 py-1 flex items-center text-center'>
              <Image className='max-h-screen' alt="image" loading='lazy' src="/clock.png" width={50} height={50} />
            </div>
          </div>
          <p className='text-[22px] bg-white rounded-full shadow-[0_0_8px_8px_#fff]'>Minutes matter! Get free initial trade mark check done <strong>in minutes</strong>!</p>
        </div>
        <div className='flex gap-4 items-center'>
          <div className='flex flex-col md:flex-row gap-1 text-sm items-center'>
            <div className='w-11 h-11 py-1 flex items-center text-center'>
              <Image className='max-h-screen' alt="image" loading='lazy' src="/dollar.png" width={50} height={50} />
            </div>
          </div>
          <p className='text-[22px] bg-white rounded-full shadow-[0_0_8px_8px_#fff]'>Register your trade mark in <strong>Australia</strong> for as little as $590.</p>
        </div>
        <div className='p-2'>
          <Link className='text-[22px] underline hover:no-underline hover:bg-[#E0F3F4] font-bold' href="#"> More about trade marks.</Link>
        </div>
        <div>
          <button onClick={handleClick} className='rounded-md font-semibold hover:bg-[#72757E] transition-all ease-in-out bg-[#373f86] w-72 h-12 text-white'>Start</button>
        </div>
      </section>
      <Chat />
      <div id="start-back-image" className='flex fixed right-0 bottom-0 items-end justify-end -z-10'>
        <Image className='max-h-screen' alt="image" loading='lazy' layout='responsive' src="/back-start-2.jpg" width={1250} height={10} />
      </div>
    </main>
  )
}

Start.getLayout = TMCheckLayout;
export default Start;