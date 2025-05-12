// App.tsx
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import { AppRouter } from './routes/AppRouter';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    console.log('remounted App');
  }, []);
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}
