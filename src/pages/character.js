import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import styled from 'styled-components'

import Card from '../components/Card/Card'

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

const Character = () => {
  const id =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search.substring(1)).get('id')
  const { loading, error, data } = useQuery(CHARACTER, { variables: { id } })

  return (
    <Container>
      {loading && <p>Loading...</p>}
      {error && <p>Error :(</p>}
      {data && <Card character={data.character} />}
    </Container>
  )
}

export default Character
