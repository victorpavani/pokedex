import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Flex, Box, Image, Text, Button } from '@chakra-ui/react';
import './styles.css';

interface PokemonDetails {
    name: string;
    id: number;
    types: { type: { name: string } }[];
    sprites: { front_default: string };
}

const PokemonList: React.FC = () => {
    const [detailedPokemonList, setDetailedPokemonList] = useState<PokemonDetails[]>([]);
    const [displayedPokemons, setDisplayedPokemons] = useState(14);
    const [hoveredPokemon, setHoveredPokemon] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isValidPokemon, setIsValidPokemon] = useState<boolean>(true);
    const [allPokemons, setAllPokemons] = useState<PokemonDetails[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${displayedPokemons}`);
                const detailedData: PokemonDetails[] = [];

                for (const pokemon of response.data.results) {
                    const detailsResponse = await axios.get<PokemonDetails>(pokemon.url);
                    detailedData.push(detailsResponse.data);
                }

                setAllPokemons(detailedData);
                setDetailedPokemonList(detailedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [displayedPokemons]);

    const loadMore = () => {
        setDisplayedPokemons(displayedPokemons + 7);
        setDetailedPokemonList(allPokemons.slice(0, displayedPokemons + 7));
    };

    const handleMouseEnter = (index: number) => {
        setHoveredPokemon(index);
    };

    const handleMouseLeave = () => {
        setHoveredPokemon(null);
    };

    const typeColors: { [key: string]: string } = {
        fire: 'red',
        poison: 'purple',
        grass: 'green',
        water: 'lightblue',
        flying: 'darkblue',
        electric: 'yellow',
        normal: 'darkgrey',
        bug: 'black',
        fairy: 'pink',
        ground: 'brown',
    };

    const searchPokemon = (term: string) => {
        setSearchTerm(term);

        if (term === '') {
            setDetailedPokemonList(allPokemons.slice(0, displayedPokemons));
            setIsValidPokemon(true);
        } else {
            const filteredPokemons = allPokemons.filter(
                (pokemon) => pokemon.name.toLowerCase() === term.toLowerCase()
            );

            if (filteredPokemons.length === 0) {
                setIsValidPokemon(false);
            } else {
                setDetailedPokemonList(filteredPokemons);
                setIsValidPokemon(true);
            }
        }
    };

    return (
        <div>
            <h1
                style={{
                    textAlign: 'left',
                    color: '#d1d100',
                    fontFamily: 'Pokemon',
                    fontSize: '2em',
                    textShadow: '5px 5px blue',
                    marginLeft: '20px',
                }}
            >
                Pokédex
            </h1>
            {!isValidPokemon && (
                <Text fontWeight="bold" color="red">
                    Nome inválido
                </Text>
            )}
            <Input
                placeholder="Pesquisar Pokémon"
                value={searchTerm}
                onChange={(e) => searchPokemon(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{
                    margin: '20px 0',
                    marginLeft: '5px',
                    display: 'block',
                    padding: '10px',
                    borderRadius: '8px',
                    width: 'calc(100% - 40px)',
                    border: '1px solid #999999',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
            />
            <Flex flexWrap="wrap">
                {detailedPokemonList.map((pokemon: PokemonDetails, index: number) => (
                    <Box
                        key={index}
                        boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)"
                        borderRadius="8px"
                        padding="10px"
                        margin="10px"
                        textAlign="center"
                        width="200px"
                        backgroundColor={hoveredPokemon === index ? '#dddbdb' : ''}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Image
                            src={pokemon.sprites.front_default}
                            alt={String(pokemon.id)}
                            width={hoveredPokemon === index ? '140px' : '120px'}
                            height={hoveredPokemon === index ? '140px' : '120px'}
                            transition="width 0.3s, height 0.3s"
                        />
                        <Text fontSize="16px">#{pokemon.id.toString().toLowerCase()}</Text>
                        <Text fontSize="20px" marginBottom="5px" fontWeight="bold">
                            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                        </Text>
                        <Flex justifyContent="center" gap="5px" flexWrap="wrap">
                            {pokemon.types.map((type, typeIndex) => (
                                <Box
                                    key={typeIndex}
                                    borderRadius="5px"
                                    padding="5px"
                                    margin="5% 0"
                                    backgroundColor={typeColors[type.type.name] || 'white'}
                                    color="white"
                                    fontWeight="bolder"
                                    textAlign="center"
                                    lineHeight="1.5"
                                >
                                    {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                                </Box>
                            ))}
                        </Flex>
                    </Box>
                ))}
            </Flex>
            <Button
                backgroundColor="purple"
                color="white"
                fontWeight="bold"
                padding="10px 20px"
                borderRadius="8px"
                margin="20px auto"
                display="block"
                cursor="pointer"
                border="none"
                boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)"
                transition="background-color 0.3s, transform 0.3s"
                onClick={loadMore}
                _hover={{ backgroundColor: '#4A0080' }}
            >
                Carregar mais
            </Button>
        </div>
    );
};

export default PokemonList;
