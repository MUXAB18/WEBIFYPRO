import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(contentRef.current, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' });
    } else {
      gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
    }
  }, [isOpen]);

  return (
    <div style={{
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      padding: '24px 0'
    }}>
      <button 
        onClick={onClick}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'none', border: 'none', color: '#ffffff',
          fontSize: '1.2rem', fontWeight: '600', textAlign: 'left',
          cursor: 'pointer', padding: 0
        }}
      >
        <span className="outfit">{question}</span>
        <ChevronDown 
          size={20} 
          style={{ 
            color: '#00d4ff',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }} 
        />
      </button>
      <div 
        ref={contentRef}
        style={{ height: 0, opacity: 0, overflow: 'hidden' }}
      >
        <p style={{
          color: '#A8B3C7', fontSize: '1.05rem', lineHeight: '1.7', margin: '16px 0 0 0', maxWidth: '85%'
        }}>
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const containerRef = useRef(null);
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current.children,
        { y: 30, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          duration: 0.8, 
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" style={{
      padding: 'var(--section-pad-y) var(--section-pad-x)',
      background: '#010308',
      position: 'relative'
    }}>
      <div ref={containerRef} style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '100px',
            background: 'rgba(30, 111, 234, 0.1)', border: '1px solid rgba(30, 111, 234, 0.2)',
            color: '#00d4ff', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.05em',
            textTransform: 'uppercase', marginBottom: '24px'
          }}>
            FAQ
          </div>
          <h2 className="outfit" style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '800', color: '#ffffff', marginBottom: '16px'
          }}>
            Common Questions
          </h2>
        </div>

        <div style={{
          background: '#050B18', padding: '32px', borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.05)',
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
