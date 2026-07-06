import { Rocket, Github, Linkedin, Facebook, Mail, MessageCircle, ChevronRight, ShieldCheck, Lock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
  <footer style={{
    position: 'relative', zIndex: 2,
    padding: '60px 6% 28px',
    marginTop: '10px',
    background: 'rgba(3,7,18,0.92)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(99,102,241,0.22)',
  }}>
    <div className="footer-grid" style={{
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr',
      gap: '30px',
      marginBottom: '24px',
    }}>
      {/* Brand */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <img src="/webifypro-logo.png" alt="Webify Pro Logo" style={{ width: '32px', height: '32px', objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(99,102,241,0.5))' }} />
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
            { href: 'https://wa.me/923708316591', icon: <WhatsAppIcon size={18} />, label: 'WhatsApp' },
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
        <div key={badge.label} 
             onClick={badge.label === 'SSL Secured' ? () => navigate('/admin/login') : undefined}
             style={{
          cursor: badge.label === 'SSL Secured' ? 'pointer' : 'default',
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
      position: 'relative',
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
};

function WhatsAppIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

export default Footer;
