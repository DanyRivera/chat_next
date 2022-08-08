import '../styles/globals.css';
import { AuthProvider } from '../context/AuthProvider';
import { ContactosProvider } from '../context/ContactosProvider';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ContactosProvider>
        <Component {...pageProps} />
      </ContactosProvider>
    </AuthProvider>
  )
}

export default MyApp
