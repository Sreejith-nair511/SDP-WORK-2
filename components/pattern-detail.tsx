'use client';

import { DesignPattern } from '@/lib/patterns-data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CodeBlock } from '@/components/code-block';
import { motion } from 'framer-motion';
import { SingletonDemo } from '@/components/pattern-visualizations/singleton-demo';
import { ObserverDemo } from '@/components/pattern-visualizations/observer-demo';
import { BuilderDemo } from '@/components/pattern-visualizations/builder-demo';

interface PatternDetailProps {
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function PatternDetail({ pattern }: PatternDetailProps) {
  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">{pattern.name}</h1>
          <div className="flex gap-2 flex-wrap">
            <Badge className={categoryColors[pattern.category]}>
              {pattern.category}
            </Badge>
            <Badge className={difficultyColors[pattern.difficulty]}>
              {pattern.difficulty}
            </Badge>
          </div>
        </div>
        <p className="text-lg text-muted-foreground">{pattern.description}</p>
      </motion.div>

      {/* Analogy */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Analogy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground italic">{pattern.analogy}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Problem & Solution */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Problem</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{pattern.problem}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Solution</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{pattern.solution}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Use Cases */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Use Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {pattern.useCases.map((useCase, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span className="text-muted-foreground">{useCase}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Pros & Cons */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pros</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {pattern.pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 font-bold mt-1">✓</span>
                  <span className="text-muted-foreground">{pro}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cons</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {pattern.cons.map((con, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-600 dark:text-red-400 font-bold mt-1">✕</span>
                  <span className="text-muted-foreground">{con}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Interactive Demo */}
      {(pattern.id === 'singleton' || pattern.id === 'observer' || pattern.id === 'builder') && (
        <motion.div variants={itemVariants}>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Interactive Visualization</h2>
            {pattern.id === 'singleton' && <SingletonDemo />}
            {pattern.id === 'observer' && <ObserverDemo />}
            {pattern.id === 'builder' && <BuilderDemo />}
          </div>
        </motion.div>
      )}

      {/* Code Examples */}
      <motion.div variants={itemVariants}>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Code Example</h2>
          {pattern.codeExamples.map((example, index) => (
            <CodeBlock key={index} code={example.code} language={example.language} />
          ))}
        </div>
      </motion.div>

      {/* Related Patterns */}
      {pattern.relatedPatterns.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Related Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                {pattern.relatedPatterns.map((relatedId) => (
                  <Badge key={relatedId} variant="outline">
                    {relatedId.replace('-', ' ')}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Real World Example */}
      {pattern.realWorldExample && (
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Real World Example</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{pattern.realWorldExample}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
