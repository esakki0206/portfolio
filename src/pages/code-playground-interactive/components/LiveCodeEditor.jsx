import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveCodeEditor = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const languages = [
    {
      id: 'javascript',
      name: 'JavaScript',
      icon: 'Code2',
      defaultCode: `// JavaScript Example - Array Manipulation
const numbers = [1, 2, 3, 4, 5];

// Map to double each number
const doubled = numbers.map(n => n * 2);
console.log('Doubled:', doubled);

// Filter even numbers
const evens = numbers.filter(n => n % 2 === 0);
console.log('Even numbers:', evens);

// Reduce to sum
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log('Sum:', sum);

// Modern ES6+ features
const [first, ...rest] = numbers;
console.log('First:', first, 'Rest:', rest);`
    },
    {
      id: 'python',
      name: 'Python',
      icon: 'FileCode',
      defaultCode: `# Python Example - Data Analysis
import math

# List comprehension
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
squares = [n**2 for n in numbers if n % 2 == 0]
print(f"Even squares: {squares}")

# Dictionary operations
student_grades = {
    'Alice': [85, 92, 78],
    'Bob': [79, 85, 91],
    'Charlie': [92, 88, 96]
}

# Calculate averages
for name, grades in student_grades.items():
    avg = sum(grades) / len(grades)
    print(f"{name}: {avg:.1f}")

# Function with decorators
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(f"Fibonacci(8): {fibonacci(8)}")`
    },
    {
      id: 'react',
      name: 'React JSX',
      icon: 'Component',
      defaultCode: `// React Component Example
import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: true }
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false
      }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  return (
    <div className="todo-app">
      <h2>My Todo List</h2>
      <div>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;`
    },
    {
      id: 'sql',
      name: 'SQL',
      icon: 'Database',
      defaultCode: `-- SQL Example - Database Queries
-- Create sample tables
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    created_at TIMESTAMP
);

CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT,
    product VARCHAR(100),
    amount DECIMAL(10,2),
    order_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert sample data
INSERT INTO users VALUES 
(1, 'John Doe', 'john@email.com', '2024-01-15'),
(2, 'Jane Smith', 'jane@email.com', '2024-02-20'),
(3, 'Bob Johnson', 'bob@email.com', '2024-03-10');

INSERT INTO orders VALUES
(1, 1, 'Laptop', 999.99, '2024-08-01'),
(2, 1, 'Mouse', 29.99, '2024-08-05'),
(3, 2, 'Keyboard', 79.99, '2024-08-10'),
(4, 3, 'Monitor', 299.99, '2024-08-15');

-- Complex queries
SELECT 
    u.name,
    u.email,
    COUNT(o.id) as order_count,
    SUM(o.amount) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name, u.email
HAVING total_spent > 100
ORDER BY total_spent DESC;`
    }
  ];

  useEffect(() => {
    const defaultCode = languages?.find(lang => lang?.id === selectedLanguage)?.defaultCode || '';
    setCode(defaultCode);
    setOutput('');
  }, [selectedLanguage]);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running code...\n');

    // Simulate code execution
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock output based on language
    let mockOutput = '';
    
    switch (selectedLanguage) {
      case 'javascript':
        mockOutput = `Doubled: [2, 4, 6, 8, 10]
Even numbers: [2, 4]
Sum: 15
First: 1 Rest: [2, 3, 4, 5]

✅ Code executed successfully!
⏱️ Execution time: 0.023s`;
        break;
      case 'python':
        mockOutput = `Even squares: [4, 16, 36, 64, 100]
Alice: 85.0
Bob: 85.0
Charlie: 92.0
Fibonacci(8): 21

✅ Code executed successfully!
⏱️ Execution time: 0.045s`;
        break;
      case 'react':
        mockOutput = `✅ Component compiled successfully!
📦 Bundle size: 2.3KB
⚡ Hot reload enabled
🎯 No TypeScript errors
🔧 ESLint: 0 warnings

Component rendered in development mode.
Props validation: Passed
State management: Active`;
        break;
      case 'sql':
        mockOutput = `Query executed successfully!

Results:
+-------------+------------------+-------------+-------------+
| name        | email            | order_count | total_spent |
+-------------+------------------+-------------+-------------+
| John Doe    | john@email.com   | 2           | 1029.98     |
| Bob Johnson | bob@email.com    | 1           | 299.99      |
+-------------+------------------+-------------+-------------+

✅ 2 rows returned
⏱️ Query time: 0.012s`;
        break;
      default:
        mockOutput = '✅ Code executed successfully!';
    }

    setOutput(mockOutput);
    setIsRunning(false);
  };

  const clearOutput = () => {
    setOutput('');
  };

  const shareCode = () => {
    const shareData = {
      title: `Code Snippet - ${languages?.find(l => l?.id === selectedLanguage)?.name}`,
      text: 'Check out this code snippet from CodeSphere Playground!',
      url: window.location?.href
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard?.writeText(code);
      setOutput(prev => prev + '\n\n📋 Code copied to clipboard!');
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">Live Code Editor</h3>
          <p className="text-sm text-muted-foreground">Write, run, and share code snippets</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={shareCode}
            iconName="Share2"
            iconPosition="left"
          >
            Share
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={runCode}
            disabled={isRunning}
            loading={isRunning}
            iconName="Play"
            iconPosition="left"
            className="neon-glow-hover"
          >
            {isRunning ? 'Running...' : 'Run Code'}
          </Button>
        </div>
      </div>
      {/* Language Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {languages?.map((lang) => (
          <button
            key={lang?.id}
            onClick={() => setSelectedLanguage(lang?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedLanguage === lang?.id
                ? 'bg-accent text-background' :'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Icon name={lang?.icon} size={16} />
            <span>{lang?.name}</span>
          </button>
        ))}
      </div>
      {/* Editor Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Code Editor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Code Editor</h4>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-error rounded-full"></div>
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <div className="w-3 h-3 bg-success rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e?.target?.value)}
              className="w-full h-96 p-4 bg-background border border-border rounded-lg font-mono text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent custom-scrollbar"
              placeholder="Write your code here..."
              spellCheck={false}
            />
            
            {/* Line numbers */}
            <div className="absolute left-2 top-4 text-xs text-muted-foreground font-mono leading-5 pointer-events-none select-none">
              {code?.split('\n')?.map((_, index) => (
                <div key={index} className="h-5">
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Output Console */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Output Console</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearOutput}
              iconName="X"
              iconPosition="left"
            >
              Clear
            </Button>
          </div>
          
          <div className="bg-background border border-border rounded-lg p-4 h-96 overflow-y-auto custom-scrollbar">
            {output ? (
              <pre className="font-mono text-sm text-foreground whitespace-pre-wrap">
                {output}
              </pre>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <Icon name="Terminal" size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Click "Run Code" to see output</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Code Statistics */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-muted/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-foreground">{code?.split('\n')?.length}</div>
          <div className="text-xs text-muted-foreground">Lines</div>
        </div>
        <div className="bg-muted/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-foreground">{code?.length}</div>
          <div className="text-xs text-muted-foreground">Characters</div>
        </div>
        <div className="bg-muted/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-foreground">{code?.split(' ')?.filter(w => w?.length > 0)?.length}</div>
          <div className="text-xs text-muted-foreground">Words</div>
        </div>
        <div className="bg-muted/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-accent">{selectedLanguage?.toUpperCase()}</div>
          <div className="text-xs text-muted-foreground">Language</div>
        </div>
      </div>
    </div>
  );
};

export default LiveCodeEditor;