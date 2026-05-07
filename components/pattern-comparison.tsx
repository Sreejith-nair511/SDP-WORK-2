'use client';

import { useState, useMemo } from 'react';
import { designPatterns, DesignPattern } from '@/lib/patterns-data';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export function PatternComparison() {
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);

  const patterns = useMemo(
    () => selectedPatterns.map((id) => designPatterns.find((p) => p.id === id)).filter(Boolean) as DesignPattern[],
    [selectedPatterns]
  );

  const addPattern = (id: string) => {
    if (!selectedPatterns.includes(id) && selectedPatterns.length < 3) {
      setSelectedPatterns([...selectedPatterns, id]);
    }
  };

  const removePattern = (id: string) => {
    setSelectedPatterns(selectedPatterns.filter((p) => p !== id));
  };

  const availablePatterns = designPatterns.filter((p) => !selectedPatterns.includes(p.id));

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Compare Patterns</h2>
        <p className="text-muted-foreground">
          Select up to 3 patterns to compare their characteristics side-by-side
        </p>

        <div className="flex gap-2 items-center flex-wrap">
          {selectedPatterns.length < 3 && (
            <Select onValueChange={addPattern}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Add pattern..." />
              </SelectTrigger>
              <SelectContent>
                {availablePatterns.map((pattern) => (
                  <SelectItem key={pattern.id} value={pattern.id}>
                    {pattern.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {selectedPatterns.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedPatterns([])}
            >
              Clear All
            </Button>
          )}
        </div>

        {selectedPatterns.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Select patterns to compare</p>
          </div>
        )}
      </div>

      {patterns.length > 0 && (
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {patterns.map((pattern) => (
            <motion.div
              key={pattern.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className="relative h-full">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => removePattern(pattern.id)}
                >
                  <X className="w-4 h-4" />
                </Button>

                <CardHeader>
                  <CardTitle className="pr-8">{pattern.name}</CardTitle>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline">{pattern.category}</Badge>
                    <Badge variant="outline">{pattern.difficulty}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                      Description
                    </h4>
                    <p className="text-sm">{pattern.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                      Analogy
                    </h4>
                    <p className="text-sm italic">{pattern.analogy}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                      Use Cases
                    </h4>
                    <ul className="text-sm space-y-1">
                      {pattern.useCases.slice(0, 3).map((useCase, i) => (
                        <li key={i} className="text-xs">
                          • {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <h5 className="font-semibold text-muted-foreground mb-1">Pros</h5>
                      <p className="text-green-600 dark:text-green-400">
                        {pattern.pros.length} items
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-muted-foreground mb-1">Cons</h5>
                      <p className="text-red-600 dark:text-red-400">{pattern.cons.length} items</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {patterns.length > 1 && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>Comparison Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Category Comparison */}
            <div>
              <h4 className="font-semibold mb-3">Categories</h4>
              <div className="grid grid-cols-3 gap-4">
                {patterns.map((pattern) => (
                  <div key={pattern.id} className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">
                      {pattern.name}
                    </p>
                    <Badge className="w-full justify-center">
                      {pattern.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Difficulty Comparison */}
            <div>
              <h4 className="font-semibold mb-3">Difficulty Levels</h4>
              <div className="grid grid-cols-3 gap-4">
                {patterns.map((pattern) => (
                  <div key={pattern.id} className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">
                      {pattern.name}
                    </p>
                    <Badge variant="outline" className="w-full justify-center">
                      {pattern.difficulty}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Patterns */}
            {patterns.some((p) => p.relatedPatterns.length > 0) && (
              <div>
                <h4 className="font-semibold mb-3">Related Patterns</h4>
                <div className="space-y-2">
                  {patterns.map((pattern) => (
                    <div key={pattern.id}>
                      <p className="text-sm font-medium mb-1">{pattern.name}</p>
                      <div className="flex gap-2 flex-wrap">
                        {pattern.relatedPatterns.length > 0 ? (
                          pattern.relatedPatterns.map((related) => (
                            <Badge key={related} variant="secondary" className="text-xs">
                              {related.replace('-', ' ')}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground">None specified</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
