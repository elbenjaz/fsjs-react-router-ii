import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import Error404 from "./Error404";
import axios from "axios";

const Pokemon = () => {
    const url = "https://pokeapi.co/api/v2/pokemon/{id_pokemon}";
    const { id_pokemon } = useParams();

    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(false);

    const getPokemonAPI = async () => {
        try {
            setLoading(true);

            const response = await axios.get(url.replace("{id_pokemon}", id_pokemon));

            const pokemonAPI = response.data;
            const colors = ["black", "blue", "brown", "gray", "green", "pink", "purple", "red", "white", "yellow"];

            setPokemon({
                id         : pokemonAPI.id,
                name       : pokemonAPI.name,
                image_mini : pokemonAPI.sprites.front_default,
                image      : pokemonAPI.sprites.other.dream_world.front_default,
                xp         : pokemonAPI.base_experience,
                stats      : pokemonAPI.stats?.map(stat => ({
                    name  : stat.stat.name,
                    value : stat.base_stat
                })),
                types      : pokemonAPI.types?.map(type => type.type?.name),
                color      : colors[Math.floor(Math.random() * colors.length)]
            });
        } catch (error) {
            console.error("Error trying to get remote data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPokemonAPI();
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

    if (!pokemon) {
        return <Error404 />
    }

    return (
        <>
            <div className="text-center">
                <Link className="btn btn-primary" to="/pokemon">Back</Link>
            </div>

            <div className="Pokemon d-flex flex-wrap justify-content-center">
                <div className="pokemon-card d-flex flex-column justify-content-between text-center" data-color={pokemon.color}>
                    <div className="pokemon-card-header d-flex justify-content-between align-items-center">
                        <span className="badge text-bg-light fs-6">
                            #{pokemon.id.toString().padStart(3, "0")}
                        </span>
                        <img src={pokemon.image_mini} />
                    </div>

                    <img className="my-4" src={pokemon.image} />

                    <b>{pokemon.name.toUpperCase()}</b>

                    <b>XP : {pokemon.xp}</b>

                    <div className="my-2">
                        {pokemon.types.map((type, key) => (
                            <span key={key} className="pokemon-card-type badge text-bg-secondary mx-1" data-type={type}>{type}</span>
                        ))}
                    </div>

                    <div className="my-2 d-flex flex-wrap justify-content-between">
                        {pokemon.stats.map(({ name, value }, key) => (
                            <span key={key} className="pokemon-card-type badge text-bg-light mx-1">{name} : {value}</span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Pokemon;
