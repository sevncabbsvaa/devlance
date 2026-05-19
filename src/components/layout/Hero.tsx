import { StarIcon } from "../ui/Icons";
import Image from "next/image";

export default function Hero() {
    return (
        <div className="text-center mt-16">
            <div className="bg-[#2B292F] px-4 py-1 rounded-2xl inline-flex items-center gap-2 mb-8">
                <StarIcon/>
                <p>New: System Design Mocks now available</p>
            </div>
                <div><h1 className="text-7xl font-bold text-center mb-6">Ace Your Next Developer <br/>
                    Interview</h1>
            </div>
            <div className="max-w-165.25 mx-auto">
                <p className="text-[16px] text-[#CBC4D2] mb-12">Practice with an AI that understands code. Get real-time technical feedback,
architectural suggestions, and progress tracking designed for modern engineers.</p>
            </div>
            <div>
                <ul className="inline-flex gap-6">
                    <li><a href="#" className="bg-[#6750A4] px-8 py-4 rounded-xl font-medium">Start Free Mock Interview</a></li>
                    <li><a href="#" className="px-8 py-4 border border-[#6750A4] rounded-xl font-medium">View Demo</a></li>
                </ul>
            </div>
            <div>
                <Image src="/images/hero.png" alt="Hero Image" width={1100} height={600} className="mx-auto mt-16"/>
            </div>
        </div>
    )
}