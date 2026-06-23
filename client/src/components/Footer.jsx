import { Rocket, Github, Linkedin, Facebook, Mail, MessageCircle, ChevronRight, ShieldCheck, Lock, Star } from 'lucide-react';

const Footer = () => (
  <footer style={{
    position: 'relative', zIndex: 2,
    padding: '60px 6% 28px',
    marginTop: '40px',
    background: 'rgba(3,7,18,0.92)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(99,102,241,0.22)',
  }}>
    <div className="footer-grid" style={{
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr',
      gap: '40px',
      marginBottom: '50px',
    }}>
      {/* Brand */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <Rocket size={28} color="#6366f1" style={{ filter: 'drop-shadow(0 0 6px rgba(99,102,241,0.7))' }} />
          <span className="outfit" style={{ fontSize: '1.4rem', fontWeight: '900', letterSpacing: '-0.5px' }}>
            WEBIFY <span style={{
              background: 'linear-gradient(135deg, #6366f1, #00d4ff)',
              backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>PRO</span>
          </span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '340px', fontSize: '0.9rem', lineHeight: '1.7' }}>
          Empowering businesses with cutting-edge digital solutions.
          From Pakistan to the world — we build the future of the web.
        </p>

        {/* Social icons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
          {[
            { href: 'https://www.linkedin.com/in/musab-iftikhar-94668a330', icon: <Linkedin size={18} />, label: 'LinkedIn' },
            { href: 'https://www.facebook.com/webify.pro/', icon: <Facebook size={18} />, label: 'Facebook' },
            { href: 'https://github.com/musab-18', icon: <Github size={18} />, label: 'GitHub' },
            { href: 'https://wa.me/923708316591', icon: <MessageCircle size={18} />, label: 'WhatsApp' },
            { href: 'mailto:WEBIFYPRO9@GMAIL.COM', icon: <Mail size={18} />, label: 'Email' },
          ].map(s => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="social-link"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '38px', height: '38px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.14)',
                color: 'rgba(255,255,255,0.7)',
                transition: 'all 0.3s ease',
              }}
            >{s.icon}</a>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="outfit" style={{ fontWeight: '700', marginBottom: '18px', fontSize: '1rem', color: '#fff' }}>
          Quick Links
        </h4>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { href: '#home', label: 'Home' },
            { href: '#services', label: 'Services' },
            { href: '#portfolio', label: 'Portfolio' },
            { href: '#order', label: 'Order Now' },
            { href: '#contact', label: 'Contact' },
          ].map(link => (
            <li key={link.label}>
              <a href={link.href} className="footer-link" style={{
                color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem',
                transition: 'color 0.2s ease', textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: '4px',
              }}>
                <ChevronRight className="footer-link-chevron" size={14} style={{ color: '#6366f1' }} />
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Services */}
      <div>
        <h4 className="outfit" style={{ fontWeight: '700', marginBottom: '18px', fontSize: '1rem', color: '#fff' }}>
          Services
        </h4>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {['Web Development', 'Digital Marketing', 'Mobile Apps', 'Social Media'].map(s => (
            <li key={s}>
              <a href="#services" className="footer-link" style={{
                color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem',
                transition: 'color 0.2s ease', textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: '4px',
              }}>
                <ChevronRight className="footer-link-chevron" size={14} style={{ color: '#00d4ff' }} />
                {s}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>


    {/* Trust Badges */}
    <div style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      paddingTop: '24px',
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      flexWrap: 'wrap',
    }}>
      {[
        { icon: <ShieldCheck size={14} />, label: 'SSL Secured', color: '#06ffa5' },
        { icon: <Lock size={14} />,        label: 'GDPR Compliant', color: '#00d4ff' },
        { icon: <Star size={14} />,        label: '5-Star Rated',   color: '#f59e0b' },
      ].map(badge => (
        <div key={badge.label} style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '6px 14px', borderRadius: '100px',
          background: `${badge.color}0c`,
          border: `1px solid ${badge.color}25`,
          color: badge.color, fontSize: '0.75rem', fontWeight: '700',
          fontFamily: 'Outfit, sans-serif',
        }}>
          {badge.icon}
          {badge.label}
        </div>
      ))}
    </div>

    {/* Bottom bar */}
    <div style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      paddingTop: '24px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: '12px',
      color: 'rgba(255,255,255,0.5)', fontSize: '0.83rem',
    }}>
      <p>© {new Date().getFullYear()} Webify Pro. All rights reserved.</p>
      <p>
        Designed & Developed by{' '}
        <span style={{
          background: 'linear-gradient(135deg, #6366f1, #00d4ff)',
          backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          fontWeight: '600',
        }}>Musab Iftikhar</span>
      </p>
    </div>

    <style>{`
      .social-link:hover {
        color: #6366f1 !important;
        border-color: rgba(99,102,241,0.4) !important;
        background: rgba(99,102,241,0.1) !important;
        transform: translateY(-3px);
      }
      .footer-link:hover { color: #6366f1 !important; }
      .footer-link-chevron {
        transition: transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), color 0.2s ease;
        flex-shrink: 0;
      }
      .footer-link:hover .footer-link-chevron {
        transform: translateX(4px);
        color: #fff !important;
      }
      @media (max-width: 768px) {
        .footer-grid {
          grid-template-columns: 1fr 1fr !important;
        }
        .footer-grid > div:first-child {
          grid-column: span 2;
        }
      }
      @media (max-width: 480px) {
        .footer-grid {
          grid-template-columns: 1fr !important;
        }
        .footer-grid > div:first-child {
          grid-column: span 1 !important;
        }
      }
    `}</style>
  </footer>
);

export default Footer;
