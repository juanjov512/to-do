import app from "./app"
import { config } from "./config/env"

const PORT = config.port

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
