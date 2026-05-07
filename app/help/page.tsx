'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PatternDecisionHelper } from '@/components/pattern-decision-helper';
import { ArrowLeft } from 'lucide-react';

export default function HelpPage() {
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
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Pattern</h1>
          <p className="text-lg text-muted-foreground">
            Not sure which design pattern you need? Answer a few questions and get personalized recommendations.
          </p>
        </div>

        <PatternDecisionHelper />
      </div>
    </main>
  );
}
