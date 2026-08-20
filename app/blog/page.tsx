import React from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Blog & Insights | Webify Pro',
  description: 'Read the latest insights on web development, digital marketing, and business growth from the experts at Webify Pro.',
};

import { blogPosts } from '../../lib/blogData';

export default function BlogPage() {
  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--color-bg)' }}>
      <section style={{ padding: '80px 6%', position: 'relative' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '700px', margin: '0 auto 80px' }}>
            <div style={{
              display: 'inline-block', padding: '6px 14px', borderRadius: '100px',
              background: 'rgba(11, 30, 57, 0.05)', border: '1px solid var(--color-border)',
              color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: '600',
              textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px'
            }}>
              Insights
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '20px', color: 'var(--color-primary)', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
              Thoughts on <span style={{ color: 'var(--color-accent)' }}>technology</span> & growth.
            </h1>
            <p style={{ color: 'var(--color-text)', fontSize: '1.15rem', lineHeight: '1.6', marginBottom: '40px' }}>
              Expert perspectives on software engineering, performance marketing, and digital strategy.
            </p>

            {/* Newsletter Subscription */}
            <div style={{ 
              background: 'var(--color-surface)', padding: '24px', borderRadius: '16px', 
              border: '1px solid var(--color-border)', display: 'flex', gap: '12px', 
              boxShadow: '0 12px 24px rgba(11, 30, 57, 0.05)',
              flexDirection: 'row', alignItems: 'center'
            }}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                style={{
                  flex: 1, padding: '16px 20px', borderRadius: '8px', border: '1px solid var(--color-border)',
                  background: 'var(--color-bg)', color: 'var(--color-text)', fontSize: '1rem',
                  outline: 'none', transition: 'border-color 0.2s ease'
                }}
              />
              <button style={{
                background: 'var(--color-primary)', color: '#fff', padding: '16px 24px',
                borderRadius: '8px', border: 'none', fontWeight: '600', fontSize: '1rem',
                cursor: 'pointer', transition: 'background 0.2s ease', whiteSpace: 'nowrap'
              }}>
                Subscribe
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
            {blogPosts.map((post) => (
              <article key={post.id} style={{
                background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                borderRadius: '16px', overflow: 'hidden', transition: 'all 0.3s ease',
                display: 'flex', flexDirection: 'column'
              }} className="blog-card">
                <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <span style={{
                      padding: '4px 10px', borderRadius: '6px', background: 'rgba(11, 30, 57, 0.05)',
                      color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase'
                    }}>
                      {post.category}
                    </span>
                    <span style={{ color: 'var(--color-text)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} /> {post.date}
                    </span>
                  </div>
                  
                  <h2 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '16px', lineHeight: '1.3' }}>
                    {post.title}
                  </h2>
                  <p style={{ color: 'var(--color-text)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '32px', flex: 1 }}>
                    {post.excerpt}
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '20px', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text)', fontSize: '0.85rem', fontWeight: '600' }}>
                      <User size={16} color="var(--color-primary)" /> {post.author}
                    </div>
                    <Link href={`/blog/${post.slug}`} style={{
                      display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)',
                      fontSize: '0.9rem', fontWeight: '600', textDecoration: 'none'
                    }} className="read-more">
                      Read <ArrowRight size={16} className="read-more-arrow" style={{ transition: 'transform 0.2s ease' }} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .blog-card:hover {
          border-color: var(--color-accent) !important;
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(11, 30, 57, 0.05);
        }
        .blog-card:hover .read-more { color: var(--color-accent) !important; }
        .blog-card:hover .read-more-arrow { transform: translateX(4px); }
      `}</style>
    </div>
  );
}
