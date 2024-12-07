function wrapPromise(promise) {
    let status = 'pending'
    let response
  
    const suspender = promise.then(
      (res) => {
        status = 'success'
        response = res
      },
      (err) => {
        status = 'error'
        response = err
      },
    )

    const read = () => {
        switch (status) {
          case 'pending':
            console.log('pending');
            throw suspender
          case 'error':
            console.log('error');
            throw response
          default:
            console.log("OK");
            return response
        }
      }
    
      return { read }
}
    
export default wrapPromise
