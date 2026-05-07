'use client';

import Link from 'next/link';
import { DesignPattern } from '@/lib/patterns-data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface PatternCardProps {
  pattern: DesignPattern;
}

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const categoryColors = {
  creational: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  structural: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  behavioral: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
};

export function PatternCard({ pattern }: PatternCardProps) {
  return (
    <Link href={`/patterns/${pattern.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-xl leading-tight flex-1">{pattern.name}</CardTitle>
            <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          </div>
          <div className="flex gap-2 flex-wrap pt-2">
            <Badge className={categoryColors[pattern.category]}>
              {pattern.category}
            </Badge>
            <Badge className={difficultyColors[pattern.difficulty]}>
              {pattern.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {pattern.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
