import { Router } from 'express'
import { Container } from 'inversify'
import { AuthService } from '../../src/core/auth/service'

interface ILoginRouteInput {
  container: Container
}

export function createLoginRoute({ container }: ILoginRouteInput) {
  const router = Router()

  router.route('/').post(async (req, res) => {
    const { email, password } = req.body
    try {
      const token = await container.get(AuthService).login(email, password)
      return res.json({ token })
    } catch (e) {
      return res.status(401).json({
        errors: [ e.message ]
      })
    }
  })

  return router
}
