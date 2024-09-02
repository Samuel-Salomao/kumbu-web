// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Kumbu',
  description: 'App para rastreamento de despesas',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className="min-h-screen bg-[#20c997]/10">
        {children}
      </body>
    </html>
  );
}
