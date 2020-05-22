import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import styled from 'styled-components'

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

const renderCharacter = ({
  id,
  username,
  areaOfBusiness,
  jobLevel,
  language,
  ide,
  indentWidth,
  dreamTitle,
  imageUrl,
}) => (
  <div key={id}>
    <p>{username}</p>
    <p>{areaOfBusiness}</p>
    <p>{jobLevel}</p>
    <p>{language}</p>
    <p>{ide}</p>
    <p>{indentWidth}</p>
    <p>{dreamTitle}</p>
    <p>{imageUrl}</p>
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
