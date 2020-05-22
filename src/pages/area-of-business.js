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
  mutation UpdateAreaOfBusiness($id: String!, $areaOfBusiness: String!) {
    updateCharacter(input: { id: $id, areaOfBusiness: $areaOfBusiness }) {
      id
    }
  }
`

const options = ['Residential', 'Spacely', 'Real Commercial', 'Other']

const AreaOfBusiness = () => {
  const [updateCharacter] = useMutation(UPDATE_CHARACTER)
  const { register, handleSubmit, errors } = useForm()
  const { getId } = useUser()

  const onSubmit = async ({ areaOfBusiness }) => {
    const id = getId()
    await updateCharacter({ variables: { id, areaOfBusiness } })
    navigate('/job-level')
  }

  return (
    <Page>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading>What is your alignment?</Heading>
        <OptionsContainer>
          {options.map((option) => (
            <Option key={option}>
              <OptionInput
                type="radio"
                id={option}
                name="areaOfBusiness"
                value={option}
                ref={register({ required: true })}
              />
              <OptionLabel htmlFor={option}>{option}</OptionLabel>
            </Option>
          ))}
        </OptionsContainer>
        {errors.areaOfBusiness && 'Area of business is required.'}
        <Button type="submit">Next</Button>
      </Form>
    </Page>
  )
}

export default AreaOfBusiness
