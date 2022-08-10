import '../styles/globals.css';
import { AuthProvider } from '../context/AuthProvider';
import { ContactosProvider } from '../context/ContactosProvider';
import { ChatProvider } from '../context/ChatProvider';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ContactosProvider>
        <ChatProvider>
          <Component {...pageProps} />
        </ChatProvider>
      </ContactosProvider>
    </AuthProvider>
  )
}

export default MyApp
