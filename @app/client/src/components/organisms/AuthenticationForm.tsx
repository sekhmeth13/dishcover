import AuthFormTitle from '../atoms/authentication/AuthFormTitle'
import FormTextField from '../atoms/form/FormTextField'
import { useContext } from 'react'
import SubmitButton from '../atoms/form/SubmitButton'
import UserContext from '../../contexts/UserContext'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpFormSchemaType, SignUpFormSchema } from '../../models/form/SignupForm'
import * as apiService from '../../services/apiService'
import NotRegistredLink from '../atoms/authentication/NotRegistredLink'
import { Container } from '@mui/material'

interface AuthenticationFormProps {
  onSubmit: () => void
  login: boolean
}

export default function AuthenticationForm({
  onSubmit: postSubmit,
  login
}: AuthenticationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(SignUpFormSchema)
  })
  const context = useContext(UserContext)
  const onSubmit: SubmitHandler<SignUpFormSchemaType> = async (userInfos) => {
    const response = login
      ? await apiService.login(userInfos)
      : await apiService.register(userInfos)
    if (!response?.error && response?.data?.token) {
      context.setConnectedUser({ ...response?.data?.user, token: response?.data?.token })
      postSubmit()
    }
  }

  return (
    <form>
      <FormTextField
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email')}
        label="Email"
        id="email"></FormTextField>
      <FormTextField
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        label="Password"
        id="password"
        type="password"></FormTextField>
      <FormTextField
        {...register('confirmPassword')}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        label="Password Confirmation"
        id="confirmPassword"></FormTextField>
      <Container>
        {login ? <NotRegistredLink /> : null}
        <SubmitButton onSubmit={handleSubmit(onSubmit)}>submit</SubmitButton>
      </Container>
    </form>
  )
}
