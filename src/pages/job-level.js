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
  mutation UpdateJobLevel($id: String!, $jobLevel: String!) {
    updateCharacter(input: { id: $id, jobLevel: $jobLevel }) {
      id
    }
  }
`

const options = ['Associate/Grad', 'Mid', 'Senior', 'Lead', '$$$']

const JobLevel = () => {
  const [updateCharacter] = useMutation(UPDATE_CHARACTER)
  const { register, handleSubmit, errors } = useForm()
  const { getId } = useUser()

  const onSubmit = async ({ jobLevel }) => {
    const id = getId()
    await updateCharacter({ variables: { id, jobLevel } })
    navigate('/language')
  }

  return (
    <Page>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading>How much XP do you have?</Heading>
        <OptionsContainer>
          {options.map((option) => (
            <Option key={option}>
              <OptionInput
                type="radio"
                id={option}
                name="jobLevel"
                value={option}
                ref={register({ required: true })}
              />
              <OptionLabel htmlFor={option}>{option}</OptionLabel>
            </Option>
          ))}
        </OptionsContainer>
        {errors.jobLevel && 'Job level is required.'}
        <Button type="submit">Next</Button>
      </Form>
    </Page>
  )
}

export default JobLevel
