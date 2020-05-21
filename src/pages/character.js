import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const CHARACTER = gql`
  query Character($id: String!) {
    character(input: { id: $id }) {
      id
      username
      jobLevel
      language
      ide
      indentWidth
      dreamTitle
    }
  }
`

const renderCharacter = ({
  id,
  username,
  jobLevel,
  language,
  ide,
  indentWidth,
  dreamTitle,
}) => (
  <div key={id}>
    <p>{username}</p>
    <p>{jobLevel}</p>
    <p>{language}</p>
    <p>{ide}</p>
    <p>{indentWidth}</p>
    <p>{dreamTitle}</p>
  </div>
)

const Character = () => {
  const id = new URLSearchParams(window.location.search.substring(1)).get('id')
  const { loading, error, data } = useQuery(CHARACTER, { variables: { id } })

  return (
    <Container>
      {loading && <p>Loading...</p>}
      {error && <p>Error :(</p>}
      {data && renderCharacter(data.character)}
    </Container>
  )
}

export default Character
