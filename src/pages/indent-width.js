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
  const { getId } = useUser()

  const onSubmit = async ({ indentWidth }) => {
    const id = getId()
    await updateCharacter({ variables: { id, indentWidth } })
    navigate('/dream-title')
  }

  return (
    <Page>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading>How much personal space do you need?</Heading>
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
    </Page>
  )
}

export default IndentWidth
