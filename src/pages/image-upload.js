import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { navigate } from 'gatsby'
import { useDropzone } from 'react-dropzone'
import { FiCamera } from 'react-icons/fi'
import styled from 'styled-components'
import useUser from '../hooks/useUser'
import { Page, Form, Heading, Button } from '../components/styled'

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

const Img = styled.img`
  max-height: 400px;
  margin-bottom: 1rem;
  object-fit: contain;
`

const Message = styled.p`
  color: #777;
  font-size: 2rem;
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
  const [isUploading, setIsUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [uploadImage] = useMutation(UPLOAD_IMAGE)
  const [updateCharacter] = useMutation(UPDATE_CHARACTER)
  const { register, handleSubmit, errors } = useForm()
  const { getId } = useUser()

  const onSubmit = async () => {
    const id = getId()
    await updateCharacter({ variables: { id, imageUrl } })
    navigate(`/character?id=${id}`)
  }

  const onDrop = async (files) => {
    setIsUploading(true)
    const [image] = files
    const { data } = await uploadImage({ variables: { image } })
    setIsUploading(false)
    setImageUrl(data.uploadImage.url)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    max: 12582912, // 12 MB
  })

  return (
    <Page>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading>What do you look like?</Heading>
        {imageUrl ? (
          <Img src={imageUrl} />
        ) : (
          <Dropzone {...getRootProps()}>
            {isUploading ? (
              <Message>Uploading image...</Message>
            ) : (
              <>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <Message>I dare you!</Message>
                ) : (
                  <FiCamera size="6rem" strokeWidth="1" />
                )}
              </>
            )}
          </Dropzone>
        )}
        <input
          type="hidden"
          value={imageUrl}
          name="imageUrl"
          ref={register({ required: true })}
        />
        {errors.imageUrl && 'An image is required.'}
        <Button type="submit">Save character</Button>
      </Form>
    </Page>
  )
}

export default ImageUpload
