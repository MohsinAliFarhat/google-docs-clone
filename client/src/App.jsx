import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './components/Home/Home';
import { ListDocuments } from './components/ListDocuments/ListDocuments';
import { Document } from './components/Document/Document';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
      <Route exact path="/documents/:id" element={<Document />} />
      <Route exact path="/documents" element={<ListDocuments />} />
        <Route exact path="/" element={<Home />}>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
