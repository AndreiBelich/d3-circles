import React from "react";
import { useGetPokemonByNameQuery } from "../../services/pokemon";

const Pokemon = () => {
    const { data, error, isLoading } = useGetPokemonByNameQuery("ditto");

    console.log("Component POKEMON: ", data);
    const hook = useGetPokemonByNameQuery("ditto"/*, { pollingInterval: 5000}*/);
    console.log("Hook ", hook);

    return (
        <div>
            {error ? (
                <> Oh no, there was an error</>
            ): isLoading ? (
                <>Loading...</>
            ) : data ? (
                <>
                <h3>{data.species.name}</h3>
                <img src={data.sprites.front_shiny} alt={data.species.name}/>
                </>
            ) : null}
        </div>
    )
}

export default Pokemon;