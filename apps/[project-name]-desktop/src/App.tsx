import { useState } from 'react';
import './App.css';
import { Button, Image, Link } from 'ui-components';
import reactLogo from './assets/react.svg';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    setUsers([]);

    try {
      const response = await fetch('http://localhost:3000/users');
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      const data = (await response.json()) as User[];
      setUsers(data);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('Failed to fetch')) {
          setError('Connection failed. Is the local NestJS API running?');
        } else {
          setError(err.message);
        }
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Desktop</h1>
        
        {/* --- Image Component --- */}
        <p>This Image renders a standard `&lt;img&gt;` tag:</p>
        <Image src={reactLogo} alt="React logo" width="120" />

        {/* --- Link Component --- */}
        <p>This Link renders a standard `&lt;a&gt;` tag:</p>
        <Link 
          href="https://www.electronjs.org/" 
          target="_blank"
          style={{ color: 'cyan' }}
        >
          Learn about Electron
        </Link>
        
        <div className="card">
          <Button
            onClick={handleFetchUsers}
            disabled={isLoading}
            variant="contained"
          >
            {isLoading ? 'Loading...' : 'Fetch Users from Local DB'}
          </Button>
        </div>

        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        <h2>Users List:</h2>
        {!isLoading && users.length === 0 && !error && (
          <p>Click the button to fetch users.</p>
        )}
        {users.length > 0 && (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <strong>Name:</strong> {user.firstName} {user.lastName} |{' '}
                <strong>Email:</strong> {user.email} | <strong>Role:</strong>{' '}
                {user.role}
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;