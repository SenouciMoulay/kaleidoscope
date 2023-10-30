import './App.css'
import Film from './components/films/Film';
import logoImage from "/Users/moulay/Documents/Kaleidoscope/kaleidoscope/src/assets/logo/logo1.png";


function App() {

  return (
    <div>
      <img
      src={logoImage}
      alt='Logo'
      className="fixed w-46 h-48 pl-10 pt-4 inset-0 z-10"
      />
      <Film/>
    </div>
  )
}

export default App
