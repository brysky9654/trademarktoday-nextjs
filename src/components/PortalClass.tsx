import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import { ClassBadge } from "../pages/classify";
const MyCheckbox = ({ label, handleClick }: { label: string, handleClick: (_: { name: string, value: boolean }) => void }) => {
    return (
        <FormControlLabel control={<Checkbox value={label} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleClick({
            name: label,
            value: e.target.checked
        })} />} label={label} />
    )
}
const PortalClass = () => {

    const [divHeight, setDivHeight] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (contentRef.current) {
            setDivHeight(contentRef.current.scrollHeight);
        }
    }, []);
    const [collapsed, setCollapsed] = useState(true);
    const handleCollapse = () => {
        setCollapsed(pre => (!pre));
    }
    const handleCheckboxClick = () => {

    }
    return (
        <section className="flex flex-col gap-4 p-4 shadow-[0_2px_5px_#00000040] rounded-lg">
            <div className="flex gap-4 items-center">
                <h3 className="flex-grow text-[16px] leading-7 font-bold">Meat, eggs, dairy; processed fruit and vegetables</h3>
                <ClassBadge text="29" />
            </div>
            <FormGroup>
                <MyCheckbox label="Fat" handleClick={handleCheckboxClick} />
                <MyCheckbox label="Fat" handleClick={handleCheckboxClick} />
                <MyCheckbox label="Fat" handleClick={handleCheckboxClick} />
                <MyCheckbox label="Fat" handleClick={handleCheckboxClick} />
            </FormGroup>
            {true && (
                <>
                    <hr />
                    <button onClick={handleCollapse} className="flex justify-between px-6 py-1">
                        <h5 className="underline p-1 hover:no-underline hover:bg-[#F2F2F6] font-bold text-[16px]">Show more options</h5>
                        <svg className={`w-[25px] h-[25px] align-baseline inline-block stroke-black fill-white transition-all ease-in-out ${collapsed ? "rotate-[0deg]" : "rotate-[180deg]"}`}><use href={`#${collapsed ? "chevron-down" : "chevron-down"}`}></use></svg>
                    </button>
                    <div ref={contentRef} className={`overflow-hidden transition-all ease-in-out duration-200`} style={{ height: collapsed ? 0 : divHeight }}>
                        <FormGroup>
                            <MyCheckbox label="Fat" handleClick={handleCheckboxClick} />
                            <MyCheckbox label="Fat" handleClick={handleCheckboxClick} />
                            <MyCheckbox label="Fat" handleClick={handleCheckboxClick} />
                            <MyCheckbox label="Fat" handleClick={handleCheckboxClick} />
                        </FormGroup>
                    </div>
                </>
            )}
        </section>
    )
}
export default PortalClass;