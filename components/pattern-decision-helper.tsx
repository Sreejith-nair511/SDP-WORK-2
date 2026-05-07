'use client';

import { useState, useMemo } from 'react';
import { designPatterns, DesignPattern } from '@/lib/patterns-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Question {
  id: string;
  question: string;
  options: {
    text: string;
    patternIds: string[];
  }[];
}

const questions: Question[] = [
  {
    id: 'problem-type',
    question: 'What is your main concern?',
    options: [
      {
        text: 'Creating objects efficiently',
        patternIds: [
          'singleton',
          'factory-method',
          'abstract-factory',
          'builder',
          'prototype',
        ],
      },
      {
        text: 'Composing objects into structures',
        patternIds: [
          'adapter',
          'bridge',
          'composite',
          'decorator',
          'facade',
          'flyweight',
          'proxy',
        ],
      },
      {
        text: 'Object interaction and communication',
        patternIds: [
          'chain-of-responsibility',
          'command',
          'iterator',
          'mediator',
          'memento',
          'observer',
          'state',
          'strategy',
          'template-method',
          'visitor',
        ],
      },
    ],
  },
  {
    id: 'creation-complexity',
    question: 'Object creation complexity?',
    options: [
      {
        text: 'Simple - single object type',
        patternIds: ['singleton', 'prototype'],
      },
      {
        text: 'Medium - variant object types',
        patternIds: ['factory-method', 'builder'],
      },
      {
        text: 'Complex - multiple families',
        patternIds: ['abstract-factory'],
      },
    ],
  },
  {
    id: 'reusability-need',
    question: 'What do you want to improve?',
    options: [
      {
        text: 'Code reusability and sharing',
        patternIds: [
          'composite',
          'decorator',
          'proxy',
          'adapter',
          'bridge',
          'flyweight',
        ],
      },
      {
        text: 'Communication between objects',
        patternIds: [
          'observer',
          'mediator',
          'command',
          'chain-of-responsibility',
        ],
      },
      {
        text: 'State and behavior changes',
        patternIds: ['state', 'strategy', 'template-method', 'visitor'],
      },
    ],
  },
];

export function PatternDecisionHelper() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const recommendedPatterns = useMemo(() => {
    if (selectedAnswers.length === 0) return [];

    const patternCounts: Record<string, number> = {};
    selectedAnswers.forEach((answer) => {
      const questionIndex = parseInt(answer.split('-')[0]);
      const optionIndex = parseInt(answer.split('-')[1]);
      const patternIds =
        questions[questionIndex].options[optionIndex].patternIds;

      patternIds.forEach((id) => {
        patternCounts[id] = (patternCounts[id] || 0) + 1;
      });
    });

    return Object.entries(patternCounts)
      .sort((a, b) => b[1] - a[1])
      .map(
        ([id]) =>
          designPatterns.find((p) => p.id === id) as DesignPattern
      )
      .slice(0, 5);
  }, [selectedAnswers]);

  const handleAnswer = (optionIndex: number) => {
    const answerId = `${currentQuestionIndex}-${optionIndex}`;
    setSelectedAnswers((prev) => [...prev, answerId]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const reset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pattern Decision Helper</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key="questions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Question {currentQuestionIndex + 1}</span>
                    <span className="text-muted-foreground">
                      of {questions.length}
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <motion.div
                      className="bg-primary h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    {currentQuestion.question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full justify-between h-auto py-4 px-4"
                          onClick={() => handleAnswer(index)}
                        >
                          <span className="text-left">{option.text}</span>
                          <ChevronRight className="w-5 h-5 flex-shrink-0" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Back Button */}
                {currentQuestionIndex > 0 && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedAnswers((prev) => prev.slice(0, -1));
                      setCurrentQuestionIndex((prev) => prev - 1);
                    }}
                  >
                    ← Go Back
                  </Button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Recommended Patterns
                  </h3>
                  <p className="text-muted-foreground">
                    Based on your answers, here are the best patterns for your
                    needs:
                  </p>
                </div>

                {recommendedPatterns.length > 0 ? (
                  <div className="space-y-3">
                    {recommendedPatterns.map((pattern) => (
                      <motion.div
                        key={pattern.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <Link href={`/patterns/${pattern.id}`}>
                          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardContent className="p-4 flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold">{pattern.name}</h4>
                                <p className="text-sm text-muted-foreground line-clamp-1">
                                  {pattern.description}
                                </p>
                              </div>
                              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 text-center text-muted-foreground border border-dashed rounded-lg"
                  >
                    No patterns found for your selections
                  </motion.div>
                )}

                <Button
                  onClick={reset}
                  variant="outline"
                  className="w-full"
                >
                  Start Over
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
