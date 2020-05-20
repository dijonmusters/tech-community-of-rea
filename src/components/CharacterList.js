import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled(Link)`
  font-family: inherit;
  font-size: 100%;
  background: #ff5157;
  color: white;
  padding: 1rem 2rem;
  text-decoration: none;
  font-weight: 700;

  &:hover {
    cursor: pointer;
  }
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
      <Button to='/new-character'>Create new character</Button>
    </Container>
  );
};

export default CharacterList;
