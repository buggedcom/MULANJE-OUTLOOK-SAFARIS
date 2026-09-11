import { PageHero } from '../components/ui/PageHero';
import { EnquiryForm } from '../components/EnquiryForm';
import { Icon } from '../components/ui/Icon';
import { icons } from '../lib/icons';
import { muted } from '../lib/style';
import { useBreakpoint } from '../lib/useBreakpoint';
import { contact, contactInterests } from '../data/site';

interface InfoItem {
  d: readonly string[];
  label: string;
  value: string;
  href?: string;
}

export function ContactPage() {
  const mobile = useBreakpoint() < 860;

  const info: InfoItem[] = [
    { d: icons.phone, label: 'WhatsApp', value: contact.whatsappDisplay, href: contact.whatsappHref },
    { d: icons.phone, label: 'Direct call', value: contact.phoneDisplay, href: contact.phoneHref },
    { d: icons.envelope, label: 'Email', value: contact.email, href: contact.emailHref },
    { d: icons.pinDot, label: 'Based in', value: contact.location },
    { d: icons.clock, label: 'Office hours', value: contact.officeHours },
  ];

  return (
    <div>
      <PageHero
        image="photos/lake-sunset.jpg"
        kicker="Contact & booking"
        title="Begin your journey"
        sub="Your adventure begins here - reach out and let’s craft something unforgettable."
      />

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(48px,6vw,84px) var(--space-4)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1.15fr', gap: 'clamp(32px,5vw,64px)', alignItems: 'start' }}>
          <div>
            <span className="card-kicker" style={{ fontSize: '11px' }}>Get in touch</span>
            <h2 style={{ fontSize: 'clamp(28px,3.4vw,42px)', margin: '10px 0 0', maxWidth: '16ch' }}>Let’s plan your Malawi adventure</h2>
            <p style={{ fontSize: '16.5px', lineHeight: 1.65, marginTop: '18px', color: muted(78), maxWidth: '44ch' }}>
              From your first enquiry until your journey ends, our goal is to make your visit enjoyable,
              seamless and inspiring. Send a message and a local expert will reply personally within 24 hours.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '28px' }}>
              {info.map((c) => (
                <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
                  <span style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'var(--color-accent-100)', display: 'grid', placeItems: 'center', color: 'var(--color-accent-700)', flex: 'none' }}>
                    <Icon d={c.d} size={19} />
                  </span>
                  <span>
                    <span style={{ display: 'block', fontSize: '12px', color: muted(55) }}>{c.label}</span>
                    {c.href ? (
                      <a href={c.href} target="_blank" rel="noopener" style={{ fontSize: '16px', fontFamily: 'var(--font-heading)', color: 'var(--color-text)', textDecoration: 'none' }}>
                        {c.value}
                      </a>
                    ) : (
                      <span style={{ fontSize: '16px', fontFamily: 'var(--font-heading)' }}>{c.value}</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '24px' }}>
              <a className="btn btn-secondary" href={contact.instagram} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px' }}>
                <Icon d={icons.instagram} size={18} />
                Follow on Instagram
              </a>
              <a className="btn btn-secondary" href={contact.tripadvisor} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px' }}>
                <Icon d={icons.tripadvisor} size={18} />
                TripAdvisor
              </a>
            </div>
          </div>

          <EnquiryForm
            fields={[
              { name: 'interest', label: 'Interested in', type: 'select', options: contactInterests },
              { name: 'dates', label: 'Approx. dates', type: 'text', placeholder: 'e.g. June 2026' },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
