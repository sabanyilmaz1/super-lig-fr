export default async function AuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
