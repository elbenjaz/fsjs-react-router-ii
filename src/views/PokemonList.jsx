import { useContext, useEffect, useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { PokemonContext } from "../context/PokemonContext";
import axios from "axios";
import Swal from "sweetalert2";

const PokemonList = () => {
    const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit={max_pokemon}";
    const max_pokemon = 151;

    const { pokemonList, setPokemonList, pokemonID, setPokemonID } = useContext(PokemonContext);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const getPokemonListAPI = async () => {
        if (pokemonList.length) {
            return true;
        }

        try {
            setLoading(true);

            const response = await axios.get(url.replace("{max_pokemon}", max_pokemon));
            const { results : pokemonAPI } = response.data;

            setPokemonList(pokemonAPI.map((pokemon, index) => ({ name: pokemon.name, id: index + 1 })));
        } catch (error) {
            console.error("Error trying to get remote data:", error);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!pokemonID) {
            Swal.fire({
                title : "Oops!",
                text  : "Select a pokémon",
                icon  : "error",
                confirmButtonText : "OK",
            });
            
            return false;
        }
        
        navigate("/pokemon/"+pokemonID);
    };

    useEffect(() => {
        getPokemonListAPI();
    }, []);

    if (loading) {
        return (
            <div className="Pokemon">
                <div className="pokemon-loading text-center mt-5">
                    <p>Loading Pokémon data ...</p>
                    <img src="../loading.png" />
                </div>
            </div>
        );
    }

    return (
        <Form onSubmit={onSubmit}>
            <div className="d-flex flex-column align-items-center">
                <Form.Group className="mb-2 text-center">
                    <Form.Label>Pokémon</Form.Label>
                    <Form.Select onChange={e => setPokemonID(e.target.value)} value={pokemonID}>
                        <option value="">-- Select --</option>
                        {pokemonList.map(pokemon => (
                            <option key={pokemon.id} value={pokemon.id}>
                                #{pokemon.id.toString().padStart(3, "0")} {pokemon.name.toUpperCase()}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button type="submit" variant="primary">Show info</Button>
            </div>
        </Form>
    );
};

export default PokemonList;

