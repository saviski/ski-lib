const blob = new Blob(
  [
    `

self.addEventListener('fetch', (event) => {
  console.log('fetch', event)
})

`,
  ],
  { type: 'application/javascript' }
)

const url = URL.createObjectURL(blob)

export async function initBaseUrl() {
  // let registration = await navigator.serviceWorker.register(url)
  // console.log('ServiceWorker registration successful with scope: ', registration.scope)
}
