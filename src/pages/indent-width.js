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

const Heading = styled.h2`
  font-size: 3rem;
  color: #666;
  margin-bottom: 1rem;
  text-transform: uppercase;
  font-weight: 500;
`

const OptionsContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`

const Option = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  text-align: center;
  margin-left: 0.25rem;
  margin-right: 0.25rem;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`

const OptionInput = styled.input`
  display: none;

  &:checked + label {
    background: #ff6254;
    color: white;
  }
`

const OptionLabel = styled.label`
  display: block;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  color: #555;
  transition: all ease-in-out 0.1s;

  &:hover {
    cursor: pointer;
    background: #ff6254;
    color: white;
    transform: scale(1.05);
  }
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

const UPDATE_CHARACTER = gql`
  mutation UpdateIndentWidth($id: String!, $indentWidth: String!) {
    updateCharacter(input: { id: $id, indentWidth: $indentWidth }) {
      id
    }
  }
`

const options = ['Tab', '1 space', '2 spaces', '3 spaces', '4 spaces (Tab)']

const IndentWidth = () => {
  const [updateCharacter] = useMutation(UPDATE_CHARACTER)
  const { register, handleSubmit, errors } = useForm()
  const id = new URLSearchParams(window.location.search.substring(1)).get('id')

  const onSubmit = async ({ indentWidth }) => {
    await updateCharacter({ variables: { id, indentWidth } })
    navigate(`/dream-title?id=${id}`)
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading>How much space do you need around you?</Heading>
        <OptionsContainer>
          {options.map((option) => (
            <Option key={option}>
              <OptionInput
                type="radio"
                id={option}
                name="indentWidth"
                value={option}
                ref={register({ required: true })}
              />
              <OptionLabel htmlFor={option}>{option}</OptionLabel>
            </Option>
          ))}
        </OptionsContainer>
        {errors.jobLevel && 'Indent width is required.'}
        <Button type="submit">Next</Button>
      </Form>
    </Container>
  )
}

export default IndentWidth
