import Link from 'next/link';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Register', path: '/registration' },
  { label: 'Host Hotel', path: '/host-hotel' },
  { label: 'T-Shirts', path: '/t-shirts' },
  { label: 'Events', path: '/events' },
  { label: 'Attendees', path: '/attendees' },
  { label: 'Sponsors', path: '/sponsors' },
  { label: 'Links', path: '/links' },
];

const Header = () => {
  return (
    <header
      style={{
        padding: '1rem 1.5rem', // Padding top/bottom and left/right
        borderBottom: '1px solid #e2e8f0', // Light border
        backgroundColor: '#ffffff', // White background
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', // Subtle shadow
      }}
    >
      <nav
        style={{
          maxWidth: '1200px', // Max width of content
          margin: '0 auto', // Center content
          display: 'flex',
          justifyContent: 'space-between', // Space out logo and links
          alignItems: 'center', // Vertically align items
        }}
      >
        <Link
          href="/"
          style={{
            fontWeight: 'bold',
            fontSize: '1.75rem', // Larger font size
            textDecoration: 'none',
            color: '#1a202c', // Dark gray color
          }}
        >
          Las Vegas Smokeout
        </Link>
        <ul
          style={{
            listStyle: 'none', // Remove default bullet points
            display: 'flex', // Arrange items horizontally
            gap: '2rem', // Space between links
            margin: 0,
            padding: 0,
            fontSize: '1rem',
          }}
        >
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                style={{
                  textDecoration: 'none',
                  color: '#2b6cb0',
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
