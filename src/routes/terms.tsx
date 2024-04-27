// src/routes/terms.tsx
import { A } from '@solidjs/router';

export default function terms() {
  return (
    <div class="mx-auto p-24 bg-stone-800 text-white">
      <h1 class="text-3xl font-bold mb-6">
        Terms of Service Agreement for GABO LLC
      </h1>
      <p>
        <strong>Effective Date: April 27, 2024</strong>
      </p>

      <h2 class="mt-6 mb-2 text-xl font-semibold">1. Acceptance of Terms</h2>
      <p>
        By accessing and using the services provided by GABO LLC ("Company",
        "we", "us", or "our"), located at 120 Madeira Drive Northeast, #219,
        Albuquerque, NM 87108, USA, you (the user) agree to be bound by these
        Terms of Service ("Terms"). If you do not agree to all of these Terms,
        do not use the services.
      </p>

      <h2 class="mt-6 mb-2 text-xl font-semibold">2. Services Description</h2>
      <p>
        GABO LLC provides software development services, SaaS products, and more
        to users, which are subject to these Terms.
      </p>

      <h2 class="mt-6 mb-2 text-xl font-semibold">3. User Obligations</h2>
      <p>
        You agree to use the services only for lawful purposes and in a manner
        that complies with all applicable local, state, national, and
        international laws and regulations.
      </p>

      <h2 class="mt-6 mb-2 text-xl font-semibold">5. Payments</h2>
      <p>
        All fees are non-refundable. Payment for services must be made in
        advance. Failure to pay may result in the termination of services.
      </p>

      <h2 class="mt-6 mb-2 text-xl font-semibold">6. Release of Liability</h2>
      <p>
        You agree to release GABO LLC, its officers, employees, and agents from
        any claims, liabilities, damages, and expenses arising from your use of
        the services, including any liabilities arising from user-generated
        content.
      </p>

      <h2 class="mt-6 mb-2 text-xl font-semibold">7. Arbitration</h2>
      <p>
        Any disputes arising under these Terms will be resolved exclusively
        through final and binding arbitration under the rules of the American
        Arbitration Association, rather than in court.
      </p>

      <h2 class="mt-6 mb-2 text-xl font-semibold">
        8. Third-Party Data Processors
      </h2>
      <p>
        We use third-party service providers to process your data more
        effectively. These providers are subject to confidentiality agreements
        and legal compliance requirements for data protection.
      </p>

      <h2 class="mt-6 mb-2 text-xl font-semibold">9. DMCA Compliance</h2>
      <p>
        GABO LLC respects the intellectual property rights of others. If you
        believe that your copyright has been infringed, please contact us at
        sendmessage@gabo.email.
      </p>

      <h2 class="mt-6 mb-2 text-xl font-semibold">10. Privacy Policy</h2>
      <p>
        Refer to our{' '}
        <A href="/privacy" class="text-white font-bold underline">
          Privacy Policy
        </A>{' '}
        for information on how we collect, use, and protect your personal data.
        Our Privacy Policy is an integral part of these Terms.
      </p>

      <div class="mt-6">
        <p>Contact Information:</p>
        <p>For any concerns or inquiries, contact us via:</p>
        <p>Email: sendmessage@gabo.email</p>
        <p>
          Address: 120 Madeira Drive Northeast, #219, Albuquerque, NM 87108, USA
        </p>
      </div>
    </div>
  );
}
