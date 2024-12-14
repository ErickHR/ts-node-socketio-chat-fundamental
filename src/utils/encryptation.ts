import bcrypt from 'bcrypt'

const generateHash = (password: string): string => {
  return bcrypt.hashSync(password, 10)
}

const compareHash = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash)
}

export { generateHash, compareHash }
