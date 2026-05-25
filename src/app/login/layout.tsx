import Footer from "@/src/components/layout/Footer"

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}