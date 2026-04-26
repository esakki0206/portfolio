import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DataStructurePlayground = () => {
  const [selectedStructure, setSelectedStructure] = useState('binaryTree');
  const [inputValue, setInputValue] = useState('');
  const [treeNodes, setTreeNodes] = useState([50, 30, 70, 20, 40, 60, 80]);
  const [stackItems, setStackItems] = useState(['First', 'Second', 'Third']);
  const [queueItems, setQueueItems] = useState(['A', 'B', 'C', 'D']);
  const [hashTable, setHashTable] = useState({
    'key1': 'value1',
    'key2': 'value2',
    'key3': 'value3'
  });

  const dataStructures = [
    {
      id: 'binaryTree',
      name: 'Binary Tree',
      description: 'Hierarchical data structure with nodes having at most two children',
      operations: ['Insert', 'Delete', 'Search', 'Traverse']
    },
    {
      id: 'stack',
      name: 'Stack (LIFO)',
      description: 'Last In, First Out data structure with push and pop operations',
      operations: ['Push', 'Pop', 'Peek', 'Clear']
    },
    {
      id: 'queue',
      name: 'Queue (FIFO)',
      description: 'First In, First Out data structure with enqueue and dequeue operations',
      operations: ['Enqueue', 'Dequeue', 'Front', 'Clear']
    },
    {
      id: 'hashTable',
      name: 'Hash Table',
      description: 'Key-value pairs with O(1) average time complexity for operations',
      operations: ['Insert', 'Delete', 'Search', 'Update']
    }
  ];

  const handleStackPush = () => {
    if (inputValue?.trim()) {
      setStackItems([...stackItems, inputValue?.trim()]);
      setInputValue('');
    }
  };

  const handleStackPop = () => {
    if (stackItems?.length > 0) {
      setStackItems(stackItems?.slice(0, -1));
    }
  };

  const handleQueueEnqueue = () => {
    if (inputValue?.trim()) {
      setQueueItems([...queueItems, inputValue?.trim()]);
      setInputValue('');
    }
  };

  const handleQueueDequeue = () => {
    if (queueItems?.length > 0) {
      setQueueItems(queueItems?.slice(1));
    }
  };

  const handleHashInsert = () => {
    if (inputValue?.trim()) {
      const [key, value] = inputValue?.split(':')?.map(s => s?.trim());
      if (key && value) {
        setHashTable({ ...hashTable, [key]: value });
        setInputValue('');
      }
    }
  };

  const handleHashDelete = (key) => {
    const newHashTable = { ...hashTable };
    delete newHashTable?.[key];
    setHashTable(newHashTable);
  };

  const renderBinaryTree = () => {
    const sortedNodes = [...treeNodes]?.sort((a, b) => a - b);
    
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-accent text-background rounded-full flex items-center justify-center font-bold text-sm">
            {sortedNodes?.[3] || 'Root'}
          </div>
        </div>
        <div className="flex justify-center space-x-16">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 bg-muted text-foreground rounded-full flex items-center justify-center text-sm">
              {sortedNodes?.[1] || 'L'}
            </div>
            <div className="flex space-x-8">
              <div className="w-8 h-8 bg-muted/50 text-muted-foreground rounded-full flex items-center justify-center text-xs">
                {sortedNodes?.[0] || 'LL'}
              </div>
              <div className="w-8 h-8 bg-muted/50 text-muted-foreground rounded-full flex items-center justify-center text-xs">
                {sortedNodes?.[2] || 'LR'}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 bg-muted text-foreground rounded-full flex items-center justify-center text-sm">
              {sortedNodes?.[5] || 'R'}
            </div>
            <div className="flex space-x-8">
              <div className="w-8 h-8 bg-muted/50 text-muted-foreground rounded-full flex items-center justify-center text-xs">
                {sortedNodes?.[4] || 'RL'}
              </div>
              <div className="w-8 h-8 bg-muted/50 text-muted-foreground rounded-full flex items-center justify-center text-xs">
                {sortedNodes?.[6] || 'RR'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStack = () => (
    <div className="flex flex-col items-center space-y-2">
      <div className="text-sm text-muted-foreground mb-2">Top ↓</div>
      {stackItems?.slice()?.reverse()?.map((item, index) => (
        <div
          key={index}
          className={`w-32 h-10 border-2 border-accent bg-accent/10 rounded flex items-center justify-center text-sm font-medium ${
            index === 0 ? 'bg-accent text-background' : 'text-foreground'
          }`}
        >
          {item}
        </div>
      ))}
      <div className="text-sm text-muted-foreground mt-2">Bottom</div>
    </div>
  );

  const renderQueue = () => (
    <div className="flex items-center space-x-2">
      <div className="text-sm text-muted-foreground">Front →</div>
      {queueItems?.map((item, index) => (
        <div
          key={index}
          className={`w-16 h-10 border-2 border-accent bg-accent/10 rounded flex items-center justify-center text-sm font-medium ${
            index === 0 ? 'bg-accent text-background' : 'text-foreground'
          }`}
        >
          {item}
        </div>
      ))}
      <div className="text-sm text-muted-foreground">← Rear</div>
    </div>
  );

  const renderHashTable = () => (
    <div className="grid grid-cols-2 gap-4 max-w-md">
      {Object.entries(hashTable)?.map(([key, value], index) => (
        <div key={index} className="flex items-center space-x-2">
          <div className="flex-1 p-3 bg-muted/20 rounded border border-border">
            <div className="text-xs text-muted-foreground">Key</div>
            <div className="font-medium text-foreground">{key}</div>
          </div>
          <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
          <div className="flex-1 p-3 bg-accent/10 rounded border border-accent/20">
            <div className="text-xs text-muted-foreground">Value</div>
            <div className="font-medium text-foreground">{value}</div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleHashDelete(key)}
            iconName="X"
            className="text-error hover:text-error"
          />
        </div>
      ))}
    </div>
  );

  const renderVisualization = () => {
    switch (selectedStructure) {
      case 'binaryTree':
        return renderBinaryTree();
      case 'stack':
        return renderStack();
      case 'queue':
        return renderQueue();
      case 'hashTable':
        return renderHashTable();
      default:
        return null;
    }
  };

  const renderControls = () => {
    const currentStructure = dataStructures?.find(ds => ds?.id === selectedStructure);
    
    return (
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder={
              selectedStructure === 'hashTable' ?'key:value' 
                : selectedStructure === 'binaryTree' ?'Enter number' :'Enter value'
            }
            value={inputValue}
            onChange={(e) => setInputValue(e?.target?.value)}
            className="flex-1"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedStructure === 'stack' && (
            <>
              <Button
                variant="default"
                size="sm"
                onClick={handleStackPush}
                iconName="Plus"
                iconPosition="left"
              >
                Push
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleStackPop}
                iconName="Minus"
                iconPosition="left"
              >
                Pop
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStackItems([])}
                iconName="Trash2"
                iconPosition="left"
              >
                Clear
              </Button>
            </>
          )}
          
          {selectedStructure === 'queue' && (
            <>
              <Button
                variant="default"
                size="sm"
                onClick={handleQueueEnqueue}
                iconName="Plus"
                iconPosition="left"
              >
                Enqueue
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleQueueDequeue}
                iconName="Minus"
                iconPosition="left"
              >
                Dequeue
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQueueItems([])}
                iconName="Trash2"
                iconPosition="left"
              >
                Clear
              </Button>
            </>
          )}
          
          {selectedStructure === 'hashTable' && (
            <>
              <Button
                variant="default"
                size="sm"
                onClick={handleHashInsert}
                iconName="Plus"
                iconPosition="left"
              >
                Insert
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setHashTable({})}
                iconName="Trash2"
                iconPosition="left"
              >
                Clear All
              </Button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">Data Structure Playground</h3>
          <p className="text-sm text-muted-foreground">Interactive data structure manipulation</p>
        </div>
      </div>
      {/* Structure Selection */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {dataStructures?.map((structure) => (
            <button
              key={structure?.id}
              onClick={() => setSelectedStructure(structure?.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedStructure === structure?.id
                  ? 'bg-accent text-background' :'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {structure?.name}
            </button>
          ))}
        </div>
        
        {/* Structure Info */}
        <div className="p-4 bg-muted/20 rounded-lg border border-border">
          <h4 className="font-semibold text-foreground mb-2">
            {dataStructures?.find(ds => ds?.id === selectedStructure)?.name}
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            {dataStructures?.find(ds => ds?.id === selectedStructure)?.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {dataStructures?.find(ds => ds?.id === selectedStructure)?.operations?.map((op, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-accent/20 text-accent text-xs font-medium rounded"
              >
                {op}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Visualization and Controls */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Visualization */}
        <div className="bg-background/50 rounded-lg p-6 border border-border min-h-[300px] flex items-center justify-center">
          {renderVisualization()}
        </div>
        
        {/* Controls */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Operations</h4>
          {renderControls()}
        </div>
      </div>
    </div>
  );
};

export default DataStructurePlayground;