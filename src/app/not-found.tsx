import Link from "next/link";

export default function NotFound() {
  return (
    <main className="safe-area-shell grid place-items-center p-5">
      <section className="w-full max-w-xl rounded-[1.75rem] border border-white/10 bg-oyc-navy/90 p-8 text-center shadow-2xl">
        <p className="text-sm font-bold tracking-[0.16em] text-oyc-cyan uppercase">Page not found</p>
        <h1 className="mt-3 text-3xl font-black">Return to the OYC journey.</h1>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-oyc-cyan bg-oyc-cyan px-5 py-2.5 text-sm font-bold text-oyc-navy-deep transition-colors hover:bg-oyc-cyan-soft"
        >
          Go to Welcome
        </Link>
      </section>
    </main>
  );
}
