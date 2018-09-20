class Utils {

  formatQuantity = (resource, type) => {
    if(type === 'cpu') {
      return resource.toLocaleString() + ' µs'
    } 
    else if(type === 'net') {
      return Math.round(resource / 1024).toLocaleString() + ' KB'
    }
    else if(type === 'words') {
      return Math.round(resource / 8).toLocaleString() + ' Bytes'
    }
  }
}

const utils = new Utils()
export default utils