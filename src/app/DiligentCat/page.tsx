import MemeCat from "../../components/MemeCat";

export default function DiligentCatPage() {
  return (
    <main className="min-h-screen bg-[#0e0100] text-[#fffbff] flex items-center justify-center px-6">
      <div className="rounded-3xl border border-[#ff7a1b]/25 bg-[#1e0800]/90 p-10 shadow-2xl shadow-orange-950/40">
        <MemeCat size={260} />

        <h1 className="mt-6 text-center text-4xl font-bold">
          Diligent Cat
        </h1>

        <p className="mt-3 text-center text-sm text-[#ffd7cd]">
          
        </p>
      </div>
    </main>
  );
}