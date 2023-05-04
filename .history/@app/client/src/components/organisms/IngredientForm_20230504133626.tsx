import AuthFormTitle from '../atoms/authentication/AuthFormTitle'
import FormTextField from '../atoms/form/FormTextField'
import { useContext } from 'react'
import SubmitButton from '../atoms/form/SubmitButton'
import UserContext from '../../contexts/UserContext'
import * as authenticationService from '../../services/authenticationService'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpFormSchemaType, SignUpFormSchema } from '../../models/form/SignupForm'
import { CreateIngredientQuery } from '@dishcover/shared'

interface IngredientFormProps {
  onSubmit: () => void
  create: boolean
}

export default function IngredientForm({
  onSubmit: postSubmit,
  create = true
}: IngredientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateIngredientQuery>({
    resolver: zodResolver(SignUpFormSchema)
  })
  const context = useContext(UserContext)
  const onSubmit: SubmitHandler<SignUpFormSchemaType> = async (userInfos) => {
    const response = login
      ? await authenticationService.login(userInfos)
      : await authenticationService.register(userInfos)
    if (!response?.error && response?.data?.token) {
      context.setConnectedUser({ ...response?.data?.user, token: response?.data?.token })
      postSubmit()
    }
  }

  return (
    <form>
      <AuthFormTitle>{login ? 'login' : 'register'}</AuthFormTitle>
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
      <SubmitButton onSubmit={handleSubmit(onSubmit)}>submit</SubmitButton>
    </form>
  )
}
