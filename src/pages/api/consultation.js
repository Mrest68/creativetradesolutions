
import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, businessType, leadGen } = req.body || {};

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.RESEND_TO_EMAIL;
  if (!apiKey || !toEmail) {
    return res.status(500).json({ error: 'Resend not configured on server' });
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      // Use the production sender. This requires that the domain is verified in Resend.
      from: 'noreply@creativetradesolutions.com',
      to: toEmail,
      subject: `New Consultation Request from ${name}`,
      html: `<p><b>Name:</b> ${name}<br/><b>Phone:</b> ${phone}<br/><b>Email:</b> ${email || 'N/A'}<br/><b>Business Type:</b> ${businessType || 'N/A'}<br/><b>Current Lead Generation:</b> ${leadGen || 'N/A'}</p>`
    });
    console.log('Resend data:', data, 'Resend error:', error);
    return res.status(200).json({ ok: true, resend: { data, error } });
  } catch (err) {
    console.error('Resend error (exception):', err);
    return res.status(500).json({ error: 'Failed to send', details: err.message });
  }
}
