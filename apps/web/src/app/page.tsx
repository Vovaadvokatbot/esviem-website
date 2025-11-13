export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Комплексний консалтинг для бізнесу<br />
            <span className="text-blue-400">ESVIEM Consulting</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            Юридичний, земельний, інвестиційний, будівельний та фінансовий супровід.
            15+ років досвіду. Надійність, відповідальність, результат.
          </p>

          <div className="flex justify-center gap-6">
            <a
              href="/contact"
              className="px-8 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold transition">
              Отримати консультацію
            </a>
            <a
              href="/about"
              className="px-8 py-3 rounded-lg border border-white/40 hover:bg-white hover:text-slate-900 text-lg font-semibold transition">
              Про компанію
            </a>
          </div>
        </div>
      </section>


      {/* ================= SERVICES ================= */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Наші основні напрямки</h2>

          <div className="grid md:grid-cols-4 gap-10">

            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Земельний консалтинг</h3>
              <p className="text-slate-600">Документи, МУО, ТУ, аудит ділянок, зміна цільового призначення.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Будівельний консалтинг</h3>
              <p className="text-slate-600">СС1/СС2/СС3, технічний аудит, введення в експлуатацію.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Фінансовий аудит</h3>
              <p className="text-slate-600">Аналіз, фінмоделі, оптимізація витрат, підготовка до інвестицій.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Юридичний супровід</h3>
              <p className="text-slate-600">Спори, договори, due diligence, повний юридичний супровід.</p>
            </div>

          </div>
        </div>
      </section>


      {/* ================= WHY US ================= */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">Чому саме ESVIEM?</h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="p-6 rounded-xl border">
              <h3 className="text-xl font-semibold mb-2">15+ років досвіду</h3>
              <p className="text-slate-600">Ми супроводжуємо бізнес у найскладніших питаннях.</p>
            </div>

            <div className="p-6 rounded-xl border">
              <h3 className="text-xl font-semibold mb-2">Комплексні рішення</h3>
              <p className="text-slate-600">Юридично, фінансово, земельно та будівельно.</p>
            </div>

            <div className="p-6 rounded-xl border">
              <h3 className="text-xl font-semibold mb-2">Повна конфіденційність</h3>
              <p className="text-slate-600">Ваша безпека та дані — наш абсолютний пріоритет.</p>
            </div>

          </div>
        </div>
      </section>


      {/* ================= ABOUT SHORT ================= */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Про компанію</h2>
          <p className="text-lg text-slate-300 max-w-3xl">
            ESVIEM — це команда консультантів з більш ніж 15-річним досвідом у юридичному,
            фінансовому, земельному та будівельному супроводі бізнесу. Ми пропонуємо рішення,
            які скорочують ризики, оптимізують процеси та захищають інтереси клієнтів.
          </p>

          <a
            href="/about"
            className="inline-block mt-8 px-8 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold transition">
            Детальніше
          </a>
        </div>
      </section>


      {/* ================= CASES ================= */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Реальні кейси</h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="p-6 bg-white shadow rounded-xl">
              <h3 className="font-semibold text-lg mb-2">Земельний аудит</h3>
              <p className="text-slate-600 text-sm">Зміна цільового призначення + ТУ за 42 дні.</p>
            </div>

            <div className="p-6 bg-white shadow rounded-xl">
              <h3 className="font-semibold text-lg mb-2">Введення в експлуатацію</h3>
              <p className="text-slate-600 text-sm">Комерційна будівля — успішно з першого подання.</p>
            </div>

            <div className="p-6 bg-white shadow rounded-xl">
              <h3 className="font-semibold text-lg mb-2">Фінансовий аудит</h3>
              <p className="text-slate-600 text-sm">+27% прибутку за 30 днів.</p>
            </div>

          </div>

          <div className="text-center mt-10">
            <a
              href="/portfolio"
              className="px-8 py-3 rounded-lg bg-slate-900 hover:bg-slate-700 text-white text-lg font-semibold transition">
              Переглянути всі кейси
            </a>
          </div>
        </div>
      </section>


      {/* ================= CTA CONTACT ================= */}
      <section className="py-20 px-6 bg-blue-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Потрібна допомога експертів?</h2>
        <p className="text-lg text-blue-100 mb-8">
          Ми готові взяти ваш проект під повний супровід.
        </p>

        <a
          href="/contact"
          className="px-10 py-4 rounded-lg bg-white text-blue-600 font-bold text-lg hover:bg-blue-200 transition">
          Зв’язатись з нами
        </a>
      </section>
    </main>
  );
}
