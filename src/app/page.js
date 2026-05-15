import { quotes as initialQuotes } from "@/quotes";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-200">
      <section className="bg-slate-50/50 rounded-md p-10 flex flex-col">
        <p className="text-2xl font-semibold text-slate-900">
          {initialQuotes[0].quote}
        </p>
        <span className="text-md font-semibold text-slate-900 self-end">
          {initialQuotes[0].author}
        </span>
        <div className="mt-6 flex flex-col">
          <button className="text-md font-semibold bg-slate-400/90 py-2 px-4 rounded-md">
            Next Quote
          </button>
        </div>
      </section>
    </main>
  );
}
