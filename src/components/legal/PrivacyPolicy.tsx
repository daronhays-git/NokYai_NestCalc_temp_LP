export function PrivacyPolicyContent() {
  return (
    <>
      <p>
        NestCalc.ai, LLC ("NestCalc," "we," "us," or "our") is a Wyoming limited liability company.
        This Privacy Policy explains how we collect, use, disclose, and protect your information when
        you use the NestCalc.ai web application (the "Service"). By using the Service, you consent to
        the practices described in this policy.
      </p>

      <h2>1. Information We Collect</h2>

      <p><strong>Account Information</strong></p>
      <p>
        When you create an account, we collect your email address and an encrypted password.
        Authentication is managed by Supabase. We do not store your password in plaintext.
      </p>

      <p><strong>Property &amp; Deal Data</strong></p>
      <p>
        You may enter property details such as address, purchase price, loan terms, rental income
        estimates, operating expenses, and investment strategy preferences. This data is stored in
        your Supabase account so you can save and retrieve analyses.
      </p>

      <p><strong>Payment Information</strong></p>
      <p>
        If you subscribe to a paid tier, payment is processed by Stripe. We do not receive or store
        your full credit card number. Stripe provides us with a tokenized reference, your subscription
        status, and billing history.
      </p>

      <p><strong>Usage Data</strong></p>
      <p>
        We automatically collect technical information such as browser type, device type,
        pages visited, and timestamps. This data helps us improve performance and diagnose issues.
      </p>

      <p><strong>Location-Related Data</strong></p>
      <p>
        When you enter a property address, we use a geocoding proxy to convert that address to
        geographic coordinates. The address is sent to our server, which forwards the request to
        Nominatim (OpenStreetMap) on your behalf. We do not share your IP address with Nominatim.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide, operate, and maintain the Service</li>
        <li>Process your subscription and manage your account</li>
        <li>Run investment calculations and generate deal projections</li>
        <li>Generate AI-powered deal narratives, market intelligence, and macro dashboards</li>
        <li>Fetch real-time economic data (mortgage rates, treasury yields) for your analyses</li>
        <li>Improve, personalize, and expand the Service</li>
        <li>Communicate with you about your account, updates, or support requests</li>
        <li>Detect and prevent fraud or abuse</li>
      </ul>

      <h2>3. Third-Party Services</h2>
      <p>
        We rely on the following third-party services to operate NestCalc. Each service receives only
        the minimum data required to perform its function:
      </p>
      <ul>
        <li><strong>Supabase</strong> — Authentication and database. Stores your account credentials (hashed), saved deals, and cached API responses. Hosted in the United States.</li>
        <li><strong>Stripe</strong> — Payment processing for paid subscriptions. Receives your email and payment method. We never see or store your full card number.</li>
        <li><strong>Perplexity Sonar</strong> — Market intelligence for paid tiers. Receives the property city and state to generate local market analysis. No personal data is sent.</li>
        <li><strong>Anthropic Claude (Haiku)</strong> — AI deal narratives for paid tiers. Receives anonymized property metrics (numbers only, no address or personal data) to generate investment commentary.</li>
        <li><strong>Google Gemini</strong> — Powers macro economic dashboards for all tiers. Receives economic indicator queries. No personal or property-specific data is sent.</li>
        <li><strong>FRED API (Federal Reserve Economic Data)</strong> — Provides real-time treasury yields and mortgage rate data for all tiers. No personal data is sent.</li>
        <li><strong>Nominatim / OpenStreetMap</strong> — Geocoding service accessed through our server-side proxy. Converts property addresses to coordinates. Your IP address is not forwarded to Nominatim.</li>
        <li><strong>Netlify</strong> — Hosting and serverless functions. Serves the application and processes API requests.</li>
      </ul>

      <h2>4. Cookies &amp; Local Storage</h2>
      <p>NestCalc uses browser local storage (not traditional cookies) to:</p>
      <ul>
        <li>Maintain your authentication session (Supabase JWT token)</li>
        <li>Store your current deal inputs so they persist between page reloads</li>
        <li>Remember UI preferences (e.g., last active tab)</li>
      </ul>
      <p>
        We do not use third-party tracking cookies. We do not use advertising cookies. If Stripe or
        Supabase set cookies for session management, those are governed by their respective privacy policies.
      </p>

      <h2>5. Data Retention</h2>
      <p>
        We retain your account data and saved deals for as long as your account is active. If you
        delete your account, we will delete your personal data within 30 days, except where retention
        is required by law (e.g., payment records for tax compliance).
      </p>
      <p>
        Cached API responses (market data, macro dashboards) are stored in our database with a
        6-hour time-to-live and are automatically overwritten. These caches contain no personal data.
      </p>

      <h2>6. Data Security</h2>
      <p>We implement reasonable technical and organizational safeguards to protect your data:</p>
      <ul>
        <li>All data in transit is encrypted via HTTPS/TLS</li>
        <li>Passwords are hashed by Supabase (bcrypt)</li>
        <li>API endpoints validate JWT tokens and request origin</li>
        <li>Payment data is handled entirely by Stripe (PCI-DSS compliant)</li>
        <li>Serverless functions enforce origin validation and authentication</li>
      </ul>
      <p>
        No method of electronic transmission or storage is 100% secure. While we strive to protect
        your data, we cannot guarantee absolute security.
      </p>

      <h2>7. Your Rights</h2>
      <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
      <ul>
        <li><strong>Access</strong> — Request a copy of the personal data we hold about you.</li>
        <li><strong>Correction</strong> — Request correction of inaccurate or incomplete data.</li>
        <li><strong>Deletion</strong> — Request deletion of your personal data, subject to legal retention requirements.</li>
        <li><strong>Portability</strong> — Request your data in a portable, machine-readable format.</li>
        <li><strong>Opt-Out of Sale</strong> — We do not sell your personal data. We do not share your data with third parties for their marketing purposes.</li>
      </ul>
      <p>
        <strong>California Residents (CCPA):</strong> You have the right to know what personal information we collect, request its deletion, and opt out of any sale of personal information. We do not sell personal information. To exercise your rights, contact us at privacy@nestcalc.ai.
      </p>
      <p>
        <strong>European Residents (GDPR):</strong> If you are located in the European Economic Area, you have additional rights including the right to lodge a complaint with your local data protection authority. Our lawful basis for processing is contract performance (providing the Service) and legitimate interest (improving the Service).
      </p>

      <h2>8. Children's Privacy</h2>
      <p>
        NestCalc is not directed to individuals under the age of 18. We do not knowingly collect
        personal information from children. If we become aware that a child under 18 has provided us
        with personal data, we will take steps to delete that information promptly. If you believe a
        child has provided us with personal data, please contact us at privacy@nestcalc.ai.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. When we make material changes, we will
        update the "Last Updated" date at the top of this page and, where appropriate, notify you via
        email or an in-app notice. Your continued use of the Service after changes are posted
        constitutes acceptance of the updated policy.
      </p>

      <h2>10. Contact Us</h2>
      <p>If you have questions about this Privacy Policy or wish to exercise your data rights, please contact us:</p>
      <ul>
        <li><strong>Email:</strong> privacy@nestcalc.ai</li>
        <li><strong>Mailing Address:</strong> NestCalc.ai LLC, 30 N Gould St Ste R, Sheridan, WY 82801</li>
        <li><strong>Entity:</strong> NestCalc.ai, LLC — a Wyoming limited liability company</li>
      </ul>
      <p><strong>Effective Date:</strong> March 30, 2026</p>
    </>
  )
}
