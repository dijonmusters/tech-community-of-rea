import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { navigate } from 'gatsby'
import styled from 'styled-components'
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

const Amount = styled.span`
  display: block;
  font-size: 1rem;
  color: #777;
  margin-bottom: 0.5rem;
`
const Title = styled.span`
  display: block;
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
  '$$$$$ Prime Minister',
]

const DreamTitle = () => {
  const [updateCharacter] = useMutation(UPDATE_CHARACTER)
  const { register, handleSubmit, errors } = useForm()
  const { getId } = useUser()

  const onSubmit = async ({ dreamTitle }) => {
    const id = getId()
    await updateCharacter({ variables: { id, dreamTitle } })
    navigate('/image-upload')
  }

  return (
    <Page>
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
        <Button type="submit">Next</Button>
      </Form>
    </Page>
  )
}

export default DreamTitle
