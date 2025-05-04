import Link from 'next/link';

const Header = () => {
  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <nav>
        {/* Basic Header Content - Add Links later */}
        <Link href="/">Las Vegas Smokeout</Link>
        {/* TODO: Add navigation links (Home, Events, Attendees, etc.) */}
        <span style={{ marginLeft: '2rem' }}>(Nav links go here)</span>
      </nav>
    </header>
  );
};

export default Header;
