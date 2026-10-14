import { PageHero } from '../components/ui/PageHero';
import { Container } from '../components/ui/Container';
import { InfoList, type InfoItem } from '../components/ui/InfoList';
import { EnquiryForm } from '../components/EnquiryForm';
import { Icon } from '../components/ui/Icon';
import { cx } from '../lib/cx';
import { icons } from '../lib/icons';
import { contact, contactInterests } from '../data/site';
import s from './ContactPage.module.css';

const info: InfoItem[] = [
  { icon: icons.phone, label: 'WhatsApp', value: contact.whatsappDisplay, href: contact.whatsappHref },
  { icon: icons.phone, label: 'Direct call', value: contact.phoneDisplay, href: contact.phoneHref },
  { icon: icons.envelope, label: 'Email', value: contact.email, href: contact.emailHref },
  { icon: icons.pinDot, label: 'Based in', value: contact.location },
  { icon: icons.clock, label: 'Office hours', value: contact.officeHours },
];

export function ContactPage() {
  return (
    <div>
      <PageHero
        image="photos/lake-sunset.jpg"
        kicker="Contact & booking"
        title="Begin your journey"
        sub="Your adventure begins here - reach out and let’s craft something unforgettable."
      />

      <Container>
        <div className={s.grid}>
          <div>
            <span className={cx('card-kicker', s.kicker)}>Get in touch</span>
            <h2 className={s.title}>Let’s plan your Malawi adventure</h2>
            <p className={s.lead}>
              From your first enquiry until your journey ends, our goal is to make your visit enjoyable,
              seamless and inspiring. Send a message and a local expert will reply personally within 24 hours.
            </p>
            <div className={s.info}>
              <InfoList items={info} />
            </div>
            <div className={s.social}>
              <a className="btn btn-secondary btn-inline" href={contact.instagram} target="_blank" rel="noopener">
                <Icon d={icons.instagram} size={18} />
                Follow on Instagram
              </a>
              <a className="btn btn-secondary btn-inline" href={contact.tripadvisor} target="_blank" rel="noopener">
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
      </Container>
    </div>
  );
}
