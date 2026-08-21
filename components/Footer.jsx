"use client";
import { Github, Linkedin, Facebook, Mail, ShieldCheck, Lock, Star, ArrowRight, MapPin, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Footer = ({ navLinks, dbServices, settings }) => {
  const router = useRouter();

  const footerLinks = navLinks && navLinks.length > 0 
    ? navLinks.map(link => ({ href: link.url, label: link.label }))
    : [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Us' },
        { href: '/solutions', label: 'Solutions' },
        { href: '/blog', label: 'Insights & Blog' },
      ];

  const footerServices = dbServices && dbServices.length > 0
    ? dbServices.map(service => service.name)
    : ['Web Development', 'UI/UX Design', 'Digital Marketing', 'SEO Optimization', 'App Development'];

  return (
    <footer style={{
      position: 'relative', zIndex: 2,
      background: 'var(--color-primary)',
      color: '#ffffff',
      overflow: 'hidden'
    }}>
      {/* Background Texture */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />
      
      {/* Abstract Glow */}
      <div style={{
        position: 'absolute', top: '-150px', right: '-150px',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(255, 107, 53, 0.15) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 5% 20px', position: 'relative', zIndex: 1 }}>
        
        {/* Main Footer Layout */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
          gap: '40px', marginBottom: '32px'
        }}>
          {/* Left Side: Brand */}
          <div style={{ flex: '1 1 300px', maxWidth: '380px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <img src="/webifylogowhite-name.png" alt="Webify Pro Logo" loading="lazy" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '20px' }}>
              {settings?.seoDescription || "We design, develop, and scale premium digital products for ambitious brands. Your growth is our primary metric."}
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { href: settings?.linkedinUrl || 'https://www.linkedin.com/in/musab-iftikhar-94668a330', icon: <Linkedin size={18} />, label: 'LinkedIn', show: !!(settings?.linkedinUrl || true) },
                { href: settings?.facebookUrl || 'https://www.facebook.com/webify.pro/', icon: <Facebook size={18} />, label: 'Facebook', show: !!(settings?.facebookUrl || true) },
                { href: settings?.githubUrl || 'https://github.com/musab-18', icon: <Github size={18} />, label: 'GitHub', show: !!(settings?.githubUrl || true) },
              ].filter(s => s.show).map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff', outline: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  className="footer-social-link"
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Right Side: Links & Contact */}
          <div style={{ flex: '2 1 500px', display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between' }}>
            {/* Quick Links */}
            <div style={{ minWidth: '120px' }}>
              <h4 style={{ fontWeight: '700', marginBottom: '12px', fontSize: '1rem', color: '#fff' }}>Company</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: 0, margin: 0, listStyle: 'none' }}>
                {footerLinks.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.95rem', textDecoration: 'none', display: 'inline-block' }} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div style={{ minWidth: '160px' }}>
              <h4 style={{ fontWeight: '700', marginBottom: '12px', fontSize: '1rem', color: '#fff' }}>Services</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: 0, margin: 0, listStyle: 'none' }}>
                {footerServices.map(s => (
                  <li key={s}>
                    <Link href="/services" style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.95rem', textDecoration: 'none', display: 'inline-block' }} className="footer-link">
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div style={{ minWidth: '200px' }}>
              <h4 style={{ fontWeight: '700', marginBottom: '12px', fontSize: '1rem', color: '#fff' }}>Contact</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: 0, margin: 0, listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
                  <MapPin size={18} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span dangerouslySetInnerHTML={{ __html: settings?.contactAddress?.replace(/\n/g, '<br/>') || 'Sialkot, Punjab<br/>Pakistan' }} />
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
                  <Phone size={18} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                  <a href={`tel:${settings?.contactPhone || '+923708316591'}`} className="footer-link" style={{ color: 'inherit', textDecoration: 'none' }}>{settings?.contactPhone || '+92 370 8316591'}</a>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
                  <Mail size={18} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                  <a href={`mailto:${settings?.contactEmail || 'webifypro9@gmail.com'}`} className="footer-link" style={{ color: 'inherit', textDecoration: 'none' }}>{settings?.contactEmail || 'webifypro9@gmail.com'}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ 
          borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
          paddingTop: '16px', display: 'flex', justifyContent: 'space-between', 
          alignItems: 'center', flexWrap: 'wrap', gap: '16px' 
        }}>
          
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {[
              { icon: <ShieldCheck size={16} />, label: 'SSL Secured' },
              { icon: <Lock size={16} />, label: 'Privacy Respected' },
              { icon: <Star size={16} fill="currentColor" />, label: '5-Star Agency' },
            ].map(badge => (
              <div key={badge.label} 
                   onClick={badge.label === 'SSL Secured' ? () => router.push('/admin/login') : undefined}
                   style={{
                cursor: badge.label === 'SSL Secured' ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', gap: '8px',
                color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem', fontWeight: '600',
              }}>
                <span style={{ color: 'var(--color-accent)' }}>{badge.icon}</span>
                {badge.label}
              </div>
            ))}
          </div>

          <div style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem', display: 'flex', flexWrap: 'wrap', gap: '8px 24px', alignItems: 'center' }}>
            <span>© {new Date().getFullYear()} Webify Pro. All rights reserved.</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              Designed & Developed by 
              <a href="https://musabiftikhar.tech" target="_blank" rel="noopener noreferrer" 
                 style={{ 
                   color: 'var(--color-accent)', 
                   textDecoration: 'underline', 
                   textUnderlineOffset: '4px',
                   fontWeight: '600', 
                   display: 'inline-flex',
                   alignItems: 'center',
                   gap: '4px',
                   transition: 'all 0.2s' 
                 }} 
                 onMouseOver={e => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.textUnderlineOffset = '6px'; }} 
                 onMouseOut={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.textUnderlineOffset = '4px'; }}>
                Musab Iftikhar
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-social-link:hover {
          background: var(--color-accent) !important;
          border-color: var(--color-accent) !important;
          transform: translateY(-3px);
          color: #fff !important;
        }
        .footer-link {
          transition: all 0.3s ease !important;
          position: relative;
        }
        .footer-link::before {
          content: '›';
          position: absolute;
          left: 0;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
          color: var(--color-accent);
          font-weight: bold;
        }
        .footer-link:hover {
          color: #fff !important;
          padding-left: 14px;
        }
        .footer-link:hover::before {
          opacity: 1;
          transform: translateX(0);
        }
        @media (max-width: 768px) {
          .footer-cta-card {
            padding: 32px !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
