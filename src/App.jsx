import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";

import Error404 from "./views/Error404";
import Home from "./views/Home";
import Pokemon from "./views/Pokemon";
import PokemonList from "./views/PokemonList";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    return (
        <>
            <Menu />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pokemon" element={<PokemonList />} />
                <Route path="/pokemon/:id_pokemon" element={<Pokemon />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </>
    );
};

export default App;
