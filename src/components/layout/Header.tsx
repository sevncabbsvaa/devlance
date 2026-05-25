import Link from "next/link";

export default function Header() {
    return (
        <header className="flex justify-between px-10 py-4 border-b border-white/20">
            <div className="text-[#CFBCFF] font-bold text-4xl"><Link href="/">Devlance</Link></div>
            <div className="items-center flex">
                <ul className="flex gap-6">
                    <li><Link href="/login" className="text-sm font-medium">Login</Link></li>
                    <li><Link href="/login?mode=signup" className="text-sm font-medium bg-[#CFBCFF] text-[#381E72] rounded-2xl py-2 px-4">Get Started</Link></li>
                </ul>
            </div>
        </header>
    )
}