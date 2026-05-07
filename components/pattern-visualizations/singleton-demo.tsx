'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

interface SingletonInstance {
  id: string;
  timestamp: number;
}

export function SingletonDemo() {
  const [instances, setInstances] = useState<SingletonInstance[]>([]);
  const [singletonId] = useState(() => Math.random().toString(36).substr(2, 9));

  const createNewInstance = () => {
    const newInstance: SingletonInstance = {
      id: singletonId,
      timestamp: Date.now(),
    };
    setInstances((prev) => [...prev, newInstance]);
  };

  const reset = () => {
    setInstances([]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Singleton Pattern Visualization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4">
            <Button onClick={createNewInstance} size="lg">
              Create Instance
            </Button>
            {instances.length > 0 && (
              <Button onClick={reset} variant="outline" size="lg">
                Reset
              </Button>
            )}
          </div>

          {/* Singleton Instance Display */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Singleton Object</h4>
              <motion.div
                className="p-6 rounded-lg border-2 border-primary bg-primary/5"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                <div className="text-center">
                  <div className="text-sm font-mono text-muted-foreground mb-2">
                    ID: {singletonId}
                  </div>
                  <div className="text-2xl font-bold text-primary">1</div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Only One Instance Ever Created
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">
                Instance References ({instances.length})
              </h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <AnimatePresence>
                  {instances.length === 0 ? (
                    <div className="p-6 text-center text-muted-foreground border border-dashed rounded-lg">
                      No instances yet
                    </div>
                  ) : (
                    instances.map((instance, index) => (
                      <motion.div
                        key={`${instance.id}-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="p-3 rounded-lg border border-border bg-card text-sm"
                      >
                        <div className="font-mono">
                          ref_{index + 1}:{' '}
                          <span className="text-green-600 dark:text-green-400">
                            {instance.id}
                          </span>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {instances.length > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800"
            >
              <p className="text-sm text-blue-900 dark:text-blue-100">
                ✓ Notice: All {instances.length} references point to the{' '}
                <strong>same instance</strong> ({singletonId}). No matter how many
                times you create an instance, you always get the same object!
              </p>
            </motion.div>
          )}

          {/* Code Example in Demo */}
          <div className="bg-slate-950 text-slate-50 p-4 rounded-lg">
            <div className="text-xs text-slate-400 mb-3 font-mono">
              Call createNewInstance() {instances.length} time{instances.length !== 1 ? 's' : ''}
            </div>
            <pre className="text-xs leading-relaxed overflow-x-auto">
{`const ref_1 = Singleton.getInstance();
const ref_2 = Singleton.getInstance();
const ref_3 = Singleton.getInstance();

console.log(ref_1 === ref_2); // true
console.log(ref_2 === ref_3); // true
console.log(ref_1.id); // ${singletonId}`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
