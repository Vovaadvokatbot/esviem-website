import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="pt-32 pb-40 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Комплексний консалтинг для бізнесу<br />
            <span className="text-blue-400">ESVIEM Consulting</span>
          </h1>

          <p className="text-xl text-slate-300 max-w-3xl mb-10">
            Юридичний, фінансовий, земельний та будівельний супровід проєктів.
            15+ років досвіду. Робимо складне — простим. Гарантуємо результат.
          </p>

          <Link
            href="/contact"
            className="px-10 py-3 bg-blue-600 hover:bg-blue-700 transition text-white text-lg rounded-lg font-semibold"
          >
            Отримати консультацію
          </Link>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          
          <h2 className="text-4xl font-bold mb-12 text-slate-900">Наші послуги</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <Link href="/services/land-consulting" className="p-6 bg-white shadow rounded-xl hover:shadow-lg transition border">
              <h3 className="text-xl font-bold mb-2">Земельний консалтинг</h3>
              <p className="text-slate-600">Аудит, документи, МУО, ТУ, ризики, цільове призначення.</p>
            </Link>

            <Link href="/services/construction-consulting" className="p-6 bg-white shadow rounded-xl hover:shadow-lg transition border">
              <h3 className="text-xl font-bold mb-2">Будівельний супровід</h3>
              <p className="text-slate-600">СС1-СС3, технічний аудит, акти, техпаспорти, введення в експлуатацію.</p>
            </Link>

            <Link href="/services/financial-consulting" className="p-6 bg-white shadow rounded-xl hover:shadow-lg transition border">
              <h3 className="text-xl font-bold mb-2">Фінансовий аудит</h3>
              <p className="text-slate-600">Оптимізація бізнесу, аналіз руху коштів, фінансові моделі.</p>
            </Link>

            <Link href="/services/legal-consulting" className="p-6 bg-white shadow rounded-xl hover:shadow-lg transition border">
              <h3 className="text-xl font-bold mb-2">Юридичний супровід</h3>
              <p className="text-slate-600">Договори, спори, аудит, представництво та захист.</p>
            </Link>

          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-12">

          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6 text-slate-900">Про компанію</h2>
            <p className="text-slate-600 leading-7 mb-6">
              ESVIEM — це команда експертів з юридичного, фінансового,
              земельного та будівельного консалтингу. Ми працюємо з
              інвестиційними проєктами, приватними клієнтами та бізнесом різного масштабу.
            </p>
            <p className="text-slate-600 leading-7">
              Наша місія — забезпечити повний та прогнозований супровід,
              мінімізувати ризики та створювати рішення, що підсилюють бізнес.
            </p>
          </div>

          <div className="flex-1 bg-slate-100 rounded-xl p-10 shadow text-slate-700">
            <ul className="space-y-4 text-lg">
              <li>✔ 15+ років досвіду</li>
              <li>✔ Понад 400 успішних проєктів</li>
              <li>✔ Повністю конфіденційний супровід</li>
              <li>✔ Робота “під ключ”</li>
              <li>✔ Оплата за результат</li>
            </ul>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12">Чому клієнти обирають нас?</h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div>
              <h3 className="text-xl font-semibold mb-3">Точність і відповідальність</h3>
              <p className="text-slate-300">Ми працюємо виключно на результат і не приймаємо “сірих” рішень.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Глибока експертиза</h3>
              <p className="text-slate-300">Команда фахівців з юридичного, фінансового, земельного та будівельного права.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Прозорі умови</h3>
              <p className="text-slate-300">Оплата лише після фактичного результату. Жодних прихованих витрат.</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-blue-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Готові розпочати співпрацю?</h2>
        <p className="text-xl text-blue-100 mb-10">
          Залиште заявку — ми зв’яжемося з вами та запропонуємо оптимальний формат співпраці.
        </p>

        <Link
          href="/contact"
          className="px-12 py-4 bg-white text-blue-700 rounded-lg font-bold text-lg hover:bg-slate-100 transition"
        >
          Залишити заявку
        </Link>
      </section>

    </main>
  );
}
