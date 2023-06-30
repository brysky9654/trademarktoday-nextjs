import Image from "next/image";
import Link from "next/link";

const SignWithGoogle = () => {
    const CLIENT_ID = '87243843360-rthve5gqor338s2ukej91u3qu4jbkbso.apps.googleusercontent.com';
    const REDIRECT_URI = 'http://localhost/api/google';
    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&redirect_uri=${REDIRECT_URI}`;
    return (
        <Link href={GOOGLE_AUTH_URL}>
            <button className="w-60 p-2 rounded-md border border-black flex justify-center gap-3 items-center font-bold">
                <Image alt="google" src="/google.png" width={40} height={40} loading="lazy" />
                Sign with Google
            </button>
        </Link>
    )
}
export default SignWithGoogle;