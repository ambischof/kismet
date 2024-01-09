import './globals.css';

export const metadata = {
  title: 'Kismet Scorecard',
  description: 'Interactive classic kismet scorecard',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
