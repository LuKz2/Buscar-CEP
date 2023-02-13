import {useState} from 'react';
import {FiSearch} from 'react-icons/fi'
import './stylesmain.css'
import api from './services/api';

function App() {

  const[input, setInput] = useState('') 
  const[cep, setCep] = useState({});
  

  async function h(){

    if(input === ''){
      alert("Esta vazio")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");
    }catch{
      alert("Erro ao buscar");
      setInput("")
    }
  }
  
  
  return (
    <div className="container">
     <h1 className="title">Procurar seu CEP</h1>
     <div className="inputext">
      <input
      type="text"
      placeholder="Digite seu CEP"
      value={input}
      onChange={(event) => setInput(event.target.value) }
      ></input>

      <button className="botao">
        <FiSearch size={30} color="#000" onClick={h}/>
      </button>
     </div>

     {Object.keys(cep).length > 0 && (
          <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento} </span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
              </main>
     )}
     
    </div>
  );
}

export default App;
