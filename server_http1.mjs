import { createServer } from 'node:http'
import { readFileSync } from 'node:fs'

const server = createServer((req, res) => {
  if (req.url === '/') {
    res.writeEarlyHints({
      'link': [
        '</main.js>;rel=modulepreload',
        '</bar.js>;rel=modulepreload',
      ]
    })
    console.log('sent early hints')
    setTimeout(() => {
      res.end(readFileSync('./index.html'))
      console.log(`sent /index.html`)
    }, 3000)
  } else {
    try {
      res.writeHead(200, { 'content-type': 'text/javascript' })
      res.end(readFileSync('.' + req.url))
      console.log(`sent ${req.url}`)
    } catch {
      // ignore 404s
    }
  }
})

console.log('listening on http://localhost:8000')
server.listen(8000)
