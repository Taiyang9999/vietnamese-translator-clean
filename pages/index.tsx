
import Head from 'next/head';
import VietnameseToneTranslator from '@/components/VietnameseToneTranslator';

export default function Home() {
  return (
    <>
      <Head>
        <title>Vietnamese Translator</title>
      </Head>
      <main>
        <VietnameseToneTranslator />
      </main>
    </>
  );
}
