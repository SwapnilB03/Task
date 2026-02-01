import { useGetUsersQuery } from '../services/usersApi'

export const useUsers = () => {
  const { data, isLoading, isError } = useGetUsersQuery()
  return { data, isLoading, isError }
}
