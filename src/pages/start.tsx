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
    <main className='max-w-7xl mx-auto px-6 py-4 h-[900px]'>
      <section className='grid gap-12 justify-end'>
        <div className='pt-8 flex gap-4'>
          <h1 className='font-mont leading-[80px] text-[60px] text-white [text-shadow:_1px_3px_5px_rgb(0_0_0_/_100%)] pt-20 text-right w-full'>Don&apos;t let copycats hijack <br /> your brand&apos;s identity</h1>
          {/* <div className='flex justify-center items-center bg-[#E0F3F4] px-4 py-2 rounded-sm font-bold'><span>TM</span></div> */}
        </div>
        <div className="flex flex-col items-end text-white [text-shadow:_1px_3px_5px_rgb(0_0_0_/_100%)]">
          <div className="p-2 font-mont text-[20px] flex items-center rounded-full w-fit ">{/*  bg-white/60 shadow-[0_0_8px_8px_rgba(255,255,255,0.6)] */}
            Let&apos;s kick off the process of
            <div className="badge-container text-[30px] inline-block overflow-y-clip w-[250px] px-3 py-6 h-[32px] mx-2 bg-red-500/90 text-blue-100 rounded-xl relative">{/*  shadow-[0_0_8px_8px_#ccc] */}
              <style jsx>{`
                  div.badge-content {
                    animation-name: badgeflowing;
                    animation-duration: 10s;
                    animation-iteration-count: infinite;
                  }
            `}</style>
              <div className="badge-content flex flex-col text-center absolute w-full -left-[2px] -top-[8px] gap-3 py-2 cursor-pointer">
                <h2>Protecting</h2>
                <h2>Registering</h2>
                <h2>Creating</h2>
                <h2>Protecting</h2>
              </div>
            </div>
            your brand
          </div>
          <div className="p-2 font-mont text-[20px] flex items-center rounded-full w-fit">{/*  bg-white/60 shadow-[0_0_8px_8px_rgba(255,255,255,0.6)] */}
            and have some fun while doing it!
          </div>
        </div>
        <div className="flex w-full justify-end">
          <div className="max-w-xl flex flex-col gap-10 text-right text-white [text-shadow:_1px_3px_5px_rgb(0_0_0_/_100%)]">
            <div className='flex gap-4 items-center'>{/*  bg-white/60 shadow-[0_0_8px_8px_rgba(255,255,255,0.6)] rounded-full */}
              <div className='flex flex-col md:flex-row gap-1 text-sm items-center'>
                <div className='w-11 h-11 py-1 flex items-center text-center'>
                  <Image className='max-h-screen' alt="image" loading='lazy' src="/clock.png" width={50} height={50} />
                </div>
              </div>
              <p className='text-[14px] rounded-full'>Minutes matter! Get free initial trade mark check done <strong>in minutes</strong>!</p>
            </div>
            <div className='flex gap-4 items-center'>{/*  bg-white/60 shadow-[0_0_8px_8px_rgba(255,255,255,0.6)] rounded-full */}
              <div className='flex flex-col md:flex-row gap-1 text-sm items-center'>
                <div className='w-11 h-11 py-1 flex items-center text-center'>
                  <Image className='max-h-screen' alt="image" loading='lazy' src="/dollar.png" width={50} height={50} />
                </div>
              </div>
              <p className='text-[14px] rounded-full'>Register your trade mark in <strong>Australia</strong> for as little as $590.</p>
            </div>
            <div className='flex justify-between gap-4 items-center'>
              <Link className='text-[22px] underline hover:no-underline text-white font-bold rounded-md transition-all ease-in-out p-2' href="#"> More about trade marks</Link>
              <button onClick={handleClick} className='rounded-md font-semibold hover:bg-blue-500 transition-all ease-in-out bg-pink-500 w-48 h-12 text-white'>Start</button>
            </div>
          </div>
        </div>
      </section>
      <Chat />
      <div id="start-back-image" className='flex fixed right-0 top-0 w-full items-end justify-start -z-10'>
        <Image className=' min-w-[1500px]' alt="image" priority layout='responsive' src="/back-image.avif" width={1250} height={10} />
        {/* https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1c2luZXNzJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1700&q=60 
        https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29ya3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1700&q=60
        */}
        <div
          className="absolute inset-0 bg-white/10  from-white/95  to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l "
        ></div>
      </div>
    </main>
  )
}
Start.getLayout = TMCheckLayout;
export default Start;