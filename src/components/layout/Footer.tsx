

export default function Footer() {
    return (
        <footer className="mt-12 border-t border-[#FFF]/5">
            <div className="my-12 text-center">
                <h2 className="text-2xl font-bold text-[#CFBCFF]">Devlance</h2>
                <ul className="inline-flex gap-8 mt-6">
                    <li><a href="#PrivacyandPolicy" className="text-[#948E9C] text-sm font-medium">Privacy Policy</a></li>
                    <li><a href="#Services" className="text-[#948E9C] text-sm font-medium">Terms of Service</a></li>
                    <li><a href="#contact" className="text-[#948E9C] text-sm font-medium">Contact</a></li>
                </ul>
                <p className="text-[#948E9C] text-sm mt-6">© 2024 Devlance AI. All rights reserved.</p>
            </div>
        </footer>
    )
}