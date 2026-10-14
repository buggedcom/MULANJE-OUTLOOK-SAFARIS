import type { Enquiry } from './validate';

export interface MailConfig {
  apiKey: string;
  to: string;
  from: string;
}

const LABELS: Record<string, string> = {
  interest: 'Interested in',
  dates: 'Approx. dates',
  month: 'Preferred month',
  group: 'Group size',
  fitness: 'Fitness level',
};

/** Plain-text only: user content is never interpreted as HTML. */
export function buildText(e: Enquiry): string {
  const lines: string[] = [];
  if (e.topic) lines.push(`Enquiry about: ${e.topic}`);
  if (e.page) lines.push(`Sent from: ${e.page}`);
  lines.push(`Name: ${e.name}`, `Email: ${e.email}`);
  for (const [k, v] of Object.entries(e.extras)) lines.push(`${LABELS[k] ?? k}: ${v}`);
  lines.push('', e.message || '(no message)');
  return lines.join('\n');
}

export async function sendEnquiry(cfg: MailConfig, e: Enquiry, fetchImpl: typeof fetch = fetch): Promise<boolean> {
  const res = await fetchImpl('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${cfg.apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: cfg.from,
      to: [cfg.to],
      reply_to: e.email,
      subject: (e.topic ? `Enquiry: ${e.topic} - ${e.name}` : `Website enquiry from ${e.name}`).slice(0, 150),
      text: buildText(e),
    }),
  });
  return res.ok;
}
