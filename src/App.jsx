import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import AppRoutes from './AppRoutes.jsx';
import Modal from './components/Modal.jsx';
import useCloseModal from './hooks/useCloseModal.js';
import useSaveWindowHeight from './hooks/useSaveWindowHeight.js';

function App() {
  useSaveWindowHeight();
  const closeModal = useCloseModal();

  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
      <Modal modalName="modalInfo">
        <button onClick={closeModal}>Close</button>
      </Modal>
    </>
  );
}

export default App;
