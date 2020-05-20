import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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

  return (
    <Container>
      {loading && <p>Loading...</p>}
      {error && <p>Error :(</p>}
      {data && data.characters.map(renderCharacter)}
    </Container>
  );
};

export default CharacterList;
