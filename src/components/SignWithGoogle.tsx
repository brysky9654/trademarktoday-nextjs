import Image from "next/image";
import Link from "next/link";
import dotenv from 'dotenv'
dotenv.config({ path: "./.env" });
export const REDIRECT_URI = 'https://trademarktoday.com.au/api/google';
// export const REDIRECT_URI = 'https://localhost/api/google';
const SignWithGoogle = () => {

    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&redirect_uri=${REDIRECT_URI}`;
    return (
        <Link href={GOOGLE_AUTH_URL}>
            <button className="w-60 p-2 rounded-md border border-black hover:bg-slate-100 transition-all ease-in-out duration-500 flex justify-center gap-3 items-center font-bold">
                <Image alt="google" src="/google.png" width={30} height={30} loading="lazy" />
                Sign with Google
            </button>
        </Link>
    )
}
export default SignWithGoogle;