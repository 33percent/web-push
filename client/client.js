const publicvapidkey = 'BJD2LWCiQK7IHP7-sU1tSLbDU2kdwaA75z73njMFE7wX0CNTHlZDh2vio9g5AW6Mqmai3wPwMbwoRbbbbrhe2Nk';


// service worker check
if('serviceWorker' in navigator){
    register().catch(err => console.log(err))
}

async function register(){
    const register = await navigator.serviceWorker.register('/serviceworker.js',{
        scope : '/'
    })
    console.log('serviceWorker registered')

     const subscription = await register.pushManager.subscribe({
         userVisibleOnly : true,
        applicationServerKey : urlBase64ToUint8Array(publicvapidkey)
     })
     console.log(subscription)
     await fetch('/subscribe', {
         method : 'POST',
         body : JSON.stringify(subscription),
         headers : {
             'content-type' : 'application/json'
         }
     })
     console.log('push send ....')
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }