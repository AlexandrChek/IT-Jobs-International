import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import AppRoutes from './AppRoutes.jsx';
import useSaveWindowHeight from './hooks/useSaveWindowHeight.js';

function App() {
  useSaveWindowHeight();

  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;
