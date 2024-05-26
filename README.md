# Early hints modulepreload and importmap

Run the server and open the printed URL in a browser:

```sh
node server.mjs
```

## Result for Firefox 126:

```
listening on https://localhost:8000
sent early hints
sent /main.js
sent /bar.js
sent /index.html
sent /foo.js
```

and in the browser's console:

```
import map is not active
```

## Result for Chromium 125:

```
listening on https://localhost:8000
sent early hints
sent /main.js
sent /bar.js
sent /index.html
sent /main.js
sent /bar.js
```

and in the browser's console:

```
import map is active
```
