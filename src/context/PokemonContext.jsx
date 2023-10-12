import { createContext, useState } from "react";

const PokemonProvider = ({ children }) => {
    const [pokemonList, setPokemonList] = useState([]);
    const [pokemonID, setPokemonID] = useState("");

    return (
        <PokemonContext.Provider
            value={{ 
                pokemonList, setPokemonList, 
                pokemonID, setPokemonID
            }}>
            {children}
        </PokemonContext.Provider>
    );
};

export const PokemonContext = createContext();
export default PokemonProvider;
