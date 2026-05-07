'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';

interface Observer {
  id: string;
  name: string;
  notified: boolean;
}

interface Notification {
  id: string;
  observer: string;
  message: string;
  timestamp: number;
}

export function ObserverDemo() {
  const [observers, setObservers] = useState<Observer[]>([
    { id: '1', name: 'Email Observer', notified: false },
    { id: '2', name: 'SMS Observer', notified: false },
    { id: '3', name: 'Webhook Observer', notified: false },
  ]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notifyObservers = () => {
    const newNotifications = observers.map((observer) => ({
      id: `${observer.id}-${Date.now()}`,
      observer: observer.name,
      message: `Notification received at ${new Date().toLocaleTimeString()}`,
      timestamp: Date.now(),
    }));

    setNotifications((prev) => [...newNotifications, ...prev.slice(0, 9)]);

    setObservers((prev) =>
      prev.map((obs) => ({
        ...obs,
        notified: true,
      }))
    );

    setTimeout(() => {
      setObservers((prev) =>
        prev.map((obs) => ({
          ...obs,
          notified: false,
        }))
      );
    }, 1000);
  };

  const reset = () => {
    setNotifications([]);
    setObservers((prev) =>
      prev.map((obs) => ({
        ...obs,
        notified: false,
      }))
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Observer Pattern Visualization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4">
            <Button onClick={notifyObservers} size="lg">
              Publish Event
            </Button>
            {notifications.length > 0 && (
              <Button onClick={reset} variant="outline" size="lg">
                Clear
              </Button>
            )}
          </div>

          {/* Subject and Observers */}
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-8">
              {/* Subject */}
              <motion.div
                className="p-6 rounded-lg border-2 border-primary bg-primary/5 w-48"
                animate={
                  notifications.length > 0 ? { scale: [1, 1.05, 1] } : { scale: 1 }
                }
                transition={{ duration: 0.5 }}
              >
                <div className="text-center">
                  <Bell className="w-8 h-8 mx-auto text-primary mb-2" />
                  <div className="font-semibold">Subject</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Event Publisher
                  </div>
                </div>
              </motion.div>

              {/* Connection Lines Animated */}
              {observers.length > 0 && (
                <motion.div
                  className="w-full h-8 relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-1 h-12 bg-gradient-to-b from-primary to-transparent absolute left-1/2 -bottom-4 transform -translate-x-1/2" />
                  </div>
                </motion.div>
              )}

              {/* Observers Grid */}
              <div className="grid md:grid-cols-3 gap-4 w-full">
                <AnimatePresence>
                  {observers.map((observer) => (
                    <motion.div
                      key={observer.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <motion.div
                        className={`p-4 rounded-lg border-2 text-center transition-colors ${
                          observer.notified
                            ? 'border-green-500 bg-green-50 dark:bg-green-950'
                            : 'border-border bg-card'
                        }`}
                        animate={
                          observer.notified
                            ? { scale: [1, 1.05, 1] }
                            : { scale: 1 }
                        }
                      >
                        <div className="font-semibold text-sm">{observer.name}</div>
                        <motion.div
                          className="text-xs text-muted-foreground mt-1"
                          animate={
                            observer.notified ? { opacity: [0, 1, 0] } : {}
                          }
                          transition={{ duration: 0.5 }}
                        >
                          {observer.notified ? '✓ Updated!' : 'Listening...'}
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Notifications Log */}
          {notifications.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <h4 className="font-semibold">Notification Log</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {notifications.map((notif) => (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3 rounded-lg border border-border bg-card text-sm"
                  >
                    <div className="font-mono text-xs">
                      <span className="text-green-600 dark:text-green-400">
                        {notif.observer}
                      </span>
                      {': '}
                      <span className="text-muted-foreground">{notif.message}</span>
                    </div>
                  </motion.div>
                ))}
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
              ✓ When you publish an event, all <strong>registered observers</strong>{' '}
              are automatically notified. No direct coupling between subject and
              observers!
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
