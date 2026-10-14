import { PageHero } from "./PageHero";

export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero crumbs={[{ name: title, path }]} title={title} intro={<p>Last updated: {updated}</p>} />
      <section className="bg-paper py-16 md:py-24"><div className="container-x"><div className="prose-pk">{children}</div></div></section>
    </>
  );
}
