export default function SwimNews() {
  const articles = [
    { id: 1, tag: 'World Record', title: 'New 100m Freestyle Record set in Sousse', date: '21 April 2026', excerpt: 'Local swimmers are pushing the boundaries of speed this season...' },
    { id: 2, tag: 'FINA', title: 'New Tech-Suit Regulations for 2026', date: '20 April 2026', excerpt: 'The governing body announced major changes to textile compression...' },
    { id: 3, tag: 'Nutrition', title: 'The Power of Dates for Sprinting', date: '19 April 2026', excerpt: 'Why Tunisia\'s Deglet Nour is becoming the global secret for pre-race fueling...' }
  ];

  return (
    <div className="animate-in slide-in-from-right-4 duration-500 text-left space-y-12 pb-20">
      <div>
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-blue-500">Swim News</h2>
        <p className="text-slate-400 text-sm font-bold tracking-widest mt-2 uppercase">Global & Local Aquatics Updates</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {articles.map(article => (
          <div key={article.id} className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 hover:border-blue-500 transition-all group">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black uppercase text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">{article.tag}</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase">{article.date}</span>
            </div>
            <h3 className="text-2xl font-black italic uppercase group-hover:text-blue-500 transition-colors mb-3">{article.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed italic">{article.excerpt}</p>
            <button className="mt-6 text-[10px] font-black uppercase text-blue-500 tracking-widest hover:underline">Read Full Story →</button>
          </div>
        ))}
      </div>
    </div>
  );
}