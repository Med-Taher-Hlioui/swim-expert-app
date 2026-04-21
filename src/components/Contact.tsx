export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto space-y-12 animate-in slide-in-from-bottom-8 duration-500 text-left pb-20">
      <h2 className="text-4xl font-black italic uppercase tracking-tighter text-blue-500">Contact</h2>
      <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-xl space-y-6">
        <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm" placeholder="Full Name" />
        <input type="email" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm" placeholder="Email Address" />
        <textarea className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm h-40" placeholder="Your Message..."></textarea>
        <button className="w-full bg-blue-600 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all">Send Message</button>
      </div>
    </div>
  );
}