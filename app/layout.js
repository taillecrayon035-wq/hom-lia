import "./globals.css";

export const metadata = {
  title: "Homélia",
  description: "Commentaires catholiques sur les lectures et évangiles du jour",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Homélia",
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-[#E8D9B5] h-screen overflow-hidden">{children}</body>
    </html>
  );
}
