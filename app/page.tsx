'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { ArrowRight, BookOpen, Code, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

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
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
              DP
            </div>
            <span className="text-lg md:text-xl font-bold hidden md:inline truncate">Design Patterns</span>
          </div>
          <div className="flex gap-2 items-center">
            <ThemeToggle />
            <Link href="/patterns" className="hidden sm:block">
              <Button variant="outline" size="sm">Explore</Button>
            </Link>
            <Link href="/patterns" className="sm:hidden">
              <Button variant="outline" size="sm">Go</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-32">
        <motion.div
          className="text-center space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            variants={itemVariants}
          >
            Master Design Patterns
          </motion.h1>

          <motion.p 
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2"
            variants={itemVariants}
          >
            Learn all 23 design patterns with interactive visualizations, code examples, and practical use cases
          </motion.p>

          <motion.div 
            className="flex gap-2 sm:gap-4 justify-center flex-wrap pt-6"
            variants={itemVariants}
          >
            <Link href="/patterns">
              <Button size="sm" className="gap-2 text-sm sm:text-base">
                Get Started <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
            <Button size="sm" variant="outline" className="text-sm sm:text-base">
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Learning Features
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              icon: Code,
              title: 'Code Examples',
              description: 'Real-world code examples for each pattern with copy-to-clipboard functionality',
            },
            {
              icon: Zap,
              title: 'Interactive Demos',
              description: 'Animated visualizations showing how patterns work in practice',
            },
            {
              icon: BookOpen,
              title: 'Comprehensive Guide',
              description: 'Detailed explanations, analogies, pros, cons, and use cases for every pattern',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-card border border-border rounded-lg p-6 md:p-8 text-center space-y-3 md:space-y-4 hover:shadow-lg transition-shadow"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <feature.icon className="w-10 md:w-12 h-10 md:h-12 mx-auto text-primary" />
              <h3 className="text-lg md:text-xl font-semibold">{feature.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Pattern Categories
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              category: 'Creational',
              color: 'bg-blue-100 dark:bg-blue-900',
              textColor: 'text-blue-900 dark:text-blue-100',
              count: '5 patterns',
              description: 'Patterns for object creation mechanisms',
            },
            {
              category: 'Structural',
              color: 'bg-purple-100 dark:bg-purple-900',
              textColor: 'text-purple-900 dark:text-purple-100',
              count: '8 patterns',
              description: 'Patterns for composing classes and objects',
            },
            {
              category: 'Behavioral',
              color: 'bg-amber-100 dark:bg-amber-900',
              textColor: 'text-amber-900 dark:text-amber-100',
              count: '10 patterns',
              description: 'Patterns for object collaboration and responsibility',
            },
          ].map((cat, index) => (
            <motion.div
              key={index}
              className={`${cat.color} rounded-lg p-6 md:p-8 hover:shadow-lg transition-shadow`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className={`text-xl md:text-2xl font-bold mb-2 ${cat.textColor}`}>{cat.category}</h3>
              <p className={`mb-3 md:mb-4 text-sm md:text-base ${cat.textColor} opacity-80`}>{cat.description}</p>
              <div className={`text-xs md:text-sm font-semibold ${cat.textColor}`}>{cat.count}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <motion.div 
          className="bg-primary rounded-2xl p-8 md:p-12 text-center text-primary-foreground space-y-4 md:space-y-6"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-2xl md:text-4xl font-bold"
            variants={itemVariants}
          >
            Ready to Learn?
          </motion.h2>
          <motion.p 
            className="text-base md:text-lg opacity-90 max-w-xl mx-auto px-2"
            variants={itemVariants}
          >
            Start exploring design patterns and level up your software architecture skills
          </motion.p>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/patterns">
              <Button size="sm" variant="secondary" className="gap-2 text-sm md:text-base">
                Explore All Patterns <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="border-t border-border mt-12 md:mt-20 py-8 md:py-12 bg-muted/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="space-y-4 md:space-y-6">
            <div className="text-center text-xs md:text-sm text-muted-foreground space-y-2">
              <motion.p 
                className="font-semibold text-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Made by Sreejith and Tejaswini
              </motion.p>
              <p>Design Patterns Explorer © 2025. Built with Next.js.</p>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 md:pt-6 border-t border-border">
              {[
                { label: 'Patterns', value: '23' },
                { label: 'Categories', value: '3' },
                { label: 'Examples', value: 'Interactive' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                  <div className="text-sm md:text-base font-semibold">{stat.value}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}
