import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './AppRoutes.jsx';
import { saveWindowHeight } from './methods.js';

function App() {
  saveWindowHeight();

  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;
