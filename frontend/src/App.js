import Introduction from "./Pages/Introduction/Introduction";
import About from "./Pages/About/About";
import Documentation from './Pages/Documentation/Documentation';
import SignInForm from "./Pages/SignInForm/SignInForm";
import SignUpForm from "./Pages/SignUpForm/SignUpForm";
import BookParking from "./Pages/BookParking/BookParking";
import SearchParking from "./Pages/SearchParking/SearchParking";
import ProvideParking from "./Pages/ProvideParking/ProvideParking";
import AddParking from "./Pages/AddParking/AddParking";
import { Routes, Route } from 'react-router-dom';
import BookSlot from "./Pages/BookSlot/BookSlot";
import Checkout from "./Pages/Checkout/Checkout";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Introduction />} />
      <Route path='/about' element={<About />} />
      <Route path='/documentation' element={<Documentation />} />
      <Route path='/signup' element={<SignUpForm />} />
      <Route path='/signin' element={<SignInForm />} />
      <Route path='/bookparking' element={<BookParking />} />
      <Route path='/searchparking' element={<SearchParking />} />
      <Route path='/provideparking' element={<ProvideParking />} />
      <Route path='/addparking' element={<AddParking />} />
      <Route path='/bookslot' element={<BookSlot />} />
      <Route path='/checkout' element={<Checkout />} />
    </Routes>
  );
}

export default App;
