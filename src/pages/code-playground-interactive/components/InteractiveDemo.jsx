import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InteractiveDemo = () => {
  const [selectedDemo, setSelectedDemo] = useState('pathfinding');
  const [isRunning, setIsRunning] = useState(false);
  const [gridSize] = useState(15);
  const [grid, setGrid] = useState([]);
  const [startPoint, setStartPoint] = useState({ x: 1, y: 1 });
  const [endPoint, setEndPoint] = useState({ x: 13, y: 13 });
  const [walls, setWalls] = useState(new Set());
  const [path, setPath] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState(new Set());
  const [mlAccuracy, setMlAccuracy] = useState(0);
  const [mlEpoch, setMlEpoch] = useState(0);
  const [apiData, setApiData] = useState(null);

  const demos = [
    {
      id: 'pathfinding',
      name: 'A* Pathfinding',
      description: 'Visualize pathfinding algorithms in a grid maze',
      icon: 'Navigation'
    },
    {
      id: 'ml-training',
      name: 'ML Model Training',
      description: 'Watch a neural network learn in real-time',
      icon: 'Brain'
    },
    {
      id: 'api-integration',
      name: 'Live API Data',
      description: 'Real-time data visualization from APIs',
      icon: 'Wifi'
    }
  ];

  // Initialize grid
  useEffect(() => {
    const newGrid = [];
    for (let y = 0; y < gridSize; y++) {
      const row = [];
      for (let x = 0; x < gridSize; x++) {
        row?.push({
          x,
          y,
          isWall: false,
          isStart: x === startPoint?.x && y === startPoint?.y,
          isEnd: x === endPoint?.x && y === endPoint?.y,
          isPath: false,
          isVisited: false
        });
      }
      newGrid?.push(row);
    }
    setGrid(newGrid);
  }, [gridSize, startPoint, endPoint]);

  // A* Pathfinding Algorithm (simplified)
  const runPathfinding = async () => {
    setIsRunning(true);
    setPath([]);
    setVisitedNodes(new Set());

    // Simple pathfinding simulation
    const visited = new Set();
    const queue = [startPoint];
    const parent = new Map();
    
    while (queue?.length > 0 && !visited?.has(`${endPoint?.x},${endPoint?.y}`)) {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const current = queue?.shift();
      const key = `${current?.x},${current?.y}`;
      
      if (visited?.has(key)) continue;
      visited?.add(key);
      setVisitedNodes(new Set(visited));

      if (current?.x === endPoint?.x && current?.y === endPoint?.y) {
        // Reconstruct path
        const pathNodes = [];
        let node = current;
        while (node) {
          pathNodes?.unshift(node);
          node = parent?.get(`${node?.x},${node?.y}`);
        }
        setPath(pathNodes);
        break;
      }

      // Add neighbors
      const neighbors = [
        { x: current?.x + 1, y: current?.y },
        { x: current?.x - 1, y: current?.y },
        { x: current?.x, y: current?.y + 1 },
        { x: current?.x, y: current?.y - 1 }
      ];

      for (const neighbor of neighbors) {
        const neighborKey = `${neighbor?.x},${neighbor?.y}`;
        if (
          neighbor?.x >= 0 && neighbor?.x < gridSize &&
          neighbor?.y >= 0 && neighbor?.y < gridSize &&
          !walls?.has(neighborKey) &&
          !visited?.has(neighborKey)
        ) {
          parent?.set(neighborKey, current);
          queue?.push(neighbor);
        }
      }
    }

    setIsRunning(false);
  };

  // ML Training Simulation
  const runMLTraining = async () => {
    setIsRunning(true);
    setMlAccuracy(0);
    setMlEpoch(0);

    for (let epoch = 1; epoch <= 100; epoch++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Simulate accuracy improvement with some randomness
      const baseAccuracy = Math.min(95, 20 + (epoch * 0.8));
      const randomVariation = (Math.random() - 0.5) * 10;
      const accuracy = Math.max(0, Math.min(100, baseAccuracy + randomVariation));
      
      setMlAccuracy(accuracy);
      setMlEpoch(epoch);
    }

    setIsRunning(false);
  };

  // API Data Simulation
  const fetchApiData = async () => {
    setIsRunning(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockData = {
      timestamp: new Date()?.toISOString(),
      users: Math.floor(Math.random() * 1000) + 500,
      revenue: (Math.random() * 50000 + 10000)?.toFixed(2),
      orders: Math.floor(Math.random() * 200) + 50,
      conversion: (Math.random() * 5 + 2)?.toFixed(2),
      countries: ['USA', 'UK', 'Germany', 'France', 'Japan'],
      metrics: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100))
    };
    
    setApiData(mockData);
    setIsRunning(false);
  };

  const toggleWall = (x, y) => {
    const key = `${x},${y}`;
    const newWalls = new Set(walls);
    
    if (newWalls?.has(key)) {
      newWalls?.delete(key);
    } else {
      newWalls?.add(key);
    }
    
    setWalls(newWalls);
  };

  const clearGrid = () => {
    setWalls(new Set());
    setPath([]);
    setVisitedNodes(new Set());
  };

  const getCellClass = (x, y) => {
    const key = `${x},${y}`;
    
    if (x === startPoint?.x && y === startPoint?.y) return 'bg-success';
    if (x === endPoint?.x && y === endPoint?.y) return 'bg-error';
    if (walls?.has(key)) return 'bg-foreground';
    if (path?.some(p => p?.x === x && p?.y === y)) return 'bg-accent';
    if (visitedNodes?.has(key)) return 'bg-warning/50';
    
    return 'bg-muted/20 hover:bg-muted/40';
  };

  const renderPathfindingDemo = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground">A* Pathfinding Visualization</h4>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={clearGrid}
            iconName="Eraser"
            iconPosition="left"
          >
            Clear
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={runPathfinding}
            disabled={isRunning}
            loading={isRunning}
            iconName="Play"
            iconPosition="left"
            className="neon-glow-hover"
          >
            Find Path
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-15 gap-1 p-4 bg-background/50 rounded-lg border border-border max-w-md mx-auto">
        {grid?.map((row, y) =>
          row?.map((cell, x) => (
            <button
              key={`${x}-${y}`}
              onClick={() => toggleWall(x, y)}
              disabled={isRunning}
              className={`w-4 h-4 border border-border/20 transition-colors duration-200 ${getCellClass(x, y)}`}
            />
          ))
        )}
      </div>

      <div className="flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded"></div>
          <span className="text-muted-foreground">Start</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-error rounded"></div>
          <span className="text-muted-foreground">End</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-foreground rounded"></div>
          <span className="text-muted-foreground">Wall</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-accent rounded"></div>
          <span className="text-muted-foreground">Path</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-warning/50 rounded"></div>
          <span className="text-muted-foreground">Visited</span>
        </div>
      </div>
    </div>
  );

  const renderMLDemo = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground">Neural Network Training</h4>
        <Button
          variant="default"
          size="sm"
          onClick={runMLTraining}
          disabled={isRunning}
          loading={isRunning}
          iconName="Play"
          iconPosition="left"
          className="neon-glow-hover"
        >
          Start Training
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 bg-background/50 rounded-lg border border-border">
            <h5 className="font-medium text-foreground mb-3">Training Progress</h5>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Accuracy</span>
                  <span className="text-foreground font-mono">{mlAccuracy?.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${mlAccuracy}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Epoch</span>
                  <span className="text-foreground font-mono">{mlEpoch}/100</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <div 
                    className="bg-success h-2 rounded-full transition-all duration-300"
                    style={{ width: `${mlEpoch}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted/20 rounded-lg text-center">
              <div className="text-lg font-bold text-foreground">{mlEpoch}</div>
              <div className="text-xs text-muted-foreground">Current Epoch</div>
            </div>
            <div className="p-3 bg-muted/20 rounded-lg text-center">
              <div className="text-lg font-bold text-accent">{mlAccuracy?.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-background/50 rounded-lg border border-border">
          <h5 className="font-medium text-foreground mb-3">Network Architecture</h5>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-muted/20 rounded">
              <span className="text-sm text-muted-foreground">Input Layer</span>
              <span className="text-sm font-mono text-foreground">784 neurons</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/20 rounded">
              <span className="text-sm text-muted-foreground">Hidden Layer 1</span>
              <span className="text-sm font-mono text-foreground">128 neurons</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/20 rounded">
              <span className="text-sm text-muted-foreground">Hidden Layer 2</span>
              <span className="text-sm font-mono text-foreground">64 neurons</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/20 rounded">
              <span className="text-sm text-muted-foreground">Output Layer</span>
              <span className="text-sm font-mono text-foreground">10 neurons</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAPIDemo = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground">Live API Data Integration</h4>
        <Button
          variant="default"
          size="sm"
          onClick={fetchApiData}
          disabled={isRunning}
          loading={isRunning}
          iconName="RefreshCw"
          iconPosition="left"
          className="neon-glow-hover"
        >
          Fetch Data
        </Button>
      </div>

      {apiData ? (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-background/50 rounded-lg border border-border text-center">
                <div className="text-2xl font-bold text-accent">{apiData?.users?.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="p-4 bg-background/50 rounded-lg border border-border text-center">
                <div className="text-2xl font-bold text-success">${apiData?.revenue}</div>
                <div className="text-sm text-muted-foreground">Revenue</div>
              </div>
              <div className="p-4 bg-background/50 rounded-lg border border-border text-center">
                <div className="text-2xl font-bold text-warning">{apiData?.orders}</div>
                <div className="text-sm text-muted-foreground">Orders</div>
              </div>
              <div className="p-4 bg-background/50 rounded-lg border border-border text-center">
                <div className="text-2xl font-bold text-error">{apiData?.conversion}%</div>
                <div className="text-sm text-muted-foreground">Conversion</div>
              </div>
            </div>

            <div className="p-4 bg-background/50 rounded-lg border border-border">
              <h5 className="font-medium text-foreground mb-3">Top Countries</h5>
              <div className="space-y-2">
                {apiData?.countries?.map((country, index) => (
                  <div key={country} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{country}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-muted/20 rounded-full h-2">
                        <div 
                          className="bg-accent h-2 rounded-full"
                          style={{ width: `${(5 - index) * 20}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">
                        {(5 - index) * 20}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-background/50 rounded-lg border border-border">
            <h5 className="font-medium text-foreground mb-3">Weekly Metrics</h5>
            <div className="flex items-end justify-between h-32 space-x-2">
              {apiData?.metrics?.map((value, index) => (
                <div key={index} className="flex flex-col items-center space-y-1">
                  <div
                    className="w-6 bg-accent rounded-t transition-all duration-300"
                    style={{ height: `${(value / 100) * 100}px`, minHeight: '4px' }}
                  ></div>
                  <span className="text-xs text-muted-foreground">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']?.[index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 bg-background/50 rounded-lg border border-border">
          <div className="text-center">
            <Icon name="Database" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">Click "Fetch Data" to load live API data</p>
          </div>
        </div>
      )}
    </div>
  );

  const renderDemo = () => {
    switch (selectedDemo) {
      case 'pathfinding':
        return renderPathfindingDemo();
      case 'ml-training':
        return renderMLDemo();
      case 'api-integration':
        return renderAPIDemo();
      default:
        return null;
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">Interactive Demonstrations</h3>
          <p className="text-sm text-muted-foreground">Real-time algorithm and system visualizations</p>
        </div>
      </div>
      {/* Demo Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {demos?.map((demo) => (
          <button
            key={demo?.id}
            onClick={() => setSelectedDemo(demo?.id)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedDemo === demo?.id
                ? 'bg-accent text-background' :'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Icon name={demo?.icon} size={16} />
            <div className="text-left">
              <div>{demo?.name}</div>
              <div className="text-xs opacity-80">{demo?.description}</div>
            </div>
          </button>
        ))}
      </div>
      {/* Demo Content */}
      <div className="bg-background/30 rounded-lg p-6 border border-border">
        {renderDemo()}
      </div>
    </div>
  );
};

export default InteractiveDemo;