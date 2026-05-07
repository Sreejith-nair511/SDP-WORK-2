'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { PatternDashboard } from '@/components/pattern-dashboard';
import { ArrowLeft } from 'lucide-react';

export default function PatternsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center gap-2">
          <Link href="/" className="flex items-center gap-1 hover:opacity-80 flex-shrink-0">
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-lg font-semibold hidden sm:inline">Back</span>
          </Link>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
              DP
            </div>
            <span className="text-sm md:text-lg font-bold truncate">Patterns</span>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Link href="/compare" className="hidden sm:block">
              <Button variant="outline" size="sm" className="text-xs md:text-sm">
                Compare
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 md:mb-12 space-y-3 md:space-y-4">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">Explore Patterns</h1>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
            Browse and search through all 23 design patterns. Filter by category and difficulty level.
          </p>
          <div className="flex gap-2 flex-wrap pt-2">
            <Link href="/help">
              <Button variant="outline" size="sm" className="text-xs md:text-sm">
                Find Your Pattern
              </Button>
            </Link>
            <Link href="/compare" className="sm:hidden">
              <Button variant="outline" size="sm" className="text-xs">
                Compare
              </Button>
            </Link>
          </div>
        </div>

        <PatternDashboard />
      </div>
    </main>
  );
}
