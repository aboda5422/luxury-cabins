export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-screen bg-[#F7F4F0] text-[#0f0f0f]">{children}</div>;
}
