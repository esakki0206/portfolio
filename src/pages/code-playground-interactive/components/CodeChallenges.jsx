import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CodeChallenges = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(0);
  const [userSolution, setUserSolution] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const challenges = [
    {
      id: 1,
      title: 'Two Sum Problem',
      difficulty: 'Easy',
      category: 'Array',
      description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.`,
      examples: [
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
        },
        {
          input: 'nums = [3,2,4], target = 6',
          output: '[1,2]',
          explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
        }
      ],
      constraints: [
        '2 ≤ nums.length ≤ 10⁴',
        '-10⁹ ≤ nums[i] ≤ 10⁹',
        '-10⁹ ≤ target ≤ 10⁹',
        'Only one valid answer exists.'
      ],
      starterCode: `function twoSum(nums, target) {
    // Your solution here
    
}`,
      hint: 'Try using a hash map to store the complement of each number as you iterate through the array.',
      solution: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    },
    {
      id: 2,
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      category: 'Stack',
      description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.`,
      examples: [
        {
          input: 's = "()"',
          output: 'true',
          explanation: 'The string contains valid parentheses.'
        },
        {
          input: 's = "()[]{}"',
          output: 'true',
          explanation: 'All brackets are properly matched.'
        },
        {
          input: 's = "(]"',
          output: 'false',
          explanation: 'Brackets are not properly matched.'
        }
      ],
      constraints: [
        '1 ≤ s.length ≤ 10⁴',
        's consists of parentheses only \'()[]{}\''
      ],
      starterCode: `function isValid(s) {
    // Your solution here
    
}`,
      hint: 'Use a stack data structure to keep track of opening brackets and match them with closing brackets.',
      solution: `function isValid(s) {
    const stack = [];
    const mapping = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (char in mapping) {
            const topElement = stack.length === 0 ? '#' : stack.pop();
            if (mapping[char] !== topElement) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    },
    {
      id: 3,
      title: 'Binary Tree Inorder Traversal',
      difficulty: 'Medium',
      category: 'Tree',
      description: `Given the root of a binary tree, return the inorder traversal of its nodes' values.\n\nInorder traversal visits nodes in the following order:\n1. Left subtree\n2. Root node\n3. Right subtree`,
      examples: [
        {
          input: 'root = [1,null,2,3]',
          output: '[1,3,2]',
          explanation: 'Inorder traversal: left -> root -> right'
        },
        {
          input: 'root = []',
          output: '[]',
          explanation: 'Empty tree returns empty array'
        }
      ],
      constraints: [
        'The number of nodes in the tree is in the range [0, 100]',
        '-100 ≤ Node.val ≤ 100'
      ],
      starterCode: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

function inorderTraversal(root) {
    // Your solution here
    
}`,
      hint: 'You can solve this recursively or iteratively using a stack. For recursion: traverse left, visit root, traverse right.',
      solution: `function inorderTraversal(root) {
    const result = [];
    
    function inorder(node) {
        if (node !== null) {
            inorder(node.left);
            result.push(node.val);
            inorder(node.right);
        }
    }
    
    inorder(root);
    return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    }
  ];

  useEffect(() => {
    setUserSolution(challenges?.[selectedChallenge]?.starterCode);
    setSubmissionResult(null);
    setShowHint(false);
  }, [selectedChallenge]);

  const submitSolution = async () => {
    setIsSubmitting(true);
    
    // Simulate submission processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock test results
    const mockResults = {
      passed: Math.random() > 0.3, // 70% pass rate
      testsPassed: Math.floor(Math.random() * 10) + 8,
      totalTests: 15,
      runtime: Math.floor(Math.random() * 50) + 20,
      memory: Math.floor(Math.random() * 10) + 35,
      feedback: Math.random() > 0.5 
        ? 'Great solution! Your approach is efficient and handles edge cases well.' :'Good attempt! Consider optimizing for better time complexity.'
    };
    
    setSubmissionResult(mockResults);
    setIsSubmitting(false);
  };

  const resetCode = () => {
    setUserSolution(challenges?.[selectedChallenge]?.starterCode);
    setSubmissionResult(null);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-success';
      case 'medium': return 'text-warning';
      case 'hard': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const currentChallenge = challenges?.[selectedChallenge];

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">Code Challenges</h3>
          <p className="text-sm text-muted-foreground">Solve algorithmic problems step by step</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHint(!showHint)}
            iconName="Lightbulb"
            iconPosition="left"
          >
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetCode}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset
          </Button>
        </div>
      </div>
      {/* Challenge Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {challenges?.map((challenge, index) => (
          <button
            key={challenge?.id}
            onClick={() => setSelectedChallenge(index)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedChallenge === index
                ? 'bg-accent text-background' :'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${getDifficultyColor(challenge?.difficulty)}`}></span>
            <span>{challenge?.title}</span>
          </button>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Problem Description */}
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-foreground">{currentChallenge?.title}</h4>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(currentChallenge?.difficulty)}`}>
                  {currentChallenge?.difficulty}
                </span>
                <span className="px-2 py-1 bg-muted/20 text-muted-foreground rounded text-xs">
                  {currentChallenge?.category}
                </span>
              </div>
            </div>
            
            <div className="p-4 bg-muted/20 rounded-lg border border-border">
              <pre className="text-sm text-foreground whitespace-pre-wrap font-sans">
                {currentChallenge?.description}
              </pre>
            </div>
          </div>

          {/* Examples */}
          <div className="space-y-3">
            <h5 className="font-semibold text-foreground">Examples</h5>
            {currentChallenge?.examples?.map((example, index) => (
              <div key={index} className="p-4 bg-background/50 rounded-lg border border-border">
                <div className="space-y-2">
                  <div>
                    <span className="text-xs text-muted-foreground">Input:</span>
                    <code className="ml-2 text-sm font-mono text-accent">{example?.input}</code>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Output:</span>
                    <code className="ml-2 text-sm font-mono text-success">{example?.output}</code>
                  </div>
                  {example?.explanation && (
                    <div>
                      <span className="text-xs text-muted-foreground">Explanation:</span>
                      <span className="ml-2 text-sm text-foreground">{example?.explanation}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Constraints */}
          <div className="space-y-3">
            <h5 className="font-semibold text-foreground">Constraints</h5>
            <ul className="space-y-1">
              {currentChallenge?.constraints?.map((constraint, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start">
                  <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <code className="font-mono">{constraint}</code>
                </li>
              ))}
            </ul>
          </div>

          {/* Hint */}
          {showHint && (
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="Lightbulb" size={16} className="text-warning mt-0.5" />
                <div>
                  <h6 className="font-medium text-warning mb-1">Hint</h6>
                  <p className="text-sm text-foreground">{currentChallenge?.hint}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Code Editor & Results */}
        <div className="space-y-6">
          {/* Code Editor */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="font-semibold text-foreground">Your Solution</h5>
              <Button
                variant="default"
                size="sm"
                onClick={submitSolution}
                disabled={isSubmitting}
                loading={isSubmitting}
                iconName="Send"
                iconPosition="left"
                className="neon-glow-hover"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
            
            <textarea
              value={userSolution}
              onChange={(e) => setUserSolution(e?.target?.value)}
              className="w-full h-64 p-4 bg-background border border-border rounded-lg font-mono text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent custom-scrollbar"
              placeholder="Write your solution here..."
              spellCheck={false}
            />
          </div>

          {/* Submission Results */}
          {submissionResult && (
            <div className={`p-4 rounded-lg border ${
              submissionResult?.passed 
                ? 'bg-success/10 border-success/20' :'bg-error/10 border-error/20'
            }`}>
              <div className="flex items-center space-x-2 mb-3">
                <Icon 
                  name={submissionResult?.passed ? "CheckCircle" : "XCircle"} 
                  size={20} 
                  className={submissionResult?.passed ? "text-success" : "text-error"} 
                />
                <h6 className={`font-semibold ${
                  submissionResult?.passed ? "text-success" : "text-error"
                }`}>
                  {submissionResult?.passed ? 'Accepted' : 'Wrong Answer'}
                </h6>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="text-center p-2 bg-background/50 rounded">
                  <div className="text-lg font-bold text-foreground">
                    {submissionResult?.testsPassed}/{submissionResult?.totalTests}
                  </div>
                  <div className="text-xs text-muted-foreground">Tests Passed</div>
                </div>
                <div className="text-center p-2 bg-background/50 rounded">
                  <div className="text-lg font-bold text-foreground">{submissionResult?.runtime}ms</div>
                  <div className="text-xs text-muted-foreground">Runtime</div>
                </div>
              </div>
              
              <p className="text-sm text-foreground">{submissionResult?.feedback}</p>
            </div>
          )}

          {/* Complexity Analysis */}
          <div className="p-4 bg-muted/20 rounded-lg border border-border">
            <h6 className="font-semibold text-foreground mb-3">Expected Complexity</h6>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-muted-foreground">Time Complexity:</span>
                <code className="block text-sm font-mono text-accent mt-1">
                  {currentChallenge?.timeComplexity}
                </code>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Space Complexity:</span>
                <code className="block text-sm font-mono text-accent mt-1">
                  {currentChallenge?.spaceComplexity}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeChallenges;