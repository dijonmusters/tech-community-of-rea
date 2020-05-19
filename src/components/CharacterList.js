import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const CHARACTERS = gql`
  query {
    characters {
      id
      username
      jobLevel
      ide
      language
    }
  }
`;

const renderCharacter = ({ id, username }) => (
  <div key={id}>
    <p>{username}</p>
  </div>
);

const CharacterList = () => {
  const { loading, error, data } = useQuery(CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.characters.map(renderCharacter);
};

export default CharacterList;
