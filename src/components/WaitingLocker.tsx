import { CircularProgress } from "@mui/material"

const WaitingLocker = ({waiting,msg="Waiting"}:{waiting:boolean,msg?:string}) => {
    return (
        <div
            style={{
                display: "flex",
                position: "fixed",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: waiting ? "5080" : "-1",
                opacity: waiting ? 1 : 0,
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                alignItems: "center",
                justifyContent: "center",
                transition: "opacity .5s ease-in-out .2s",
            }}
        >
            <div className='w-1/4 h-1/4 bg-white rounded-md flex flex-col justify-center items-center'>
                <CircularProgress color="secondary" />
                <p className='text-[18px] font-mont leading-7'>{msg}...</p>
            </div>
        </div>
    )
}
export default WaitingLocker;