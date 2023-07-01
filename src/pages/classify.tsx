import ProgressIndicator from "../components/ProgressIndicator";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import WaitingLocker from "../components/WaitingLocker";
import { Checkbox, CircularProgress, FormControlLabel, FormGroup, Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";
import PortalClass from "../components/PortalClass";
import { AlertErr, Alert2 } from "../components/AlertContainers";
import TMCheckLayout from "../layout/TMCheckLayout";

export const ClassBadge = ({ text }: { text: string }) => {
    return (
        <div className="w-fit bg-[#E0F3F4] text-[12px] leading-[18px] font-bold px-2 py-1 rounded-sm">Class {text}</div>
    )
}
export const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}));

const BottomCostBar = ({ show, near }: { show: boolean, near: boolean }) => {
    return (
        <>
            {show && (
                <div className={`z-10 transition-all ease-in-out duration-500 w-full flex items-center fixed ${near ? "-bottom-[78px]" : "bottom-0"} border-t-[5px] border-[#DE4326] bg-[#040c13]`}>
                    <div className="w-full mt-4 mb-24 max-w-7xl mx-auto px-6 flex justify-between">
                        <div className="flex gap-4 items-center">
                            <h3 className="flex items-center justify-center font-mont text-[18px] leading-7 bg-[#30AEB6] rounded-full text-black w-11 h-11">2</h3>
                            <div className="flex flex-col text-white">
                                <h2 className="font-mont text-[24px] leading-9">classes selected</h2>
                                <span className="text-[16px] leading-6">Total cost: <strong>$660</strong></span>
                            </div>
                        </div>
                        <button onClick={() => alert()} className="text-[16px] transition-all ease-in-out leading-6 text-white bg-[#1D252C] h-12 px-4 rounded-lg hover:bg-[#72757E]">Ok</button>
                    </div>
                </div>
            )}
        </>
    )
}

const Classify = () => {
    const router = useRouter();
    const [waiting, setWaiting] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [goods, setGoods] = useState('');
    const [isNearBottom, setIsNearBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const pageHeight = document.body.scrollHeight;
            const currentPosition = window.pageYOffset + windowHeight;
            setIsNearBottom(currentPosition >= pageHeight - 224);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNextClick = () => {
        if (true) {
            setWaiting(true);
            setTimeout(() => {
                setWaiting(false);
                router.push('/summary');
            }, 5000);
        } else {
            setShowAlert(true)
            router.push('#main-start-section');
        }
    }

    return (
        <>
            <main className='max-w-7xl mx-auto px-6 py-4'>
                <div className="grid gap-y-6">
                    <ProgressIndicator stage={3} />
                    <section id="contentMain" className="grid grid-cols-12 gap-6">
                        <AlertErr showAlert={showAlert} msg="Select at least one good or service to continue." />
                        <h1 className="font-mont text-[32px] font-bold col-span-12">What goods or services do you provide?</h1>
                        <Alert2 msg={
                            <>
                                <h4 className="text-[14px] leading-6">Goods or services relate to how your trade mark is protected.</h4>
                                <button onClick={() => alert()} className="flex gap-4 p-3 h-[46px] w-fit rounded-sm bg-white border border-black">
                                    <Image alt="img" src="/play-video.svg" loading="lazy" width={24} height={20} />
                                    <h4 className="text-[14px] leading-6"> <strong>Help video</strong> (90 seconds)</h4>
                                </button>
                            </>
                        } />
                        <section className="col-span-8 flex flex-col gap-4">
                            <section className="col-span-6 flex flex-col gap-2">
                                <div className="flex">
                                    <h3 className="text-[18px] font-mont leading-6 flex-grow">Search for your goods or services</h3>
                                    <BootstrapTooltip placement="bottom" sx={
                                        {
                                            "& .MuiTooltip-tooltip": { backgroundColor: "black" }
                                        }
                                    } title={
                                        <>
                                            <style>{`p {font-size:16px; line-height:24px;}`}</style>
                                            <p>Goods or services relate to how your trade mark is protected.</p>
                                            <br />
                                            <p> Select what you offer now, or plan to in the near future. You may need to use the search multiple times. </p>
                                        </>
                                    } arrow>
                                        <svg className='w-6 h-6 align-baseline inline-block stroke-black cursor-pointer'><use href="#question"></use></svg>
                                    </BootstrapTooltip>

                                </div>
                                <span className="text-[14px] leading-6 text-[#72757e]">Try different keywords and searches to uncover all relevant goods and services for your business.</span>
                                <div className="flex gap-1 relative items-center">
                                    <input value={goods} onChange={e => setGoods(e.target.value)} placeholder="example: clothing for sports" className={`w-full h-16 px-5 py-3 bg-[#F5F6F7] border-b-2 "border-black"`} />
                                    <button className="flex flex-col justify-center absolute items-center right-0 w-12 h-12 hover:bg-[#C8CAD0] border-black hover:border rounded-md">
                                        <svg className='self-center w-[10px] h-[10px] align-baseline inline-block stroke-black'><use href="#x"></use></svg>
                                    </button>
                                    <CircularProgress className="absolute right-14 " color="secondary" />
                                </div>

                            </section>
                            <PortalClass />
                        </section>
                        <section className="col-span-4 flex flex-col gap-4 p-4 border h-fit border-[#C8CAD0] rounded-md" >
                            <h5 className="font-mont text-[16px] leading-7">Your trade mark</h5>
                            <div className="flex justify-between">
                                {
                                    false ?
                                        <span className="inline-block text-[16px] leading-6 py-3 px-4 font-bold bg-[#F9F9F9] rounded-lg border border-[#C8CAD0]">Word Monkey</span> :
                                        <div className="border border-[#C8CAD0] rounded-md p-4 relative">
                                            <Image alt="img" src="/code_developer.jpg" loading="lazy" width={200} height={200} />
                                        </div>
                                }
                                <Link className="inline-block h-fit text-[16px] leading-8 font-bold px-4 py-2 border border-black rounded-md" href="#">Edit</Link>
                            </div>
                            <hr />
                            <div id="pricingCard" className="flex flex-col ">
                                <div>
                                    <h4 className="text-[16px] leading-7 font-mont">Goods or services</h4>
                                    <span className="text-[14px] leading-5">The cost is only payable if you apply.</span>
                                </div>
                                <div className="flex flex-col gap-6 pt-4">
                                    <div className="flex flex-wrap gap-2">
                                        <button className="flex gap-2 text-[12px] leading-6 items-center bg-[#F9F9F9] py-1 px-2 box-border outline-1 rounded-md hover:outline outline-black">
                                            <span>Teapot stands</span>
                                            <svg className='w-[10px] h-[10px] inline-block stroke-[#040c13] fill-none'><use href="#x"></use></svg>
                                        </button>
                                    </div>
                                    <div className="flex justify-between w-full pt-4 pr-2">
                                        <ClassBadge text="29" />
                                        $330
                                    </div>
                                    <hr />
                                </div>
                                <div className="flex justify-between w-full px-2 py-4 mt-4 bg-[#f2f2f6] text-[16px] font-bold">
                                    <span>Total</span>
                                    <span>$990</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 bg-[#e0f3f4] p-4">
                                <div className="flex gap-2 items-center">
                                    <svg className='w-6 h-6 inline-block stroke-[#040c13] fill-none'><use href="#money"></use></svg>
                                    <h3 className="font-mont text-[18px] leading-7">This check is free</h3>
                                </div>
                                <p className="text-[14px] leading-5">It doesn&apos;t cost anything to check your trade mark using our automated tool.</p>
                                <p className="text-[14px] leading-5">If you decide to apply, the cost of a trade mark is based on the number of classes your chosen items are in.</p>
                            </div>
                            <button onClick={() => alert()} className="flex flex-col bg-[#248289] px-4 py-2 ">
                                <p className="text-[14px] leading-6 text-white"> <strong> Help video </strong> (90 seconds) </p>
                                <div className="flex justify-between w-full">
                                    <h4 className="text-[16px] leading-7 font-mont text-white">Selecting goods and services</h4>
                                    <Image alt="img" src="/play-video.svg" loading="lazy" width={24} height={20} />
                                </div>
                            </button>
                        </section>
                    </section>
                </div>
                <WaitingLocker waiting={waiting} />
            </main>
            <div className="z-20 col-span-12 p-4 sticky w-full bottom-0 bg-white shadow-[0_-1px_2px_#000]">
                <div className="max-w-7xl mx-auto px-6 flex gap-5">
                    <button onClick={() => router.back()} className='rounded-md font-semibold hover:bg-[#72757E] transition-all flex justify-start gap-4 items-center px-4 ease-in-out text-[#1D252C] w-[140px] h-[46px] bg-white border border-black'>
                        <svg className='w-[17px] h-[17px] align-baseline inline-block stroke-[#1D252C]'><use href="#arrow-left"></use></svg>
                        Back
                    </button>
                    <button onClick={handleNextClick} className='rounded-md font-semibold hover:bg-[#72757E] transition-all flex justify-between gap-4 items-center px-4 ease-in-out bg-[#1D252C] w-[140px] h-[46px] text-white'>
                        Next
                        <svg className='w-[17px] h-[17px] align-baseline inline-block stroke-white'><use href="#arrow-right"></use></svg>
                    </button>
                </div>
            </div>
            <BottomCostBar near={isNearBottom} show={true} />
        </>
    )
}
Classify.getLayout = TMCheckLayout;
export default Classify;