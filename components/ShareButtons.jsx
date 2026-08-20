"use client";
import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Link as LinkIcon } from 'lucide-react';

const ShareButtons = ({ url, title }) => {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer" className="share-btn" aria-label="Share on Facebook">
        <Facebook size={20} />
      </a>
      <a href={`https://twitter.com/intent/tweet?text=Check out this article!&url=${url}`} target="_blank" rel="noopener noreferrer" className="share-btn" aria-label="Share on X (Twitter)">
        <Twitter size={20} />
      </a>
      <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" className="share-btn" aria-label="Share on LinkedIn">
        <Linkedin size={20} />
      </a>
      <button onClick={() => {
        navigator.clipboard.writeText(url);
        alert("Link copied! Share it on Instagram or anywhere else.");
      }} className="share-btn" aria-label="Share on Instagram" style={{ cursor: 'pointer', border: 'none' }}>
        <Instagram size={20} />
      </button>
      <button onClick={() => {
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }} className="share-btn" aria-label="Copy Link" style={{ cursor: 'pointer', border: 'none' }}>
        <LinkIcon size={20} />
      </button>

      <style>{`
        .share-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(11, 30, 57, 0.04);
          color: var(--color-primary);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .share-btn:hover {
          background: var(--color-accent);
          color: #fff;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default ShareButtons;
