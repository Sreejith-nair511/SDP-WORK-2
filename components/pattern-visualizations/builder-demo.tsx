'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';

interface Pizza {
  dough: string;
  sauce: string;
  cheese: boolean;
  pepperoni: boolean;
  mushrooms: boolean;
}

export function BuilderDemo() {
  const [pizza, setPizza] = useState<Pizza>({
    dough: 'thin',
    sauce: 'tomato',
    cheese: true,
    pepperoni: false,
    mushrooms: false,
  });

  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  const buildPizza = () => {
    setPizzas((prev) => [...prev, { ...pizza }]);
  };

  const reset = () => {
    setPizza({
      dough: 'thin',
      sauce: 'tomato',
      cheese: true,
      pepperoni: false,
      mushrooms: false,
    });
    setPizzas([]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Builder Pattern: Pizza Builder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Builder */}
            <div className="space-y-4">
              <h4 className="font-semibold">Build Your Pizza</h4>

              <div className="space-y-3 p-4 rounded-lg border border-border">
                {/* Dough Selection */}
                <div>
                  <label className="text-sm font-medium">Dough Type</label>
                  <div className="flex gap-2 mt-2">
                    {['thin', 'thick', 'stuffed'].map((type) => (
                      <Button
                        key={type}
                        variant={pizza.dough === type ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPizza({ ...pizza, dough: type })}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Sauce Selection */}
                <div>
                  <label className="text-sm font-medium">Sauce</label>
                  <div className="flex gap-2 mt-2">
                    {['tomato', 'pesto', 'bbq'].map((sauce) => (
                      <Button
                        key={sauce}
                        variant={pizza.sauce === sauce ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPizza({ ...pizza, sauce })}
                      >
                        {sauce}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Toppings */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Toppings</label>
                  <div className="space-y-1 pl-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={pizza.cheese}
                        onCheckedChange={(checked) =>
                          setPizza({ ...pizza, cheese: checked as boolean })
                        }
                      />
                      <label className="text-sm">Cheese</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={pizza.pepperoni}
                        onCheckedChange={(checked) =>
                          setPizza({ ...pizza, pepperoni: checked as boolean })
                        }
                      />
                      <label className="text-sm">Pepperoni</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={pizza.mushrooms}
                        onCheckedChange={(checked) =>
                          setPizza({ ...pizza, mushrooms: checked as boolean })
                        }
                      />
                      <label className="text-sm">Mushrooms</label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button onClick={buildPizza} className="flex-1" size="lg">
                    Build Pizza
                  </Button>
                  <Button onClick={reset} variant="outline" size="lg">
                    Reset
                  </Button>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-4">
              <h4 className="font-semibold">Current Pizza</h4>
              <motion.div
                className="p-6 rounded-lg border-2 border-primary bg-primary/5 text-center"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-4xl mb-3">🍕</div>
                <div className="space-y-1 text-sm">
                  <div>
                    <span className="font-medium">Dough:</span> {pizza.dough}
                  </div>
                  <div>
                    <span className="font-medium">Sauce:</span> {pizza.sauce}
                  </div>
                  <div className="pt-2 font-medium">Toppings:</div>
                  <div className="text-xs text-muted-foreground">
                    {pizza.cheese && <div>✓ Cheese</div>}
                    {pizza.pepperoni && <div>✓ Pepperoni</div>}
                    {pizza.mushrooms && <div>✓ Mushrooms</div>}
                    {!pizza.cheese && !pizza.pepperoni && !pizza.mushrooms && (
                      <div>Just dough and sauce</div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Built Pizzas */}
          {pizzas.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <h4 className="font-semibold">Pizzas Built ({pizzas.length})</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <AnimatePresence>
                  {pizzas.map((p, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="p-3 rounded-lg border border-border bg-card text-center text-sm"
                    >
                      <div className="text-2xl mb-1">🍕</div>
                      <div className="text-xs text-muted-foreground">
                        {p.dough} {p.sauce}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800"
          >
            <p className="text-sm text-blue-900 dark:text-blue-100">
              ✓ The <strong>Builder pattern</strong> allows step-by-step
              construction. You customize each aspect before building the final
              object!
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
