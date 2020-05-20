import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { navigate } from 'gatsby'
import styled from 'styled-components'

const Container = styled.div`
  flex: 1;
  display: flex;
`

const Form = styled.form`
  max-width: 800px;
  margin: 0 auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Label = styled.label`
  font-size: 3rem;
  color: #666;
  margin-bottom: 1rem;
  text-transform: uppercase;
`

const Input = styled.input`
  line-height: 2;
  border: none;
  padding: 1rem 2rem;
  margin-bottom: 1rem;
  font-size: 3rem;
  color: #555;
`

const Button = styled.button`
  align-self: flex-end;
  border: 0;
  font-family: inherit;
  font-size: 1.5rem;
  background: #ff5157;
  color: white;
  font-weight: 700;
  padding: 1rem 6rem;

  &:hover {
    cursor: pointer;
  }
`

const CREATE_CHARACTER = gql`
  mutation CreateCharacter($username: String!) {
    createCharacter(input: { username: $username }) {
      id
    }
  }
`

const NewCharacter = () => {
  const [createCharacter] = useMutation(CREATE_CHARACTER)
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async ({ username }) => {
    const { data } = await createCharacter({ variables: { username } })
    const { id } = data.createCharacter
    navigate(`/job-level?id=${id}`)
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="username">Nickname</Label>
        <Input name="username" ref={register({ required: true })} />
        {errors.username && 'Username is required.'}
        <Button type="submit">Next</Button>
      </Form>
    </Container>
  )
}

export default NewCharacter
