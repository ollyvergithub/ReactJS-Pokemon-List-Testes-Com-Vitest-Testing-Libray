import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { PokemonType } from "../../types/PokemonTypes";
import { useNavigate } from "react-router-dom";


// *** Injeção de dependencias ***
//import { fetchPokemonList } from "../services/PokemonService";


// *** Injeção de dependencias ***
interface IProps {
    fetchPokemonList: () => Promise<PokemonType[]>;
}

export default function Dashboard({fetchPokemonList}:IProps) {

    const navigate = useNavigate()

    const [pokemons, setPokemons] = useState<PokemonType[]>([]);

    useEffect(() => {

        // *** Injeção de dependencias o fetchPokemonList foi injetado dentro de Routes  ***
        (async () => {
            const data = await fetchPokemonList();

            setPokemons(data);
        })();

        // async function loadData() {
        //     const response = await fetch("http://localhost:3000/pokemon");

        //     const data = await response.json();

        //     setPokemons(data);
        // }

        // loadData();
    }, [fetchPokemonList]);

    function handleNavigate(id: number){

        navigate(`/pokemon-detail/${id}`)
    }

    return (
        <div className={styles.container}>
            <h1>Dashboard</h1>
            <ul className={styles["container-pokemons"]}>
                {pokemons.map((pokemon) => (
                    <li key={pokemon.id} onClick={() => handleNavigate(pokemon.id)}>
                        <h2>{pokemon.name}</h2>
                        <img src={pokemon.image} alt={pokemon.name} />
                        <strong>{pokemon.type}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
}
