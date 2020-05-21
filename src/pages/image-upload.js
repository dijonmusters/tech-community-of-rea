import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { navigate } from 'gatsby'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { FiCamera } from 'react-icons/fi'

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

const Dropzone = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #444;
  margin-bottom: 1rem;

  & > svg {
    color: #777;
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

const UPLOAD_IMAGE = gql`
  mutation UploadImage($image: Upload!) {
    uploadImage(input: { image: $image }) {
      url
    }
  }
`

const UPDATE_CHARACTER = gql`
  mutation UpdateImageUrl($id: String!, $imageUrl: String!) {
    updateCharacter(input: { id: $id, imageUrl: $imageUrl }) {
      id
    }
  }
`

const ImageUpload = () => {
  const [imageUrl, setImageUrl] = useState('')
  const [uploadImage] = useMutation(UPLOAD_IMAGE)
  const [updateCharacter] = useMutation(UPDATE_CHARACTER)
  const { register, handleSubmit, errors } = useForm()
  const id = new URLSearchParams(window.location.search.substring(1)).get('id')

  const onSubmit = async () => {
    await updateCharacter({ variables: { id, imageUrl } })
    navigate(`/character?id=${id}`)
  }

  const onDrop = async (files) => {
    const [image] = files
    const { data } = await uploadImage({ variables: { image } })
    setImageUrl(data.uploadImage.url)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    max: 12582912, // 12 MB
  })

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading>What do you look like?</Heading>
        <Dropzone {...getRootProps()}>
          <input {...getInputProps()} />
          <FiCamera size="6rem" strokeWidth="1" />
        </Dropzone>
        <input
          type="hidden"
          value={imageUrl}
          name="imageUrl"
          ref={register({ required: true })}
        />
        {errors.imageUrl && 'An image is required.'}
        <Button type="submit">Save character</Button>
      </Form>
    </Container>
  )
}

export default ImageUpload
