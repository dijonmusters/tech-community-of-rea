import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { navigate } from 'gatsby'
import useUser from '../hooks/useUser'
import {
  Page,
  Form,
  Heading,
  OptionsContainer,
  Option,
  OptionInput,
  OptionLabel,
  Button,
} from '../components/styled'

const UPDATE_CHARACTER = gql`
  mutation UpdateLanguage($id: String!, $language: String!) {
    updateCharacter(input: { id: $id, language: $language }) {
      id
    }
  }
`

const options = ['Ruby', 'JavaScript', 'Scala', 'Python', 'PHP (other)']

const Language = () => {
  const [updateCharacter] = useMutation(UPDATE_CHARACTER)
  const { register, handleSubmit, errors } = useForm()
  const { getId } = useUser()

  const onSubmit = async ({ language }) => {
    const id = getId()
    await updateCharacter({ variables: { id, language } })
    navigate('/ide')
  }

  return (
    <Page>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading>What is your weapon of choice?</Heading>
        <OptionsContainer>
          {options.map((option) => (
            <Option key={option}>
              <OptionInput
                type="radio"
                id={option}
                name="language"
                value={option}
                ref={register({ required: true })}
              />
              <OptionLabel htmlFor={option}>{option}</OptionLabel>
            </Option>
          ))}
        </OptionsContainer>
        {errors.language && <p>Language is required.</p>}
        <Button type="submit">Next</Button>
      </Form>
    </Page>
  )
}

export default Language
