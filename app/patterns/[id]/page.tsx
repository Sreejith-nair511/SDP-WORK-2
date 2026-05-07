import Link from 'next/link';
import { designPatterns } from '@/lib/patterns-data';
import { PatternDetail } from '@/components/pattern-detail';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { notFound } from 'next/navigation';

interface PatternPageProps {
  params: Promise<{ id: string }>;
}

export default async function PatternPage({ params }: PatternPageProps) {
  const { id } = await params;
  const pattern = designPatterns.find((p) => p.id === id);

  if (!pattern) {
    notFound();
  }

  const currentIndex = designPatterns.findIndex((p) => p.id === id);
  const prevPattern = currentIndex > 0 ? designPatterns[currentIndex - 1] : null;
  const nextPattern = currentIndex < designPatterns.length - 1 ? designPatterns[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-slate-50 dark:to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/patterns" className="flex items-center gap-2 hover:opacity-80">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-lg font-semibold">All Patterns</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
              DP
            </div>
            <span className="text-lg font-bold">Design Patterns</span>
          </div>
          <div className="w-32" />
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <PatternDetail pattern={pattern} />

        {/* Navigation Buttons */}
        <div className="mt-16 flex gap-4 justify-between">
          {prevPattern ? (
            <Link href={`/patterns/${prevPattern.id}`}>
              <Button variant="outline" className="gap-2">
                <ChevronLeft className="w-5 h-5" />
                {prevPattern.name}
              </Button>
            </Link>
          ) : (
            <div />
          )}
          {nextPattern ? (
            <Link href={`/patterns/${nextPattern.id}`}>
              <Button variant="outline" className="gap-2">
                {nextPattern.name}
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Back to Patterns */}
        <div className="mt-8 text-center">
          <Link href="/patterns">
            <Button variant="ghost">← Back to All Patterns</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
