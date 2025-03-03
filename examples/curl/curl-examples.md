# Curl Examples

Curl Examples to test with when LLL is started with no args.

### JSON responses from Star Wars Api

```sh
curl -s https://swapi.dev/api/planets/ \
  -H "Accept: application/json"

curl -s https://swapi.dev/api/planets/1/ \
  -H "Accept: application/json"

curl -s https://swapi.dev/api/planets/1/?format=wookiee \
  -H "Accept: application/json"
```

### POSTs

```sh
# A post to json placeholder with json body
curl -s -X POST -H "Content-Type: application/json" \
    -d '{"userId": 5, "title": "Post Title", "body": "Post content."}' \
    https://jsonplaceholder.typicode.com/posts
```

### Wordy requests

```sh
# Some image from github's home page
curl -sv 'https://github.com/fluidicon.png'  \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:108.0) Gecko/20100101 Firefox/108.0'  \
  -H 'Accept: image/avif,image/webp,*/*' \
  -H 'Accept-Language: en-US,en;q=0.5' \
  -H 'Accept-Encoding: gzip, deflate, br' -H 'Referer: https://github.com/' \
  -H 'DNT: 1' -H 'Connection: keep-alive' \
  -H 'Sec-Fetch-Dest: image' \
  -H 'Sec-Fetch-Mode: no-cors' \
  -H 'Sec-Fetch-Site: same-origin'
```
