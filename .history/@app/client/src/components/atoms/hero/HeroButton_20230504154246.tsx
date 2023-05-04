import { Button } from '@mui/material'
import React from 'react'

interface SubmitButtonProps {
  href: string
  children: React.ReactNode
}
export default function HeroButton({ href = '/', children }: SubmitButtonProps) {
  return <Button variant="contained" size="large" type="button" href={href} />{children}<Button
}
