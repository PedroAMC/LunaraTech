export default function AdminSection({ title, children }:{
  title: string; children: React.ReactNode;
}) {
  return (
    <section className='space-y-6'>
      <h1 className='text-2xl font-semibold'>{title}</h1>
      {children}
    </section>
  );
}