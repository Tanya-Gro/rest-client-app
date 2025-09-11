import { Footer, Header } from '@/components';

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header status="auth" />
      <main className="flex flex-1 px-4 py-2 justify-center">{children}</main>
      <Footer />
    </>
  );
}
