const useUser = () => {
  const login = (id) =>
    typeof window !== 'undefined' && localStorage.setItem('id', id)
  const logout = () =>
    typeof window !== 'undefined' && localStorage.removeItem('id')
  const getId = () =>
    typeof window !== 'undefined' && localStorage.getItem('id')
  const isLoggedIn = () => !!getId()

  return {
    login,
    logout,
    isLoggedIn,
    getId,
  }
}

export default useUser
