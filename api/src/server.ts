// Import the framework and instantiate it
import Fastify from 'fastify'
const app = Fastify()

import fastifyCors from "@fastify/cors"

import { createTransport } from "nodemailer"

// Import zod and dotenv
import { z } from "zod"
import "dotenv/config"

// Allow outside request to the API
app.register(fastifyCors, {
  origin: '*'
})

// Create transporter to allow application send emails
function handleCreateTransport() {
  let transporter = createTransport({
    service: "gmail",
    auth: {
      type: "OAUTH2",
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  })

  transporter.verify(function(error, success) {
    if (error) {
          console.log(error);
    } else {
          console.log('Server is ready to take our messages');
    }
  });

  return transporter
}

// Declare a route
app.post('/', async function handler (request, reply) {

  const bodySchema = z.object({ email: z.string() })

  const { email } = bodySchema.parse(request.body)

  const t = handleCreateTransport()

  await t.sendMail({
    from: "letsCode40 <geraldinofromacre@gmail.com>",
    to: `${email}`,
    subject: "Newsletter subscription!",
    text: "Hey! We are happy to know that you now subscribe to our newsletter.",
  })

  return `Your message was sent to ${email}` 
})

// Run the server!
app.listen({ port: 3000, host: '0.0.0.0' }).then(() => console.log("Server is running at http://localhost:3000"))
