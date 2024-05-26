import { createSecureServer } from 'node:http2'
import { readFileSync } from 'node:fs'

const server = createSecureServer({
  key: readFileSync('localhost-privkey.pem'),
  cert: readFileSync('localhost-cert.pem'),
}, (req, res) => {
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

console.log('listening on https://localhost:8000')
server.listen(8000)
