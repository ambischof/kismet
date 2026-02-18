import dieSymbols from '../lib/dieSymbols';

export const metadata = {
  title: 'Kismet Scorecard',
  description: 'Interactive classic kismet scorecard',
}

// the die are added with js but should be loaded before that 
// Next image tag isn't helping because we're usign static bundle
const preLoadImageLinks = Object.values(dieSymbols).map((die, i) => { 
  return (
    <link rel="preload" href={die} as="image" key={i}/>
)});
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <head>
        { preLoadImageLinks }
      </head>
      <body>{children}</body>
    </html>
  )
}
