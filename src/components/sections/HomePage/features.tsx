import FeaturesCard from "../../ui/Cards/FeaturesCard";
import { HeadIcon, LightningIcon, ArrowIcon } from "../../ui/Icons";


const featuresData = [
    {
        icon: <HeadIcon/>,
        title: "AI-powered questions",
        description: "Dynamic problem sets tailored to your target company and experience level, from LeetCode patterns to System Design."
    },
    {
        icon: <LightningIcon/>,
        title: "Real-time feedback",
        description: "Instant analysis of your code efficiency, edge-case handling, and communication style asyou talk through your solution."
    },
    {
        icon: <ArrowIcon/>,
        title: "Track your progress",
        description: "Visual dashboard highlighting your strengthsand identifying specific areas that need more practice before the big day."
    }
]

export default function Features() {
    return (
        <section className="mt-12 mx-11 ">
            <h2 className="text-4xl font-semibold text-[#E6E0E9]">Engineered for growth</h2>
            <p className="text-[#CBC4D2] text-[14px] mt-4 max-w-121.25">Stop guessing where you stand. Our platform provides the data you need to bridge the gap between {'"'}good{'"'} and {'"'}hired.{'"'}</p>
            <div className="grid grid-cols-3 gap-6 mt-12">
                {featuresData.map((card, index) => (
                    <FeaturesCard key={index} {...card} />
                ))}
            </div>
        </section>
    )
}