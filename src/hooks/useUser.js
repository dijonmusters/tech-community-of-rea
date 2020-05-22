const useUser = () => {
  const login = (id) => localStorage.setItem('id', id)
  const logout = () => localStorage.removeItem('id')
  const getId = () => localStorage.getItem('id')
  const isLoggedIn = () => !!getId()

  return {
    login,
    logout,
    isLoggedIn,
    getId,
  }
}

export default useUser
