import type { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = {
  title: 'Kismet — Home'
};

export default function HomePage(): JSX.Element {
  return (
    <main >
      <h1>Kismet</h1>
      <p>this will be the shiney new page with cool styling. <br/>
        find the old one at <a href="/vanilla">/vanilla</a>
      </p>
    </main>
  );
}