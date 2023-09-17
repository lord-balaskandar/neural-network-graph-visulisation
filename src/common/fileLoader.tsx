class FileLoader {
  private static instance: FileLoader;
  private loadedData: object = {};

  getInstance() {
    if (!FileLoader.instance) FileLoader.instance = new FileLoader();
    return FileLoader.instance;
  }

  setFile(path: string) {
    fetch(path, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then((r) => r.json())
      .then((json) => (this.loadedData = json));
  }
}

export default FileLoader;
