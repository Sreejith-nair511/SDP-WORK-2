'use client';

import { useState, useMemo } from 'react';
import { designPatterns } from '@/lib/patterns-data';
import { PatternCard } from '@/components/pattern-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type FilterCategory = 'all' | 'creational' | 'structural' | 'behavioral';
type FilterDifficulty = 'all' | 'beginner' | 'intermediate' | 'advanced';

export function PatternDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<FilterDifficulty>('all');

  const filteredPatterns = useMemo(() => {
    return designPatterns.filter((pattern) => {
      const matchesSearch =
        pattern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pattern.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === 'all' || pattern.category === categoryFilter;

      const matchesDifficulty =
        difficultyFilter === 'all' || pattern.difficulty === difficultyFilter;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchQuery, categoryFilter, difficultyFilter]);

  const stats = {
    total: designPatterns.length,
    creational: designPatterns.filter((p) => p.category === 'creational').length,
    structural: designPatterns.filter((p) => p.category === 'structural').length,
    behavioral: designPatterns.filter((p) => p.category === 'behavioral').length,
  };

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-primary">{stats.total}</div>
          <div className="text-sm text-muted-foreground">Total Patterns</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {stats.creational}
          </div>
          <div className="text-sm text-muted-foreground">Creational</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {stats.structural}
          </div>
          <div className="text-sm text-muted-foreground">Structural</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
            {stats.behavioral}
          </div>
          <div className="text-sm text-muted-foreground">Behavioral</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div
        className="space-y-4"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search patterns by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-6 text-base"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 flex-1">
            <Button
              variant={categoryFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setCategoryFilter('all')}
              size="sm"
            >
              All Categories
            </Button>
            <Button
              variant={categoryFilter === 'creational' ? 'default' : 'outline'}
              onClick={() => setCategoryFilter('creational')}
              size="sm"
            >
              Creational
            </Button>
            <Button
              variant={categoryFilter === 'structural' ? 'default' : 'outline'}
              onClick={() => setCategoryFilter('structural')}
              size="sm"
            >
              Structural
            </Button>
            <Button
              variant={categoryFilter === 'behavioral' ? 'default' : 'outline'}
              onClick={() => setCategoryFilter('behavioral')}
              size="sm"
            >
              Behavioral
            </Button>
          </div>

          {/* Difficulty Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={difficultyFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setDifficultyFilter('all')}
              size="sm"
            >
              All Levels
            </Button>
            <Button
              variant={difficultyFilter === 'beginner' ? 'default' : 'outline'}
              onClick={() => setDifficultyFilter('beginner')}
              size="sm"
            >
              Beginner
            </Button>
            <Button
              variant={difficultyFilter === 'intermediate' ? 'default' : 'outline'}
              onClick={() => setDifficultyFilter('intermediate')}
              size="sm"
            >
              Intermediate
            </Button>
            <Button
              variant={difficultyFilter === 'advanced' ? 'default' : 'outline'}
              onClick={() => setDifficultyFilter('advanced')}
              size="sm"
            >
              Advanced
            </Button>
          </div>
        </div>
      </div>

      {/* Patterns Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredPatterns.length > 0 ? (
          filteredPatterns.map((pattern) => (
            <div
              key={pattern.id}
            >
              <PatternCard pattern={pattern} />
            </div>
          ))
        ) : (
          <div
            className="col-span-full text-center py-12"
          >
            <p className="text-muted-foreground text-lg">No patterns found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div
        className="text-center text-sm text-muted-foreground"
      >
        Showing {filteredPatterns.length} of {stats.total} patterns
      </div>
    </div>
  );
}
