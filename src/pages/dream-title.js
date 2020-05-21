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

const Amount = styled.span`
  display: block;
  font-size: 1rem;
  color: #777;
  margin-bottom: 0.5rem;
`
const Title = styled.span`
  display: block;
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
  mutation UpdateDreamTitle($id: String!, $dreamTitle: String!) {
    updateCharacter(input: { id: $id, dreamTitle: $dreamTitle }) {
      id
    }
  }
`

const options = [
  '$ Lead',
  '$$ EM',
  '$$$ CTO',
  '$$$$ CEO',
  '$$$$$ Phillip Price',
]

const DreamTitle = () => {
  const [updateCharacter] = useMutation(UPDATE_CHARACTER)
  const { register, handleSubmit, errors } = useForm()
  const id = new URLSearchParams(window.location.search.substring(1)).get('id')

  const onSubmit = async ({ dreamTitle }) => {
    await updateCharacter({ variables: { id, dreamTitle } })
    navigate(`/image-upload?id=${id}`)
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading>What will be your final evolution?</Heading>
        <OptionsContainer>
          {options.map((option) => {
            const [amount, ...titleBits] = option.split(' ')
            const title = titleBits.join(' ')

            return (
              <Option key={option}>
                <OptionInput
                  type="radio"
                  id={option}
                  name="dreamTitle"
                  value={option}
                  ref={register({ required: true })}
                />
                <OptionLabel htmlFor={option}>
                  <Amount>{amount}</Amount>
                  <Title>{title}</Title>
                </OptionLabel>
              </Option>
            )
          })}
        </OptionsContainer>
        {errors.jobLevel && 'Dream title is required.'}
        <Button type="submit">Save character</Button>
      </Form>
    </Container>
  )
}

export default DreamTitle
