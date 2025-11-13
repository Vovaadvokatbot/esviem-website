import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title:
    'ESVIEM Consulting — Стратегічне юридичне, фінансове, будівельне та земельне консультування',
  description:
    'ESVIEM — команда експертів з 15+ роками досвіду в юридичному, фінансовому, будівельному та земельному консалтингу. Ми створюємо рішення, які працюють у реальному бізнесі.',
  keywords: [
    'ESVIEM',
    'консалтинг',
    'юридичний консалтинг',
    'фінансовий консалтинг',
    'будівельний консалтинг',
    'земельний консалтинг',
    'консалтинг Україна',
    'ESVIEM Consulting',
    'бізнес послуги',
    'консалтинг Київ'
  ],

  // ▓▓▓ CANONICAL ▓▓▓
  alternates: {
    canonical: 'https://esviem.kiev.ua',
  },

  // ▓▓▓ OPEN GRAPH (Facebook, LinkedIn, Telegram) ▓▓▓
  openGraph: {
    title: 'ESVIEM Consulting — Комплексні рішення для бізнесу',
    description:
      'Юридичний, фінансовий, будівельний та земельний консалтинг. 15+ років досвіду. Працюємо з бізнесом, інвесторами та приватними клієнтами.',
    url: 'https://esviem.kiev.ua',
    siteName: 'ESVIEM Consulting',
    type: 'website',
    images: [
      {
        url: '/og-image.png', // ⚠️ поки що заглушка, додамо картинку
        width: 1200,
        height: 630,
        alt: 'ESVIEM Consulting',
      },
    ],
  },

  // ▓▓▓ TWITTER CARD ▓▓▓
  twitter: {
    card: 'summary_large_image',
    title: 'ESVIEM Consulting',
    description:
      'Стратегічні консультації для бізнесу: юридичні, фінансові, будівельні та земельні рішення.',
    images: ['/og-image.png'],
  },

  // ▓▓▓ BASIC SETUP ▓▓▓
  metadataBase: new URL('https://esviem.kiev.ua'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}
