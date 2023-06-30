import { Radio } from "@mui/material";
import ProgressIndicator from "../components/ProgressIndicator";
import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import WaitingLocker from "../components/WaitingLocker";
import UploadLogo from "../components/UploadLogo";
import { AlertErr, Alert3 } from "../components/AlertContainers";
import TMCheckLayout from "../layout/TMCheckLayout";

const Select = () => {
    const router = useRouter();
    const [waiting, setWaiting] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [isWordLogo, setWordLogo] = useState('Word');
    const [wordContained, setWordContained] = useState(false);
    const [collapsed, setCollapsed] = useState(true);
    const [word, setWord] = useState('');
    const [imgFile, setImgFile] = useState<File>();
    const handleWordLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWordLogo(event.target.value);
    };
    const handleWordContainedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWordContained(event.target.value === "Yes");
    };
    const handleCollapse = () => {
        setCollapsed(pre => (!pre));
    }

    const handleNextClick = () => {
        if ((isWordLogo === "Word" && word.trim() !== '') || (isWordLogo === "Logo" && imgFile !== undefined)) {
            setWaiting(true);
            setTimeout(() => {
                setWaiting(false);
                router.push('/classify');
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
                    <ProgressIndicator stage={2} />
                    <section id="contentMain" className="grid grid-cols-12 gap-6">
                        <AlertErr showAlert={showAlert} msg={isWordLogo === 'Word' ? "Enter a word or phrase to continue." : "You must upload an image to continue."} />
                        <h1 className="font-mont text-[32px] font-bold col-span-12">Which trade mark would you like to check?</h1>
                        <Alert3 msg={
                            <>
                                This initial automated check and trade mark application is for <b> Australia only </b>.
                            </>
                        } />
                        <section onClick={()=>setWordLogo('Word')} className="col-span-6 flex flex-col rounded-md border border-[#C8CAD0] cursor-pointer">
                            <div className="flex gap-2 items-center p-4">
                                <Radio checked={isWordLogo === 'Word'}
                                    onChange={handleWordLogoChange}
                                    value="Word" />
                                <div className="flex gap-1 items-center">
                                    <h3 className="text-[18px] leading-7 font-mont inline">Word</h3>
                                    (or phrases)
                                </div>
                            </div>
                            <div className="flex justify-between py-2 px-4">
                                <p className="text-[14px] leading-6 font-mont">Woolworths</p>
                                <p className="text-[14px] leading-6 font-mont">Triple J</p>
                                <p className="text-[14px] leading-6 font-mont">NBN</p>
                            </div>
                        </section>
                        <section onClick={()=>setWordLogo('Logo')} className="col-span-6 flex flex-col rounded-md border border-[#C8CAD0] cursor-pointer">
                            <div className="flex gap-2 items-center p-4">
                                <Radio checked={isWordLogo === 'Logo'}
                                    onChange={handleWordLogoChange}
                                    value="Logo" />
                                <div className="flex gap-1 items-center">
                                    <h3 className="text-[18px] leading-7 font-mont inline">Logo</h3>
                                    (with or without text)
                                </div>
                            </div>
                            <div className="flex justify-between py-2 px-4">
                                <Image src="/ww-logo.png" loading="lazy" alt="Logo" width={45} height={40} />
                                <Image src="/triple.png" loading="lazy" alt="Logo" width={45} height={40} />
                                <Image src="/nbn.svg" loading="lazy" alt="Logo" width={80} height={40} />
                            </div>
                        </section>
                        {isWordLogo === "Word" ?
                            <section className="col-span-6 flex flex-col gap-2">
                                <h3 className="text-[18px] font-mont leading-6">Enter word or phrase</h3>
                                <span className="text-[14px] leading-6 text-[#72757e]">For example: Tim Tams</span>
                                <input value={word} required onChange={e => setWord(e.target.value)} className={`h-16 px-5 py-3 bg-[#F5F6F7] border-b-2 ${word.trim() === "" ? "border-red-600" : "border-black"}`} />
                                {word.trim() === "" && (
                                    <span className="text-red-600 text-xs leading-6">Enter a word or phrase to continue.</span>
                                )}
                            </section> :
                            (<>
                                <section className="col-span-12 flex flex-col gap-5">
                                    <h3 className="text-[18px] font-mont leading-7">Upload image</h3>
                                    <div className="flex flex-col shadow-[0_2px_10px_#00000040] rounded-lg">
                                        <button onClick={handleCollapse} className="flex justify-between px-6 py-8">
                                            <h5 className="text-[16px] leading-7 font-mont">Tips about images</h5>
                                            <svg className={`w-[25px] h-[25px] align-baseline inline-block stroke-black fill-[#30aeb6] transition-all ease-in-out ${collapsed ? "rotate-[0deg]" : "rotate-[360deg]"}`}><use href={`#${collapsed ? "add" : "subtract"}`}></use></svg>
                                        </button>
                                        <div className={`overflow-hidden transition-all ease-in-out duration-500 ${collapsed ? "h-[0px]" : "h-[280px]"}`}>
                                            <hr />
                                            <div className="flex flex-col gap-4 p-8">
                                                <strong>What you need to know</strong>
                                                <div>
                                                    <li>Logo trade marks are also checked for format and size.</li>
                                                    <li>Your logo must not have the &#174; symbol in it.</li>
                                                </div>
                                                <strong>Upload file requirements</strong>
                                                <div>
                                                    <li>File type must be <strong>jpg</strong> or <strong>png</strong></li>
                                                    <li>Minimum dimensions are <strong>158 x 158 px</strong></li>
                                                    <li>Maximum dimensions are <strong>4960 x 7015 px</strong></li>
                                                    <li>Maximum file size is <strong>10 MB</strong></li>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <UploadLogo />
                                <section className="col-span-6 flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-[16px] font-semibold leading-6">Are there word(s) in the image?</p>
                                        <div className="flex gap-2 items-center h-6">
                                            <Radio className="w-2" checked={!wordContained}
                                                onChange={handleWordContainedChange}
                                                value="No" />
                                            <p className="text-[16px] font-semibold leading-6">No</p>
                                        </div>
                                        <div className="flex gap-2 items-center h-6">
                                            <Radio className="w-2" checked={wordContained}
                                                onChange={handleWordContainedChange}
                                                value="Yes" />
                                            <p className="text-[16px] font-semibold leading-6">Yes</p>
                                        </div>
                                    </div>
                                    {wordContained && <>
                                        <Alert3 msg="Identifying words in your image helps with search accuracy. If you want to apply for a “word/phrase” trade mark, this is a separate application." />
                                        <section className="col-span-6 flex flex-col gap-2">
                                            <h3 className="text-[16px] font-bold leading-6">Word(s) in the image</h3>
                                            <input className=" h-12 px-5 py-3 bg-[#F5F6F7] border-b border-black" />
                                        </section>
                                    </>}
                                </section>
                            </>)}
                    </section>
                </div>
                <WaitingLocker waiting={waiting} />
            </main>
            <div className="col-span-12 py-4 sticky w-full bottom-0 bg-white shadow-[0_-1px_2px_#000]">
                <div className="max-w-7xl mx-auto px-6 flex gap-5 ">
                    <button onClick={() => router.back()} className='rounded-md font-semibold hover:bg-[#72757E] transition-all flex justify-start gap-4 items-center px-4 ease-in-out text-[#1D252C] w-[140px] h-[46px] bg-white border border-black hover:text-white'>
                        <svg className='w-[17px] h-[17px] align-baseline inline-block stroke-current'><use href="#arrow-left"></use></svg>
                        Back
                    </button>
                    <button onClick={handleNextClick} className='rounded-md font-semibold hover:bg-[#72757E] transition-all flex justify-between gap-4 items-center px-4 ease-in-out bg-[#1D252C] w-[140px] h-[46px] text-white'>
                        Next
                        <svg className='w-[17px] h-[17px] align-baseline inline-block stroke-white'><use href="#arrow-right"></use></svg>
                    </button>
                </div>
            </div>
        </>
    )
}
Select.getLayout = TMCheckLayout;
export default Select;