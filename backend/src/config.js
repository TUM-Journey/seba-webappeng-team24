export const runningInDocker = process.env.docker_env
export const isProduction = process.env.prod_env

export const dockermongoose = "mongodb://mongo/test"
export const localmongoose = "mongodb://localhost/test"
export const bodyLimit = "100kb"
export const corsHeaders = [
  "Link"
]
