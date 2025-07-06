/*import React from 'react';

const Header = () => (
  <header className="header">
    <h1>Personal Finance Assistant</h1>
    <p>Track, manage, and understand your financial activities effortlessly.</p>
  </header>
);

export default Header;*/

import React from 'react';

const Header = () => (
  <>
    <style>
      {`
        .header {
          margin-bottom: 2rem;
        }

        .header-title {
          font-size: 2.5rem;
          font-weight: bold;
          background: linear-gradient(to right, #2563eb, #7c3aed); /* blue to purple */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }

        .header-subtitle {
          color: #4b5563; /* gray-600 */
          font-size: 1rem;
        }
      `}
    </style>
    <header className="header">
      <h1 className="header-title">Personal Finance Assistant</h1>
      <p className="header-subtitle">
        Track, manage, and understand your financial activities effortlessly.
      </p>
    </header>
  </>
);

export default Header;
