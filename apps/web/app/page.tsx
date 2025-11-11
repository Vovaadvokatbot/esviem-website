export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">
            Добро пожаловать в <span className="text-purple-400">Esviem</span>
          </h1>
          <p className="text-xl text-gray-300">
            Ваш современный веб-проект на Next.js 16
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            title="⚡ Быстрый"
            description="Построен на Next.js 16 с Turbopack для молниеносной разработки"
          />
          <FeatureCard
            title="🎨 Современный"
            description="Tailwind CSS v4 для красивого и гибкого дизайна"
          />
          <FeatureCard
            title="📦 Масштабируемый"
            description="Монорепо архитектура с Turborepo для больших проектов"
          />
        </div>

        <div className="text-center">
          <div className="inline-flex gap-4">
            <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors">
              Документация Next.js
            </a>
            <a href="https://turbo.build/repo/docs" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors">
              Turborepo Docs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:bg-white/20 transition-all">
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}