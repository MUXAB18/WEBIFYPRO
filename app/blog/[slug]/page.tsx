import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import ShareButtons from '../../../components/ShareButtons';

import prisma from '@/lib/prisma';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return { title: 'Post Not Found | Webify Pro' };
  
  return {
    title: `${post.title} | Webify Pro Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)', color: 'var(--color-primary)' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Post not found</h2>
          <Link href="/blog" style={{ color: 'var(--color-accent)', textDecoration: 'none', marginTop: '16px', display: 'inline-block' }}>
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', paddingTop: '120px', paddingBottom: '80px' }}>
      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '0 6%' }}>
        {/* Back Button */}
        <Link href="/blog" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          color: 'var(--color-text)', textDecoration: 'none', fontSize: '0.95rem',
          fontWeight: '600', marginBottom: '40px', transition: 'color 0.2s ease'
        }}>
          <ArrowLeft size={18} /> Back to insights
        </Link>

        {/* Header */}
        <header style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <span style={{
              padding: '6px 12px', borderRadius: '6px', background: 'rgba(11, 30, 57, 0.05)',
              color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase'
            }}>
              {post.category}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--color-text)', fontSize: '0.9rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16} /> {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> 5 min read</span>
            </div>
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', 
            fontWeight: '800', 
            color: 'var(--color-primary)', 
            lineHeight: '1.15', 
            letterSpacing: '-0.02em',
            marginBottom: '32px'
          }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: '20px 0' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <User size={24} />
            </div>
            <div>
              <div style={{ fontWeight: '700', color: 'var(--color-primary)' }}>{post.author}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text)' }}>Webify Pro Experts</div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Share Section */}
        <div style={{
          marginTop: '60px',
          paddingTop: '32px',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-primary)', margin: 0 }}>
            Share this article
          </h3>
          <ShareButtons url={`https://webifypro.com/blog/${slug}`} title={post.title} />
        </div>

      </article>

      {/* Blog Styles */}
      <style>{`
        .blog-content {
          font-size: 1.15rem;
          line-height: 1.8;
          color: rgba(11, 30, 57, 0.85); /* Slightly softer than primary for long reading */
        }
        .blog-content p {
          margin-bottom: 24px;
        }
        .blog-content h3 {
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-top: 48px;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }
        .blog-content ul {
          margin-bottom: 24px;
          padding-left: 24px;
        }
        .blog-content li {
          margin-bottom: 12px;
        }
        .blog-content strong {
          color: var(--color-primary);
        }
        .blog-content code {
          background: rgba(11, 30, 57, 0.05);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.9em;
        }
      `}</style>
    </div>
  );
}
