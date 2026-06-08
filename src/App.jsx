import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import AppRoutes from './AppRoutes.jsx';
import useGetDimensions from './hooks/useGetDimensions.js';

function App() {
  useGetDimensions();

  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;
