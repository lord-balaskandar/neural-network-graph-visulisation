class FileLoader {
  private static instance: FileLoader;
  private loadedData: object = {};

  static getInstance() {
    if (!FileLoader.instance) FileLoader.instance = new FileLoader();
    return FileLoader.instance;
  }

  setFile(e: any) {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0]);
    fileReader.onload = (e: any) => {
      console.log(e.target.result);
    };
    console.log(e);
  }

  setFileDefault(path: string) {
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
