import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import AOSInit from "@/components/aos-init";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AOSInit />
      <Header />

      <main className="grow">{children}</main>

      <Footer border={true} />
    </>
  );
}
