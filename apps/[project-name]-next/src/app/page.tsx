import { Button, Image, Link } from 'ui-components';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 gap-4">
      <h1 className="text-2xl mb-8 font-semibold">Web (Next.js) Test Page</h1>
      
      <p>This Image component renders an optimized `next/image`:</p>
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      
      <p className="mt-4">This Link component renders a client-side `NextLink`:</p>
      <Link href="/internal-page" className="text-blue-400 hover:underline">
        Internal Page Link
      </Link>
      
      <p className="mt-4">This button has no href, so it's a standard button:</p>
      <Button variant="contained">
        MUI Styled Button
      </Button>

      <p className="mt-4">This button has an external href, so it becomes an anchor tag:</p>
      <Button 
        variant="text" 
        href="https://google.com" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        External Link (goes to Google)
      </Button>
    </main>
  );
}