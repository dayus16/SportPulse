import React from "react";

const PrivacyPolicy = () => {
  return (
    <main className="max-w-4xl mx-auto p-6 text-gray-800">
      {/* Heading */}
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold uppercase border-b-3 border-gray-600 w-fit pb-1">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Last Updated: <span className="font-medium">April 2025</span>
        </p>
      </header>

      {/* Intro */}
      <section className="space-y-4">
        <p className="leading-relaxed">
          SportPulse (“we,” “our,” or “us”) respects your privacy. This Privacy
          Policy explains what information we collect, how we use it, and the
          choices you have when you visit our website or interact with our
          services.
        </p>
      </section>

      {/* 1. Information We Collect */}
      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold">1. Information We Collect</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <span className="font-semibold">Personal Information</span> you
            provide (e.g., name, email) when you contact us, subscribe to
            updates, or submit forms.
          </li>
          <li>
            <span className="font-semibold">Usage & Device Data</span> such as
            browser type, device, pages visited, and time spent—collected via
            cookies or similar technologies.
          </li>
        </ul>
      </section>

      {/* 2. How We Use Your Information */}
      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>To provide, maintain, and improve site content and features.</li>
          <li>To respond to inquiries, feedback, or support requests.</li>
          <li>
            To send newsletters or updates if you opt in (you can unsubscribe
            anytime).
          </li>
          <li>To analyze site performance and user experience.</li>
        </ul>
      </section>

      {/* 3. Cookies */}
      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold">3. Cookies & Tracking</h2>
        <p className="leading-relaxed">
          We use cookies and similar technologies to understand how our site is
          used and to enhance your experience. You can disable cookies through
          your browser settings, but some features may not function properly.
        </p>
      </section>

      {/* 4. Sharing */}
      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold">4. How We Share Information</h2>
        <p className="leading-relaxed">
          We do <span className="font-semibold">not</span> sell or rent your
          personal information. We may share data with trusted service providers
          who help us operate the website (e.g., analytics or email tools) under
          confidentiality obligations, or when required by law.
        </p>
      </section>

      {/* 5. Security */}
      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold">5. Data Security</h2>
        <p className="leading-relaxed">
          We implement reasonable safeguards to protect your information.
          However, no internet transmission or storage system is 100% secure.
        </p>
      </section>

      {/* 6. Third-Party Links */}
      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold">6. Third-Party Links</h2>
        <p className="leading-relaxed">
          Our site may link to external websites. We are not responsible for the
          privacy practices or content of those third-party sites.
        </p>
      </section>

      {/* 7. Your Rights */}
      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold">7. Your Rights & Choices</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Request access to, update, or delete your personal information.
          </li>
          <li>Opt out of marketing emails by using the “unsubscribe” link.</li>
          <li>
            Contact us to exercise your rights or ask questions about your data.
          </li>
        </ul>
      </section>

      {/* 8. Children's Privacy (optional but good practice) */}
      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold">8. Children’s Privacy</h2>
        <p className="leading-relaxed">
          Our services are not directed to children under 13. We do not
          knowingly collect personal information from children. If you believe a
          child has provided us personal data, please contact us to remove it.
        </p>
      </section>

      {/* 9. Changes */}
      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold">9. Changes to This Policy</h2>
        <p className="leading-relaxed">
          We may update this Privacy Policy from time to time. We will post any
          changes on this page and update the “Last Updated” date above.
        </p>
      </section>

      {/* 10. Contact */}
      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold">10. Contact Us</h2>
        <p className="leading-relaxed">
          If you have questions or requests regarding this Privacy Policy,
          contact us at:
        </p>
        <address className="not-italic">
          <div className="font-semibold">SportPulse</div>
          <div>
            Email:{" "}
            <a
              href="mailto:support@sportpulse.com"
              className="text-[#e93314] underline"
            >
              support@sportpulse.com
            </a>
          </div>
        </address>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
