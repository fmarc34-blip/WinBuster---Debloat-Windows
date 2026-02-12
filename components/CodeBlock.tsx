
import React, { useState } from 'react';
import { Button } from './Button';

interface CodeBlockProps {
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group mt-2">
      <div className="bg-slate-950 text-emerald-400 p-3 rounded-lg font-mono text-sm overflow-x-auto border border-slate-800 whitespace-pre-wrap break-all">
        {code}
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={copyToClipboard}
      >
        <i className={`fa-solid ${copied ? 'fa-check text-green-400' : 'fa-copy'}`}></i>
      </Button>
    </div>
  );
};
