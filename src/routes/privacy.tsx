// src/pages/PrivacyPolicy.tsx
import { A } from '@solidjs/router';

export default function privacy() {
  return (
    <main class="mx-auto p-24 bg-stone-800 text-white min-w-screen">
      <h1 class="text-xl font-semibold my-4">Privacy Policy for GABO LLC</h1>
      <p>
        <strong>Effective Date: April 27, 2024</strong>
      </p>

      <h2 class="mt-6 mb-2">1. Introduction</h2>
      <p>
        GABO LLC respects your privacy and is committed to protecting your
        personal data. This privacy policy will inform you as to how we look
        after your personal data when you visit our website (regardless of where
        you visit it from) and tell you about your privacy rights and how the
        law protects you.
      </p>

      <h2 class="mt-6 mb-2">2. Important Information and Who We Are</h2>
      <p>
        <strong>Purpose of This Privacy Policy</strong>
      </p>
      <p>
        This privacy policy aims to give you information on how GABO LLC
        collects and processes your personal data through your use of this
        website, including any data you may provide through this site when you
        sign up for our service, purchase a product or service, or interact with
        us.
      </p>
      <p>
        <strong>Controller</strong>
      </p>
      <p>
        GABO LLC is the controller and responsible for your personal data
        (collectively referred to as "GABO LLC," "we," "us," or "our" in this
        privacy policy).
      </p>
      <p>
        <strong>Contact Details</strong>
      </p>
      <p>
        For any questions or concerns regarding this policy or our privacy
        practices, please contact us:
      </p>
      <address>
        Email: sendmessage@gabo.email
        <br />
        Address: 120 Madeira Drive Northeast, #219, Albuquerque, NM 87108, USA
      </address>

      <h2 class="mt-6 mb-2">3. The Data We Collect About You</h2>
      <p>
        We collect, use, store, and transfer different kinds of personal data
        about you which we have grouped together as follows:
      </p>
      <ul>
        <li>Contact Data includes email address and telephone numbers.</li>
        <li>Financial Data includes bank account and payment card details.</li>
        <li>
          Project Data includes information about the projects we work on with
          you, which may contain confidential information.
        </li>
      </ul>
      <p>
        We use this data exclusively to provide and improve our software
        development services and SaaS products and to handle our contractual and
        payment obligations.
      </p>

      <h2 class="mt-6 mb-2">4. How We Use Your Personal Data</h2>
      <p>
        We will only use your personal data when the law allows us to. Most
        commonly, we use your personal data to perform the contract we are about
        to enter into or have entered into with you, and to comply with our
        legal obligations.
      </p>

      <h2 class="mt-6 mb-2">5. Data Security</h2>
      <p>
        To prevent your personal data from being accidentally lost, used, or
        accessed in an unauthorized way, altered or disclosed, we have
        implemented appropriate security measures to safeguard and secure the
        data we collect. All personal data is encrypted.
      </p>

      <h2 class="mt-6 mb-2">6. Your Legal Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Request access to your personal data.</li>
        <li>Request correction of the personal data that we hold about you.</li>
        <li>Request erasure of your personal data.</li>
        <li>Object to processing of your personal data.</li>
        <li>Request restriction of processing your personal data.</li>
        <li>Request transfer of your personal data.</li>
        <li>Right to withdraw consent.</li>
      </ul>
      <p>
        If you wish to exercise any of the rights set out above, please contact
        us at the details provided.
      </p>

      <h2 class="mt-6 mb-2">7. Changes to the Privacy Policy</h2>
      <p>
        We keep our privacy policy under regular review. This version was last
        updated on April 27, 2024. Historical versions can be obtained by
        contacting us.
      </p>

      <div class="mt-6">
        <A
          href="/contact"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Contact Us
        </A>
      </div>
    </main>
  );
}
