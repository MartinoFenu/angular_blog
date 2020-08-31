export class DataPlaceHolder {

  constructor() { }

  getImagePlaceholder() {
    return {
      url: new URL('https://via.placeholder.com/150'),
      title: 'Placeholder image'
    }
  }

  getAuthorPlaceholder() {
    return 'Anonymous Contributor'
  }
}