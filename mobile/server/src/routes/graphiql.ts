/* tslint:disable:max-line-length */
import { graphiqlExpress } from 'apollo-server-express'
import { Router } from 'express'
import * as url from 'url'
import { calculateToken } from '../../src/shared/helpers/express'

interface ICreateGraphiQlRouteInput {
  graphQlPath: string
  subscriptionsPath: string
}

export function createGraphiQlRoute({ graphQlPath, subscriptionsPath }: ICreateGraphiQlRouteInput) {
  const router = Router()

  router.get('/', (req, res) =>
    res.status(200).set('Content-Type', 'text/html').send(`
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8" />
      <title>GraphiQL Login</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
      <style>
          html, body {
          background: #eee;
      }
      </style>
      </head>
  <body>
      <div class="container">
          <form class="form-signin card bg-faded p-3 mt-5 mx-auto" style="max-width: 400px" on>
              <h2 class="text-center form-signin-heading mb-4">Log in to GraphiQL</h2>
              <div class="mt-2 mb-2">
                  <label for="inputEmail" class="sr-only">Email address</label>
                  <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
              </div>
              <div class="mt-2 mb-2">
                  <label for="inputPassword" class="sr-only">Password</label>
                  <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
              </div>
              <div class="mt-3 mb-3 alert alert-danger" style="display: none"></div>
              <button class="btn btn-lg btn-primary btn-block" type="submit" >Sign in</button>
          </form>
      </div> <!-- /container -->
      <script type="text/javascript">
          $('button[type="submit"]').click((e) => {
              e.preventDefault();
              fetch(window.location.origin + '/login', {
                  body: JSON.stringify({ email: $('#inputEmail').val(), password: $('#inputPassword').val() }),
                  cache: 'no-cache',
                  headers: {
                      'content-type': 'application/json'
                  },
                  method: 'POST'
              }).then((response) => {
                  if (response.status === 502) {
                      $(".alert-danger").text(response.statusText).show()
                  } else if (response.status !== 200) {
                      response.json().then(json => $(".alert-danger").text(json.errors[0]).show());
                  } else {
                      response.json().then(json => {
                          const token = json.token;
                          window.location = window.location.origin + '/graphiql/ui?token=' + token;
                      });
                  }
              }).catch(err => $(".alert-danger").text(JSON.stringify(err)).show());
          });
      </script>
  </body>
  </html>
  `),
  )

  router.use(
    '/ui',
    graphiqlExpress((req) => ({
      endpointURL: graphQlPath,
      subscriptionsEndpoint: url.format({
        host: req.get('host'),
        protocol: req.protocol === 'https' ? 'wss' : 'ws',
        pathname: subscriptionsPath,
      }),
      query: `{
  me {
    id
    name
  }
}
      `,
      websocketConnectionParams: {
        Authorization: `Bearer ${calculateToken(req)}`,
      },
    })),
  )

  router.use('/ping', (req, res) => { res.json('pong') })

  return router
}
