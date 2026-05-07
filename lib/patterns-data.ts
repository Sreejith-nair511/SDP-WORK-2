export interface CodeExample {
  language: string;
  code: string;
}

export interface DesignPattern {
  id: string;
  name: string;
  category: 'creational' | 'structural' | 'behavioral';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  analogy: string;
  problem: string;
  solution: string;
  useCases: string[];
  codeExamples: CodeExample[];
  relatedPatterns: string[];
  pros: string[];
  cons: string[];
  realWorldExample?: string;
}

export const designPatterns: DesignPattern[] = [
  // Creational Patterns
  {
    id: 'singleton',
    name: 'Singleton',
    category: 'creational',
    difficulty: 'beginner',
    description: 'Ensures a class has only one instance and provides a global point of access to it.',
    analogy: 'Like a country having only one president. No matter how you access the government, there is only one person in charge.',
    problem: 'You need exactly one object of a class, but the class can be instantiated multiple times.',
    solution: 'Control the instantiation of a class by making the constructor private and providing a static method to get the single instance.',
    useCases: [
      'Database connection pools',
      'Logging systems',
      'Configuration managers',
      'Thread pools',
    ],
    codeExamples: [
      {
        language: 'javascript',
        code: `class Singleton {
  static instance;
  
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }
  
  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

const obj1 = Singleton.getInstance();
const obj2 = Singleton.getInstance();
console.log(obj1 === obj2); // true`,
      },
    ],
    relatedPatterns: ['factory-method', 'lazy-initialization'],
    pros: [
      'Guaranteed single instance',
      'Lazy initialization possible',
      'Global access point',
    ],
    cons: [
      'Hidden dependencies',
      'Harder to unit test',
      'Violates single responsibility',
    ],
    realWorldExample: 'The JavaScript window object is a singleton in browsers.',
  },
  {
    id: 'factory-method',
    name: 'Factory Method',
    category: 'creational',
    difficulty: 'beginner',
    description: 'Creates objects without specifying the exact classes of objects that will be created.',
    analogy: 'Like a restaurant menu. You request a burger, and the chef decides whether to make a beef or veggie burger based on availability.',
    problem: 'Creating objects directly couples your code to specific classes.',
    solution: 'Define an interface for creating objects but let subclasses decide which class to instantiate.',
    useCases: [
      'UI element creation',
      'Database driver selection',
      'File format handlers',
      'Transport layer abstraction',
    ],
    codeExamples: [
      {
        language: 'javascript',
        code: `class Creator {
  createProduct() {
    throw new Error('Must be implemented');
  }
}

class ConcreteCreatorA extends Creator {
  createProduct() {
    return new ConcreteProductA();
  }
}

class ConcreteCreatorB extends Creator {
  createProduct() {
    return new ConcreteProductB();
  }
}

class ConcreteProductA {
  operation() {
    return 'Result of Product A';
  }
}

class ConcreteProductB {
  operation() {
    return 'Result of Product B';
  }
}`,
      },
    ],
    relatedPatterns: ['abstract-factory', 'template-method'],
    pros: ['Decoupling creation logic', 'Single Responsibility Principle', 'Open/Closed Principle'],
    cons: ['More classes needed', 'Added complexity'],
  },
  {
    id: 'abstract-factory',
    name: 'Abstract Factory',
    category: 'creational',
    difficulty: 'advanced',
    description:
      'Provides an interface for creating families of related or dependent objects without specifying their concrete classes.',
    analogy: 'Like a furniture store that has different collections (modern, classic) where each collection has chairs, tables, and sofas that match.',
    problem: 'You need to create related object families but ensure consistency across them.',
    solution: 'Define families of products and factories that create them, using an abstract interface.',
    useCases: [
      'Theme systems (light/dark mode)',
      'Cross-platform UI libraries',
      'Database abstraction layers',
      'Game asset loaders',
    ],
    codeExamples: [
      {
        language: 'javascript',
        code: `class AbstractFactory {
  createProductA() {
    throw new Error('Must be implemented');
  }
  
  createProductB() {
    throw new Error('Must be implemented');
  }
}

class ConcreteFactory1 extends AbstractFactory {
  createProductA() {
    return new ConcreteProductA1();
  }
  
  createProductB() {
    return new ConcreteProductB1();
  }
}

class ConcreteFactory2 extends AbstractFactory {
  createProductA() {
    return new ConcreteProductA2();
  }
  
  createProductB() {
    return new ConcreteProductB2();
  }
}`,
      },
    ],
    relatedPatterns: ['factory-method', 'prototype'],
    pros: ['Ensures consistency', 'Easy to switch families', 'Isolates client code'],
    cons: ['Complex to implement', 'Difficult to extend'],
  },
  {
    id: 'builder',
    name: 'Builder',
    category: 'creational',
    difficulty: 'intermediate',
    description:
      'Separates the construction of a complex object from its representation, allowing the same construction process to create different representations.',
    analogy: 'Like building a house step by step. Different builders can follow the same blueprint to build houses with different styles.',
    problem: 'Creating objects with many optional parameters or complex initialization.',
    solution: 'Use a builder object to construct the target object step by step.',
    useCases: ['SQL query builders', 'HTTP request builders', 'Configuration objects', 'UI component construction'],
    codeExamples: [
      {
        language: 'javascript',
        code: `class Car {
  constructor(builder) {
    this.engine = builder.engine;
    this.transmission = builder.transmission;
    this.color = builder.color;
    this.doors = builder.doors;
  }
}

class CarBuilder {
  setEngine(engine) {
    this.engine = engine;
    return this;
  }
  
  setTransmission(transmission) {
    this.transmission = transmission;
    return this;
  }
  
  setColor(color) {
    this.color = color;
    return this;
  }
  
  setDoors(doors) {
    this.doors = doors;
    return this;
  }
  
  build() {
    return new Car(this);
  }
}

const car = new CarBuilder()
  .setEngine('V8')
  .setTransmission('Automatic')
  .setColor('Red')
  .setDoors(4)
  .build();`,
      },
    ],
    relatedPatterns: ['composite', 'prototype'],
    pros: ['Cleaner code', 'Flexible construction', 'Immutability support'],
    cons: ['Increased memory usage', 'More code needed'],
  },
  {
    id: 'prototype',
    name: 'Prototype',
    category: 'creational',
    difficulty: 'intermediate',
    description:
      'Creates new objects by copying a prototype object rather than creating from scratch.',
    analogy: 'Like copying a template document. Instead of writing everything from scratch, you copy an existing document and modify it.',
    problem: 'Object creation is expensive or complex, and you need similar objects.',
    solution: 'Create objects by cloning a prototype rather than creating them from scratch.',
    useCases: [
      'Cloning objects',
      'Undo/redo functionality',
      'Game object spawning',
      'Configuration templates',
    ],
    codeExamples: [
      {
        language: 'javascript',
        code: `class Prototype {
  clone() {
    return Object.create(Object.getPrototypeOf(this));
  }
}

class ConcretePrototype extends Prototype {
  constructor(value) {
    super();
    this.value = value;
  }
  
  clone() {
    return Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this
    );
  }
}

const original = new ConcretePrototype('value');
const clone = original.clone();
clone.value = 'modified';
console.log(original.value); // 'value'
console.log(clone.value); // 'modified'`,
      },
    ],
    relatedPatterns: ['builder', 'abstract-factory'],
    pros: ['Efficient object creation', 'Runtime polymorphism', 'Reduces subclassing'],
    cons: ['Shallow vs deep copy issues', 'Clone method complexity'],
  },
  {
    id: 'object-pool',
    name: 'Object Pool',
    category: 'creational',
    difficulty: 'intermediate',
    description:
      'Reuses objects that are expensive to create by keeping them in a pool.',
    analogy: 'Like a car rental company that maintains a fleet of cars. Instead of building new cars for each customer, they reuse existing ones.',
    problem: 'Creating and destroying objects frequently is expensive.',
    solution: 'Maintain a pool of reusable objects and acquire/release them as needed.',
    useCases: [
      'Database connection pooling',
      'Thread pools',
      'Game object pooling (bullets, particles)',
      'Memory optimization',
    ],
    codeExamples: [
      {
        language: 'javascript',
        code: `class ObjectPool {
  constructor(objectType, initialSize = 10) {
    this.objectType = objectType;
    this.available = [];
    this.inUse = new Set();
    
    for (let i = 0; i < initialSize; i++) {
      this.available.push(new objectType());
    }
  }
  
  acquire() {
    let obj;
    if (this.available.length > 0) {
      obj = this.available.pop();
    } else {
      obj = new this.objectType();
    }
    this.inUse.add(obj);
    return obj;
  }
  
  release(obj) {
    if (this.inUse.has(obj)) {
      this.inUse.delete(obj);
      this.available.push(obj);
    }
  }
}`,
      },
    ],
    relatedPatterns: ['singleton', 'factory-method'],
    pros: ['Improved performance', 'Reduced memory allocation', 'Resource management'],
    cons: ['Memory overhead', 'Complex lifecycle', 'Synchronization issues'],
  },

  // Structural Patterns
  {
    id: 'adapter',
    name: 'Adapter',
    category: 'structural',
    difficulty: 'beginner',
    description:
      'Converts the interface of a class into another interface clients expect, allowing incompatible interfaces to work together.',
    analogy: 'Like a power adapter. Your device has a certain plug type, but the outlet is different. The adapter makes them compatible.',
    problem: 'You need to use a class with an incompatible interface.',
    solution: 'Create an adapter that converts the incompatible interface to a compatible one.',
    useCases: [
      'Integrating legacy code',
      'Third-party library integration',
      'Data format conversion',
      'Hardware interfaces',
    ],
    codeExamples: [
      {
        language: 'javascript',
        code: `class OldSystem {
  request() {
    return 'OldSystem request';
  }
}

class NewSystem {
  request() {
    throw new Error('Must be implemented');
  }
}

class Adapter extends NewSystem {
  constructor(oldSystem) {
    super();
    this.oldSystem = oldSystem;
  }
  
  request() {
    return 'Adapted: ' + this.oldSystem.request();
  }
}

const oldSystem = new OldSystem();
const adapter = new Adapter(oldSystem);
console.log(adapter.request()); // 'Adapted: OldSystem request'`,
      },
    ],
    relatedPatterns: ['bridge', 'facade'],
    pros: ['Enables code reuse', 'Increases compatibility', 'Single Responsibility'],
    cons: ['Added complexity', 'Performance overhead'],
  },
  {
    id: 'bridge',
    name: 'Bridge',
    category: 'structural',
    difficulty: 'advanced',
    description:
      'Decouples an abstraction from its implementation so the two can vary independently.',
    analogy: 'Like a bridge connecting two cities. You can upgrade roads in each city independently without affecting the bridge.',
    problem: 'You want to avoid permanent binding between abstraction and implementation.',
    solution: 'Define a bridge interface that separates the abstraction from the implementation.',
    useCases: [
      'Platform-independent applications',
      'Device driver abstraction',
      'Renderer abstraction',
      'Payment processor integration',
    ],
    codeExamples: [
      {
        language: 'javascript',
        code: `class Implementor {
  operationImpl() {
    throw new Error('Must be implemented');
  }
}

class ConcreteImplementorA extends Implementor {
  operationImpl() {
    return 'ConcreteImplementorA';
  }
}

class Abstraction {
  constructor(implementor) {
    this.implementor = implementor;
  }
  
  operation() {
    return this.implementor.operationImpl();
  }
}

const implA = new ConcreteImplementorA();
const abstraction = new Abstraction(implA);
console.log(abstraction.operation()); // 'ConcreteImplementorA'`,
      },
    ],
    relatedPatterns: ['adapter', 'abstract-factory'],
    pros: ['Abstraction-implementation separation', 'Flexible extension', 'Reduces class hierarchy'],
    cons: ['Added complexity', 'Harder to understand'],
  },
  {
    id: 'composite',
    name: 'Composite',
    category: 'structural',
    difficulty: 'intermediate',
    description:
      'Composes objects into tree structures to represent part-whole hierarchies, letting clients treat individual objects and compositions uniformly.',
    analogy: 'Like a folder structure. Folders can contain files or other folders, but you can operate on both the same way.',
    problem: 'You need to work with tree-like structures where nodes can be simple or composite.',
    solution: 'Create a common interface for both leaf and composite objects.',
    useCases: [
      'File system trees',
      'UI component hierarchies',
      'DOM trees',
      'Organization structures',
    ],
    codeExamples: [
      {
        language: 'javascript',
        code: `class Component {
  add(component) {
    throw new Error('Must be implemented');
  }
  
  remove(component) {
    throw new Error('Must be implemented');
  }
  
  getChild(index) {
    throw new Error('Must be implemented');
  }
  
  operation() {
    throw new Error('Must be implemented');
  }
}

class Leaf extends Component {
  operation() {
    return 'Leaf';
  }
}

class Composite extends Component {
  constructor() {
    super();
    this.children = [];
  }
  
  add(component) {
    this.children.push(component);
  }
  
  remove(component) {
    const index = this.children.indexOf(component);
    if (index > -1) this.children.splice(index, 1);
  }
  
  operation() {
    return this.children
      .map(child => child.operation())
      .join(', ');
  }
}`,
      },
    ],
    relatedPatterns: ['iterator', 'visitor'],
    pros: ['Simple to work with trees', 'Open/Closed Principle', 'Flexible composition'],
    cons: ['Type-safety issues', 'Overengineering for simple cases'],
  },
  {
    id: 'decorator',
    name: 'Decorator',
    category: 'structural',
    difficulty: 'intermediate',
    description:
      'Attaches additional responsibilities to an object dynamically, providing a flexible alternative to subclassing.',
    analogy: 'Like decorating a gift. You wrap the gift with paper and ribbon, but the gift inside remains unchanged.',
    problem: 'You want to add responsibilities to objects without modifying their code or using inheritance.',
    solution: 'Create decorator objects that wrap the original object and add functionality.',
    useCases: [
      'UI theming systems',
      'Logging/caching wrappers',
      'Feature toggles',
      'Stream decoration',
    ],
    codeExamples: [
      {
        language: 'javascript',
        code: `class Component {
  operation() {
    throw new Error('Must be implemented');
  }
}

class ConcreteComponent extends Component {
  operation() {
    return 'ConcreteComponent';
  }
}

class Decorator extends Component {
  constructor(component) {
    super();
    this.component = component;
  }
  
  operation() {
    return this.component.operation();
  }
}

class ConcreteDecoratorA extends Decorator {
  operation() {
    return 'DecoratorA(' + super.operation() + ')';
  }
}

const component = new ConcreteComponent();
const decoratedA = new ConcreteDecoratorA(component);
console.log(decoratedA.operation()); // 'DecoratorA(ConcreteComponent)'`,
      },
    ],
    relatedPatterns: ['strategy', 'component'],
    pros: ['Flexible responsibility assignment', 'Single Responsibility', 'Runtime configuration'],
    cons: ['Order dependency', 'Complex wrapper chains'],
  },
  {
    id: 'facade',
    name: 'Facade',
    category: 'structural',
    difficulty: 'beginner',
    description:
      'Provides a unified, simplified interface to a set of interfaces in a subsystem.',
    analogy: 'Like a car dashboard. It hides the complexity of the engine, transmission, and electrical systems behind simple controls.',
    problem: 'A subsystem is complex with many interdependent parts.',
    solution: 'Create a facade that provides a simple interface to the complex subsystem.',
    useCases: [
      'Library APIs',
      'Framework initialization',
      'System startup sequences',
      'Database access layers',
    ],
    codeExamples: [
      {
        language: 'javascript',
        code: `class SubsystemA {
  operationA() {
    return 'SubsystemA';
  }
}

class SubsystemB {
  operationB() {
    return 'SubsystemB';
  }
}

class Facade {
  constructor() {
    this.subsystemA = new SubsystemA();
    this.subsystemB = new SubsystemB();
  }
  
  operation() {
    const resultA = this.subsystemA.operationA();
    const resultB = this.subsystemB.operationB();
    return 'Facade: ' + resultA + ', ' + resultB;
  }
}

const facade = new Facade();
console.log(facade.operation());`,
      },
    ],
    relatedPatterns: ['adapter', 'bridge'],
    pros: ['Simplifies complex systems', 'Loose coupling', 'Clear separation of concerns'],
    cons: ['Facade becomes God object', 'Hidden complexity'],
  },
  {
    id: 'flyweight',
    name: 'Flyweight',
    category: 'structural',
    difficulty: 'advanced',
    description:
      'Uses sharing to support large numbers of fine-grained objects efficiently.',
    analogy: 'Like a text editor using one font object for multiple characters. The font is shared while each character maintains its unique position.',
    problem: 'Creating many similar objects consumes too much memory.',
    solution: 'Share common state among multiple objects to reduce memory usage.',
    useCases: [
      'Game particle systems',
      'Text rendering',
      'Caching systems',
      'Large data set visualization',
    ],
    codeExamples: [
      {
        language: 'javascript',
        code: `class Flyweight {
  constructor(sharedState) {
    this.sharedState = sharedState;
  }
  
  operation(uniqueState) {
    const s = JSON.stringify(this.sharedState);
    const u = JSON.stringify(uniqueState);
    return \`Flyweight: \${s}, \${u}\`;
  }
}

class FlyweightFactory {
  constructor() {
    this.flyweights = {};
  }
  
  getFlyweight(sharedState) {
    const key = JSON.stringify(sharedState);
    if (!this.flyweights[key]) {
      this.flyweights[key] = new Flyweight(sharedState);
    }
    return this.flyweights[key];
  }
  
  getCount() {
    return Object.keys(this.flyweights).length;
  }
}`,
      },
    ],
    relatedPatterns: ['factory-method', 'singleton'],
    pros: ['Significant memory savings', 'Performance improvement', 'Sharing benefits'],
    cons: ['CPU overhead', 'Complex implementation', 'Thread safety'],
  },
  {
    id: 'proxy',
    name: 'Proxy',
    category: 'structural',
    difficulty: 'intermediate',
    description:
      'Provides a surrogate or placeholder for another object to control access to it.',
    analogy: 'Like a security guard at a building entrance. You don\'t enter directly; the guard checks credentials and controls your access.',
    problem: 'You need to control access to another object.',
    solution: 'Create a proxy that controls access to the real object.',
    useCases: [
      'Lazy loading',
      'Access control',
      'Logging/caching layer',
      'Remote object access',
    ],
    codeExamples: [
      {
        language: 'javascript',
        code: `class Subject {
  request() {
    throw new Error('Must be implemented');
  }
}

class RealSubject extends Subject {
  request() {
    return 'RealSubject: request';
  }
}

class Proxy extends Subject {
  constructor(realSubject) {
    super();
    this.realSubject = realSubject;
  }
  
  request() {
    if (this.checkAccess()) {
      return this.realSubject.request();
    }
    return 'Access Denied';
  }
  
  checkAccess() {
    return true;
  }
}

const realSubject = new RealSubject();
const proxy = new Proxy(realSubject);
console.log(proxy.request()); // 'RealSubject: request'`,
      },
    ],
    relatedPatterns: ['decorator', 'facade'],
    pros: ['Access control', 'Lazy initialization', 'Logging capabilities'],
    cons: ['Added latency', 'Code complexity'],
  },

  // Behavioral Patterns
  {
    id: 'chain-of-responsibility',
    name: 'Chain of Responsibility',
    category: 'behavioral',
    difficulty: 'intermediate',
    description:
      'Passes requests along a chain of handlers where each handler decides either to process the request or pass it along the chain.',
    analogy: 'Like a customer support ticket system. A basic agent handles simple issues; complex ones are passed to a supervisor.',
    problem: 'You have multiple objects that might handle a request.',
    solution: 'Create a chain of objects where each can handle the request or pass it along.',
    useCases: [
      'Event handling systems',
      'Logging levels',
      'Approval workflows',
      'Exception handling',
    ],
    codeExamples: [
      {
        language: 'javascript',
        code: `class Handler {
  setNext(handler) {
    this.next = handler;
    return handler;
  }
  
  handle(request) {
    throw new Error('Must be implemented');
  }
}

class ConcreteHandlerA extends Handler {
  handle(request) {
    if (request.type === 'A') {
      return 'HandlerA: ' + request.data;
    }
    return this.next ? this.next.handle(request) : null;
  }
}

class ConcreteHandlerB extends Handler {
  handle(request) {
    if (request.type === 'B') {
      return 'HandlerB: ' + request.data;
    }
    return this.next ? this.next.handle(request) : null;
  }
}

const handlerA = new ConcreteHandlerA();
const handlerB = new ConcreteHandlerB();
handlerA.setNext(handlerB);
console.log(handlerA.handle({type: 'B', data: 'test'}));`,
      },
    ],
    relatedPatterns: ['command', 'observer'],
    pros: ['Decouples sender and receiver', 'Dynamic chain building', 'Single Responsibility'],
    cons: ['No guarantee of handling', 'Debugging difficulty'],
  },
  {
    id: 'command',
    name: 'Command',
    category: 'behavioral',
    difficulty: 'intermediate',
    description:
      'Encapsulates a request as an object, allowing parameterization of clients with different requests, queuing of requests, and logging of requests.',
    analogy: 'Like writing instructions on a note. You can queue notes, undo actions, or log all instructions.',
    problem: 'You want to parameterize objects with operations.',
    solution: 'Encapsulate each request as an object.',
    useCases: [
      'Undo/redo functionality',
      'Task queuing',
      'Macro recording',
      'Remote control systems',
    ],
    codeExamples: [
      {
        language: 'javascript',
        code: `class Command {
  execute() {
    throw new Error('Must be implemented');
  }
}

class ConcreteCommand extends Command {
  constructor(receiver) {
    super();
    this.receiver = receiver;
  }
  
  execute() {
    this.receiver.action();
  }
}

class Receiver {
  action() {
    console.log('Receiver action');
  }
}

class Invoker {
  constructor() {
    this.commands = [];
  }
  
  storeCommand(command) {
    this.commands.push(command);
  }
  
  executeCommands() {
    this.commands.forEach(cmd => cmd.execute());
  }
}

const invoker = new Invoker();
const receiver = new Receiver();
invoker.storeCommand(new ConcreteCommand(receiver));
invoker.executeCommands();`,
      },
    ],
    relatedPatterns: ['memento', 'prototype'],
    pros: ['Decouples objects', 'Queuing support', 'Undo/redo capability'],
    cons: ['Class proliferation', 'Memory overhead'],
  },
  {
    id: 'iterator',
    name: 'Iterator',
    category: 'behavioral',
    difficulty: 'intermediate',
    description:
      'Provides a way to access the elements of an object sequentially without exposing its underlying representation.',
    analogy: 'Like a book cursor. You can move forward and backward through pages without knowing how pages are stored.',
    problem: 'You want to iterate over a collection without exposing its structure.',
    solution: 'Define an iterator interface for traversing collections.',
    useCases: [
      'Collection traversal',
      'Tree walking',
      'Custom loops',
      'Generator functions',
    ],
    codeExamples: [
      {
        language: 'javascript',
        code: `class Iterator {
  [Symbol.iterator]() {
    return this;
  }
  
  next() {
    throw new Error('Must be implemented');
  }
}

class ConcreteIterator extends Iterator {
  constructor(collection) {
    super();
    this.collection = collection;
    this.index = 0;
  }
  
  next() {
    if (this.index < this.collection.length) {
      return {
        value: this.collection[this.index++],
        done: false
      };
    }
    return { done: true };
  }
}

class Collection {
  constructor(items) {
    this.items = items;
  }
  
  [Symbol.iterator]() {
    return new ConcreteIterator(this.items);
  }
}

const collection = new Collection([1, 2, 3]);
for (const item of collection) {
  console.log(item);
}`,
      },
    ],
    relatedPatterns: ['composite', 'visitor'],
    pros: ['Encapsulation', 'Multiple iterations', 'Uniform interface'],
    cons: ['Overhead for simple collections', 'Implementation complexity'],
  },
  {
    id: 'mediator',
    name: 'Mediator',
    category: 'behavioral',
    difficulty: 'intermediate',
    description:
      'Defines an object that encapsulates how a set of objects interact.',
    analogy: 'Like an air traffic controller coordinating planes. Pilots don\'t communicate with each other; they communicate with the controller.',
    problem: 'Objects communicate in complex ways, creating tight coupling.',
    solution: 'Create a mediator to centralize communication logic.',
    useCases: [
      'Dialog box components',
      'Chat room systems',
      'Game event coordination',
      'UI framework event handling',
    ],
    codeExamples: [
      {
        language: 'javascript',
        code: `class Mediator {
  notify(sender, event) {
    throw new Error('Must be implemented');
  }
}

class Colleague {
  constructor(mediator) {
    this.mediator = mediator;
  }
}

class ConcreteColleagueA extends Colleague {
  doA() {
    this.mediator.notify(this, 'eventA');
  }
}

class ConcreteColleagueB extends Colleague {
  doB() {
    this.mediator.notify(this, 'eventB');
  }
}

class ConcreteMediator extends Mediator {
  constructor(colleagueA, colleagueB) {
    super();
    this.colleagueA = colleagueA;
    this.colleagueB = colleagueB;
  }
  
  notify(sender, event) {
    if (event === 'eventA') {
      console.log('Mediator reacts on eventA');
    }
  }
}`,
      },
    ],
    relatedPatterns: ['observer', 'facade'],
    pros: ['Decentralized control', 'Reusable colleagues', 'Centralized logic'],
    cons: ['Mediator becomes complex', 'Single point of failure'],
  },
  {
    id: 'memento',
    name: 'Memento',
    category: 'behavioral',
    difficulty: 'advanced',
    description:
      'Captures and externalizes an object\'s internal state without violating encapsulation.',
    analogy: 'Like taking a snapshot of an object\'s state that you can restore later.',
    problem: 'You need to capture and restore an object\'s state.',
    solution: 'Create a memento object that stores the object\'s state.',
    useCases: [
      'Undo/redo functionality',
      'Save game states',
      'Transaction rollback',
      'Checkpoint systems',
    ],
    codeExamples: [
      {
        language: 'javascript',
        code: `class Memento {
  constructor(state) {
    this.state = state;
  }
  
  getState() {
    return this.state;
  }
}

class Originator {
  constructor(state) {
    this.state = state;
  }
  
  setState(state) {
    this.state = state;
  }
  
  createMemento() {
    return new Memento(this.state);
  }
  
  restoreMemento(memento) {
    this.state = memento.getState();
  }
}

class Caretaker {
  constructor() {
    this.mementos = [];
  }
  
  saveState(originator) {
    this.mementos.push(originator.createMemento());
  }
  
  undoState(originator) {
    if (this.mementos.length > 0) {
      originator.restoreMemento(this.mementos.pop());
    }
  }
}`,
      },
    ],
    relatedPatterns: ['command', 'prototype'],
    pros: ['Encapsulation preserved', 'Undo/redo support', 'State snapshot'],
    cons: ['Memory overhead', 'Complex implementation'],
  },
  {
    id: 'observer',
    name: 'Observer',
    category: 'behavioral',
    difficulty: 'beginner',
    description:
      'Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified automatically.',
    analogy: 'Like a newspaper subscription. When a new issue is published, all subscribers are notified.',
    problem: 'Multiple objects need to react to changes in another object.',
    solution: 'Create an observer interface and notify observers of state changes.',
    useCases: [
      'Event systems',
      'Model-view architectures',
      'Real-time data updates',
      'Reactive programming',
    ],
    codeExamples: [
      {
        language: 'javascript',
        code: `class Subject {
  constructor() {
    this.observers = [];
  }
  
  attach(observer) {
    this.observers.push(observer);
  }
  
  detach(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }
  
  notify() {
    this.observers.forEach(observer => observer.update(this));
  }
}

class Observer {
  update(subject) {
    throw new Error('Must be implemented');
  }
}

class ConcreteObserver extends Observer {
  update(subject) {
    console.log('Observer: Subject updated');
  }
}

const subject = new Subject();
const observer = new ConcreteObserver();
subject.attach(observer);
subject.notify();`,
      },
    ],
    relatedPatterns: ['mediator', 'decorator'],
    pros: ['Loose coupling', 'Dynamic relationships', 'Broadcast communication'],
    cons: ['Unexpected updates', 'Memory leaks possible'],
  },
  {
    id: 'state',
    name: 'State',
    category: 'behavioral',
    difficulty: 'intermediate',
    description:
      'Allows an object to alter its behavior when its internal state changes, appearing to change its class.',
    analogy: 'Like a traffic light changing behavior: red light stops traffic, green light allows traffic.',
    problem: 'An object\'s behavior depends on its state and must change at runtime.',
    solution: 'Create state classes that encapsulate different behaviors.',
    useCases: [
      'State machines',
      'UI state management',
      'Game character states',
      'Protocol implementations',
    ],
    codeExamples: [
      {
        language: 'javascript',
        code: `class State {
  handle(context) {
    throw new Error('Must be implemented');
  }
}

class ConcreteStateA extends State {
  handle(context) {
    context.setState(new ConcreteStateB());
  }
}

class ConcreteStateB extends State {
  handle(context) {
    context.setState(new ConcreteStateA());
  }
}

class Context {
  constructor(state) {
    this.state = state;
  }
  
  setState(state) {
    this.state = state;
  }
  
  request() {
    this.state.handle(this);
  }
}

const context = new Context(new ConcreteStateA());
context.request(); // Switches to StateB`,
      },
    ],
    relatedPatterns: ['strategy', 'template-method'],
    pros: ['State-specific logic', 'Easy state transitions', 'Single Responsibility'],
    cons: ['Class proliferation', 'Complexity for simple cases'],
  },
  {
    id: 'strategy',
    name: 'Strategy',
    category: 'behavioral',
    difficulty: 'beginner',
    description:
      'Defines a family of algorithms, encapsulates each one, and makes them interchangeable.',
    analogy: 'Like choosing a payment method: credit card, debit card, or cash. All work but are implemented differently.',
    problem: 'You want to use different algorithms interchangeably.',
    solution: 'Define a strategy interface and create concrete strategy classes.',
    useCases: [
      'Sorting algorithms',
      'Payment processing',
      'Search algorithms',
      'Compression methods',
    ],
    codeExamples: [
      {
        language: 'javascript',
        code: `class Strategy {
  execute() {
    throw new Error('Must be implemented');
  }
}

class ConcreteStrategyA extends Strategy {
  execute() {
    return 'Strategy A';
  }
}

class ConcreteStrategyB extends Strategy {
  execute() {
    return 'Strategy B';
  }
}

class Context {
  constructor(strategy) {
    this.strategy = strategy;
  }
  
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  
  executeStrategy() {
    return this.strategy.execute();
  }
}

const context = new Context(new ConcreteStrategyA());
console.log(context.executeStrategy()); // 'Strategy A'
context.setStrategy(new ConcreteStrategyB());
console.log(context.executeStrategy()); // 'Strategy B'`,
      },
    ],
    relatedPatterns: ['state', 'decorator'],
    pros: ['Algorithm encapsulation', 'Runtime switching', 'Eliminates conditionals'],
    cons: ['Many strategy classes', 'Overhead for simple cases'],
  },
  {
    id: 'template-method',
    name: 'Template Method',
    category: 'behavioral',
    difficulty: 'intermediate',
    description:
      'Defines the skeleton of an algorithm in a base class but lets subclasses override specific steps.',
    analogy: 'Like a recipe template. The main steps are fixed, but you can customize ingredients.',
    problem: 'You have algorithms with similar structure but different details.',
    solution: 'Define the algorithm structure in a template method with abstract steps.',
    useCases: [
      'Framework architectures',
      'Data processing pipelines',
      'UI rendering',
      'Test fixtures',
    ],
    codeExamples: [
      {
        language: 'javascript',
        code: `class AbstractClass {
  templateMethod() {
    this.step1();
    this.step2();
    this.step3();
  }
  
  step1() {
    throw new Error('Must be implemented');
  }
  
  step2() {
    throw new Error('Must be implemented');
  }
  
  step3() {
    throw new Error('Must be implemented');
  }
}

class ConcreteClassA extends AbstractClass {
  step1() {
    console.log('ConcreteClassA step1');
  }
  
  step2() {
    console.log('ConcreteClassA step2');
  }
  
  step3() {
    console.log('ConcreteClassA step3');
  }
}

const obj = new ConcreteClassA();
obj.templateMethod();`,
      },
    ],
    relatedPatterns: ['strategy', 'state'],
    pros: ['Code reuse', 'Inversion of control', 'Consistent structure'],
    cons: ['Rigid structure', 'Inheritance required'],
  },
  {
    id: 'visitor',
    name: 'Visitor',
    category: 'behavioral',
    difficulty: 'advanced',
    description:
      'Represents an operation to be performed on the elements of an object structure.',
    analogy: 'Like a visitor who knows what to do in different rooms of a house.',
    problem: 'You want to perform operations on complex object structures without changing their classes.',
    solution: 'Define a visitor interface that visits different element types.',
    useCases: [
      'Compiler design',
      'Report generation',
      'File system traversal',
      'Serialization',
    ],
    codeExamples: [
      {
        language: 'javascript',
        code: `class Visitor {
  visitConcreteElementA(element) {
    throw new Error('Must be implemented');
  }
  
  visitConcreteElementB(element) {
    throw new Error('Must be implemented');
  }
}

class ConcreteVisitor extends Visitor {
  visitConcreteElementA(element) {
    return 'Visitor visiting ElementA';
  }
  
  visitConcreteElementB(element) {
    return 'Visitor visiting ElementB';
  }
}

class Element {
  accept(visitor) {
    throw new Error('Must be implemented');
  }
}

class ConcreteElementA extends Element {
  accept(visitor) {
    return visitor.visitConcreteElementA(this);
  }
}

class ConcreteElementB extends Element {
  accept(visitor) {
    return visitor.visitConcreteElementB(this);
  }
}`,
      },
    ],
    relatedPatterns: ['composite', 'iterator'],
    pros: ['Easy to add operations', 'Separates concerns', 'Double dispatch'],
    cons: ['Difficult to add elements', 'Complexity', 'Visitor explosion'],
  },
];
