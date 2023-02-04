import { BackendService } from "../services/backend.service";

export class Scannable {
  public urls?: Map<string, Downloadable[]>

  constructor(
    public name: string
  ) {}

  public loadUrls(backend: BackendService) {
    if (this.urls == undefined) {
      backend.getScannable(this.name).subscribe(urls => {
        this.urls = groupBy(urls.map(url => new Downloadable(url)), u => u.category);
        this.urls.delete("Torrents");
      });
    }
  }

}

export class Downloadable {
  public category!: string;
  public name!: string;

  constructor(
    public url: string
  ) {
    let decoded   = decodeURIComponent(url.substring(29));
    decoded       = decoded.substring(decoded.indexOf('/') +1);
    this.category = decoded.substring(0, decoded.indexOf('/'));
    this.name     = decoded.substring(decoded.lastIndexOf('/') +1);
    if (this.category == "Shows") {
      let qualEndIdx = this.name.indexOf('p)');
      if (qualEndIdx > 0) {
        let qualStartIdx = this.name.lastIndexOf('(', qualEndIdx);
        this.category = this.category + " - " + this.name.substring(qualStartIdx +1, qualEndIdx +1);
      }
    }
    let fileEnding = this.name.substring(this.name.lastIndexOf('.'));
    this.category = this.category + ' (' + fileEnding + ')';
  }
}

//TODO put somewhere more generic util
function groupBy<Key, Value>(vals: Value[], classifier: (v: Value) => Key): Map<Key, Value[]> {
  let map = new Map<Key, Value[]>();
  for (let val of vals) {
    let key = classifier(val);
    let group = map.get(key);
    if (group == undefined) {
      group = [];
      map.set(key, group);
    }
    group.push(val);
  }
  return map;
}
