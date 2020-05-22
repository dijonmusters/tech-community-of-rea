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
  mutation UpdateIde($id: String!, $ide: String!) {
    updateCharacter(input: { id: $id, ide: $ide }) {
      id
    }
  }
`

const options = ['VS Code', 'Vim/Emacs/CLI', 'Jetbrains', 'Notepad++', 'Other']

const Ide = () => {
  const [updateCharacter] = useMutation(UPDATE_CHARACTER)
  const { register, handleSubmit, errors } = useForm()
  const { getId } = useUser()

  const onSubmit = async ({ ide }) => {
    const id = getId()
    await updateCharacter({ variables: { id, ide } })
    navigate('/indent-width')
  }

  return (
    <Page>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading>What is your primary element?</Heading>
        <OptionsContainer>
          {options.map((option) => (
            <Option key={option}>
              <OptionInput
                type="radio"
                id={option}
                name="ide"
                value={option}
                ref={register({ required: true })}
              />
              <OptionLabel htmlFor={option}>{option}</OptionLabel>
            </Option>
          ))}
        </OptionsContainer>
        {errors.jobLevel && 'IDE is required.'}
        <Button type="submit">Next</Button>
      </Form>
    </Page>
  )
}

export default Ide
