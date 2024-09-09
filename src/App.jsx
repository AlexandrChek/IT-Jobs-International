import Header from './components/Header'
import Footer from './components/Footer'
import { Provider } from 'react-redux'
import store from './store.js'
import AppRoutes from './AppRoutes.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header/>
        <AppRoutes/>
        <Footer/>
      </Router>
    </Provider>
  )
}

export default App
