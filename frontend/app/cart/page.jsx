import Image from "next/image";

export default function Cart () {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <h1>Hello, Next.js!</h1>
                <Image
                    src="/frontend_assets/about_img.png"
                    alt="Next.js Logo"
                    width={180}
                    height={37}
                />
            </main>
        </div>
    );
}