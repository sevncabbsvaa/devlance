import PricingCard from "../../ui/Cards/PricingCard";

const plans = [
  {
    plan: "FREE",
    price: "$0",
    features: ["3 interviews/month", "Basic AI feedback", "Community support"],
    buttonText: "Get Started",
  },
  {
    badge: "POPULAR",
    plan: "PRO",
    price: "$5",
    features: ["Unlimited interviews", "Advanced architectural analysis", "Personalized roadmap", "Priority email support"],
    buttonText: "Upgrade Now",
    highlighted: true,
  },
];

export default function Pricing() {
  return (
    <section className="text-center mt-24">
        <h2 className="text-4xl font-semibold text-[#E6E0E9] mb-2">Transparent Pricing</h2>
        <p className="text-sm text-[#CBC4D2] mb-12">Level up your interview game without breaking the bank.</p>
      <div className="flex justify-center gap-12">
        {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
        ))}
      </div>
    </section>
  );
}