"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const scrollHeight = contentRef.current.scrollHeight;
      setHeight(scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div style={{
      borderBottom: '1px solid var(--color-border)',
      padding: '24px 0'
    }}>
      <button 
        onClick={onClick}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'none', border: 'none', color: 'var(--color-primary)',
          fontSize: '1.2rem', fontWeight: '700', textAlign: 'left',
          cursor: 'pointer', padding: 0
        }}
      >
        <span>{question}</span>
        <ChevronDown 
          size={20} 
          style={{ 
            color: 'var(--color-primary)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }} 
        />
      </button>
      <div 
        ref={contentRef}
        style={{ 
          height: `${height}px`, 
          overflow: 'hidden',
          transition: 'height 0.3s ease-in-out'
        }}
      >
        <p style={{
          color: 'var(--color-text)', fontSize: '1.05rem', lineHeight: '1.7', margin: '16px 0 0 0', maxWidth: '85%'
        }}>
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openId, setOpenId] = useState('q1');

  const faqs = [
    {
      id: 'q1',
      question: 'How much does a typical project cost?',
      answer: 'Pricing depends entirely on the scope and complexity of your project. Small business landing pages start around $1,500, while custom full-stack web applications range from $5,000 to $10,000+. We scope everything accurately after our free strategy call so there are never hidden fees.'
    },
    {
      id: 'q2',
      question: 'How long does it take to build a website?',
      answer: 'A standard marketing website typically takes 3 to 5 weeks from discovery to launch. Complex web apps or e-commerce platforms take 8 to 12 weeks. We adhere strictly to agreed timelines.'
    },
    {
      id: 'q3',
      question: 'Do you provide ongoing support after launch?',
      answer: 'Yes. We don\'t just launch and leave. We offer monthly retainer packages for ongoing SEO, performance monitoring, security updates, and digital marketing to ensure your site continues to generate leads.'
    },
    {
      id: 'q4',
      question: 'Who owns the website and code after it\'s finished?',
      answer: 'You do. 100%. Once the final payment is cleared, full intellectual property rights, source code, and assets are transferred directly to you. We simply retain the right to feature the project in our portfolio.'
    }
  ];

  return (
    <section id="faq" style={{
      padding: 'var(--section-pad-y) var(--section-pad-x)',
      background: 'var(--color-surface)',
      borderTop: '1px solid var(--color-border)'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-block', padding: '6px 14px', borderRadius: '100px',
            background: 'rgba(11, 30, 57, 0.05)', border: '1px solid var(--color-border)',
            color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: '600',
            textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px'
          }}>
            FAQ
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '800', color: 'var(--color-primary)', marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            Common Questions
          </h2>
        </div>

        <div className="premium-card" style={{
          background: 'var(--color-surface)', padding: '32px 40px', borderRadius: '16px',
        }}>
          {faqs.map((faq) => (
            <FAQItem 
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
