

interface FeaturesCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export default function FeaturesCard({ icon, title, description }: FeaturesCardProps) {
    return (
        <div className="bg-[#1D1B20]/50 rounded-xl p-8">
            <div className="bg-[#CFBCFF]/10 inline-flex p-3 border border-[#CFBCFF]/20 rounded-sm">{icon}</div>
            <h3 className="text-[24px] font-semibold mt-6 text-[#E6E0E9]">{title}</h3>
            <p className="text-[#CBC4D2] text-[14px] mt-6">{description}</p>
        </div>
    )
}