import { createGoogleClient } from "../../config/create-google-client"
import { User } from "../entities/user"

export class UsersRepository {
  async save({ email, name, password }: User) {
    const client = await createGoogleClient("Representantes")
    client.add([name, email, password])
  }

  async findByEmail(email: string) {
    const users = await this._findAll()
    const user = users.find((user) => {
      return user.email === email
    })
    return user
  }

  private async _findAll() {
    const client = await createGoogleClient("Representantes")
    const [_, ...salesRepresentatives] = await client.findAll()
    const users = salesRepresentatives.map(([name, email, password]) => {
      const user = new User(name, email, password)
      return user
    })
    return users
  }
}
