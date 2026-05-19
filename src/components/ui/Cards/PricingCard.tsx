

interface PricingCardProps {
    badge?: string;
    plan: string;
    price: string;
    features: string[];
    buttonText: string;
    highlighted?: boolean;
}

export default function PricingCard({ badge, plan, price, features, buttonText, highlighted }: PricingCardProps) {
  return (
    <div className={`relative p-12 rounded-xl flex flex-col gap-6 ${highlighted ? "bg-[#1D1B20]/50 border border-[#CFBCFF]/30 " : "bg-[#1D1B20]/50"}`}>
      
      
      {badge && (
        <span className="absolute top-0 right-0 bg-[#CFBCFF] text-[#381E72] text-xs px-4 py-1 rounded-bl-lg rounded-tr-lg font-medium">
          {badge}
        </span>
      )}

      <div className="text-center">
        <p className="text-[#CFBCFF] text-sm mb-2">{plan}</p>
        <p className="text-[#E6E0E9] text-4xl font-semibold">
          {price}
          <span className="text-[#CBC4D2] text-sm font-normal">/mo</span>
        </p>
      </div>

      <ul className="flex flex-col gap-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-[#CBC4D2] text-sm">
            <span className="text-[#CFBCFF]">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <button className={`w-full py-2 px-32 rounded-xl text-sm font-medium ${highlighted ? "bg-[#CFBCFF] text-[#381E72]" : "border border-[#FFF]/8 text-[#E6E0E9]"}`}>
        {buttonText}
      </button>

    </div>
  );
}