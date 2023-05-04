import { Button } from '@mui/material'

interface SubmitButtonProps {
  href: string
}
export default function HeroButton({ href = '/' }: SubmitButtonProps) {
  return <Button variant="contained" size="large" type="button" href={href} />
}
