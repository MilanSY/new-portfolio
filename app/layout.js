import './globals.css';

export const metadata = {
  title: 'Milan Juino | Portfolio',
  description:
    "Portfolio de Milan Juino, developpeur full stack en recherche d'alternance, futur M1 a l'ESGI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
