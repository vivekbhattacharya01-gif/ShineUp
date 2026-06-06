import { useState } from "react";

export function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there! Ask me anything about vehicle care, service booking, or maintenance." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const question = input.trim();
    if (!question) return;
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question })
      });
      if (!response.ok) {
        throw new Error("Unable to reach the AI service. Please check your deployment or API key.");
      }
      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content || data?.answer || "Sorry, I could not generate a response.";
      setMessages((prev) => [...prev, { role: "assistant", content }]);
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setMessages((prev) => [...prev, { role: "assistant", content: "I couldn't fetch a response right now. Try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] pt-24 pb-16 bg-gradient-to-b from-black via-slate-950 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37]/10 px-4 py-2 text-sm font-semibold text-[#FFD700]">
                AI Assistant
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">Ask ShineUp for care tips, booking advice, or vehicle inspection guidance.</h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-300">
                Get instant assistance on maintenance schedules, partner recommendations, and how to keep your vehicle running smoothly.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <h2 className="text-xl font-semibold">How to use</h2>
              <ul className="mt-4 space-y-3 text-slate-300">
                <li>• Ask about service types, maintenance plans, or common car issues.</li>
                <li>• Use complete questions like “What should I do before a long road trip?”</li>
                <li>• If you deploy this app, add your OpenAI key in environment variables.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">AI chat</p>
                <h3 className="mt-2 text-2xl font-semibold">Interactive car assistant</h3>
              </div>
              <span className="rounded-full bg-[#D4AF37]/10 px-3 py-1 text-sm text-[#FFD700]">Live</span>
            </div>

            <div className="mt-6 space-y-4 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-4 sm:p-6">
              <div className="space-y-4 max-h-[52vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {messages.map((message, index) => (
                  <div key={index} className={`rounded-3xl p-4 ${message.role === "user" ? "bg-white/10 self-end text-white" : "bg-slate-800 text-slate-100"}`}>
                    <p className="text-sm leading-6 whitespace-pre-line">{message.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <label className="sr-only" htmlFor="assistant-input">Ask ShineUp</label>
              <textarea
                id="assistant-input"
                rows="3"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="min-h-[96px] resize-none rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                placeholder="Type your question here..."
              />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {error && <p className="text-sm text-rose-300">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-[#D4AF37] to-[#FFD700] px-6 py-3 text-black font-semibold transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Thinking..." : "Send question"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
