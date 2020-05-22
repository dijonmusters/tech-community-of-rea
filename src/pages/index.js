import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import styled from 'styled-components'
import { Link } from 'gatsby'
import useUser from '../hooks/useUser'
import Card from '../components/Card/Card'

const Container = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const CardLayout = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(auto-fit, 53mm);
  grid-gap: 0.5rem;
`

const Button = styled(Link)`
  z-index: 100;
  position: fixed;
  top: 0.5rem;
  right: 0.5rem;
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
`

const CHARACTERS = gql`
  query {
    characters {
      id
      username
      areaOfBusiness
      jobLevel
      language
      ide
      indentWidth
      dreamTitle
      imageUrl
    }
  }
`

const renderCharacter = (character) => (
  <Card character={character} key={character.id} />
)

const Index = () => {
  const { loading, error, data } = useQuery(CHARACTERS)
  const { isLoggedIn } = useUser()

  return (
    <Container>
      {loading && <p>Loading...</p>}
      {error && <p>Error :(</p>}
      {!isLoggedIn() ? (
        <Button to="/new-character">Create new character</Button>
      ) : (
        <Button to="/area-of-business">Change your character</Button>
      )}

      {data && <CardLayout>{data.characters.map(renderCharacter)}</CardLayout>}
    </Container>
  )
}

export default Index
