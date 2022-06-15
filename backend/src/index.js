import app from "./app.js"
const port = app.get('port')

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})
