import { createContext } from 'react'
import { UserDtoType } from '@dishcover/shared'

type ConnectedUser = UserDtoType & { token: string }

interface UserContextProps {
  connectedUser: ConnectedUser | null
  setConnectedUser: (user: ConnectedUser) => void
}

const UserContext = createContext<UserContextProps>({
  connectedUser: JSON.parse(localStorage.getItem('user')),
  setConnectedUser: (user: ConnectedUser) => {
    localStorage.setItem('user', JSON.stringify(user))
  }
})

export default UserContext
