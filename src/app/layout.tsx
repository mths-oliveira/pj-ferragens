import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/fonts.css";
import { getData } from "@/data";
import { ShoppingCartProvider } from "@/context/shopping-cart";
import { Navbar } from "./_components/layout/navbar";
import { Footer } from "./_components/layout/footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Pj Ferragens",
  description:
    "Na PJ ferragens você encontra itens como: Fechadura, Maçaneta, Trinco, Dobradiça, Parafuso, Puxadores e todas as demais ferragens para sua casa.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { pageNavigationDataList, pageDataList } = await getData();
  return (
    <html lang="en">
      <body className="antialiased font-noto">
        <ShoppingCartProvider>
          <Navbar
            pageDataList={pageDataList}
            pageNavigationData={pageNavigationDataList}
          />
          {children}
        </ShoppingCartProvider>
        <Footer pageNavigationData={pageNavigationDataList} />
        <Toaster />
      </body>
    </html>
  );
}
