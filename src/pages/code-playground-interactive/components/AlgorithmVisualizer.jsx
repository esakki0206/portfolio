import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const AlgorithmVisualizer = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubbleSort');
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [comparingIndices, setComparingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  const algorithms = [
    {
      id: 'bubbleSort',
      name: 'Bubble Sort',
      complexity: 'O(n²)',
      description: 'Compares adjacent elements and swaps them if they are in wrong order'
    },
    {
      id: 'quickSort',
      name: 'Quick Sort',
      complexity: 'O(n log n)',
      description: 'Divides array into partitions and sorts them recursively'
    },
    {
      id: 'mergeSort',
      name: 'Merge Sort',
      complexity: 'O(n log n)',
      description: 'Divides array into halves and merges them in sorted order'
    },
    {
      id: 'binarySearch',
      name: 'Binary Search',
      complexity: 'O(log n)',
      description: 'Searches for target value by repeatedly dividing search interval'
    }
  ];

  const generateRandomArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) + 10);
    setArray(newArray);
    setCurrentStep(0);
    setComparingIndices([]);
    setSortedIndices([]);
  };

  const bubbleSortStep = (arr, step) => {
    const n = arr?.length;
    const totalSteps = (n * (n - 1)) / 2;
    
    if (step >= totalSteps) {
      setSortedIndices(Array.from({ length: n }, (_, i) => i));
      return arr;
    }

    let currentI = 0;
    let currentJ = 1;
    let stepCount = 0;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (stepCount === step) {
          currentI = j;
          currentJ = j + 1;
          setComparingIndices([j, j + 1]);
          
          if (arr?.[j] > arr?.[j + 1]) {
            [arr[j], arr[j + 1]] = [arr?.[j + 1], arr?.[j]];
          }
          return arr;
        }
        stepCount++;
      }
    }
    
    return arr;
  };

  const runAlgorithm = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setCurrentStep(0);
    setComparingIndices([]);
    setSortedIndices([]);

    if (selectedAlgorithm === 'bubbleSort') {
      const steps = (array?.length * (array?.length - 1)) / 2;
      
      for (let step = 0; step <= steps; step++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setCurrentStep(step);
        const newArray = [...array];
        const sortedArray = bubbleSortStep(newArray, step);
        setArray(sortedArray);
      }
    }

    setIsRunning(false);
    setComparingIndices([]);
  };

  const resetVisualization = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setComparingIndices([]);
    setSortedIndices([]);
    generateRandomArray();
  };

  const getBarColor = (index) => {
    if (sortedIndices?.includes(index)) return 'bg-success';
    if (comparingIndices?.includes(index)) return 'bg-accent';
    return 'bg-muted';
  };

  const maxValue = Math.max(...array);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">Algorithm Visualizer</h3>
          <p className="text-sm text-muted-foreground">Watch sorting algorithms in action</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={generateRandomArray}
            disabled={isRunning}
            iconName="Shuffle"
            iconPosition="left"
          >
            New Array
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={runAlgorithm}
            disabled={isRunning}
            loading={isRunning}
            iconName="Play"
            iconPosition="left"
            className="neon-glow-hover"
          >
            {isRunning ? 'Running...' : 'Start'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetVisualization}
            disabled={isRunning}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset
          </Button>
        </div>
      </div>
      {/* Algorithm Selection */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {algorithms?.map((algo) => (
            <button
              key={algo?.id}
              onClick={() => setSelectedAlgorithm(algo?.id)}
              disabled={isRunning}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedAlgorithm === algo?.id
                  ? 'bg-accent text-background' :'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {algo?.name}
            </button>
          ))}
        </div>
        
        {/* Algorithm Info */}
        <div className="mt-4 p-4 bg-muted/20 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-foreground">
              {algorithms?.find(a => a?.id === selectedAlgorithm)?.name}
            </h4>
            <span className="px-2 py-1 bg-accent/20 text-accent text-xs font-mono rounded">
              {algorithms?.find(a => a?.id === selectedAlgorithm)?.complexity}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {algorithms?.find(a => a?.id === selectedAlgorithm)?.description}
          </p>
        </div>
      </div>
      {/* Visualization Area */}
      <div className="bg-background/50 rounded-lg p-6 border border-border">
        <div className="flex items-end justify-center space-x-2 h-64 mb-4">
          {array?.map((value, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2"
            >
              <div
                className={`w-8 transition-all duration-300 rounded-t ${getBarColor(index)} ${
                  comparingIndices?.includes(index) ? 'scale-110 shadow-lg' : ''
                }`}
                style={{
                  height: `${(value / maxValue) * 200}px`,
                  minHeight: '20px'
                }}
              />
              <span className="text-xs text-muted-foreground font-mono">{value}</span>
            </div>
          ))}
        </div>

        {/* Status */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-muted rounded"></div>
              <span className="text-muted-foreground">Unsorted</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded"></div>
              <span className="text-muted-foreground">Comparing</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded"></div>
              <span className="text-muted-foreground">Sorted</span>
            </div>
          </div>
          <div className="text-muted-foreground">
            Step: {currentStep} | Array Size: {array?.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;