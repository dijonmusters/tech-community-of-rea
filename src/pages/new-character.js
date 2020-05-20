import React from 'react'
import styled from 'styled-components'
import CharacterForm from '../components/CharacterForm'

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const NewCharacter = () => (
  <Container>
    <CharacterForm />
  </Container>
)

export default NewCharacter
