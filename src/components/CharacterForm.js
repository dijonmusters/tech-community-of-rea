import React from 'react'
import { useForm } from 'react-hook-form'

const CharacterForm = () => {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="username" ref={register({ required: true })} />
      {errors.username && 'Username is required.'}
      <input type="submit" />
    </form>
  )
}

export default CharacterForm
