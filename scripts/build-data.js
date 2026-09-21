// 배포 전 실행: site/data/<컬렉션>/*.json (관리자 화면이 건별로 저장한 파일) 을
// site/data/<컬렉션>.json ({ items: [...] }) 하나로 합칩니다. 사이트 JS는 합쳐진 파일만 읽습니다.
// 합쳐진 파일은 저장소에 커밋하지 않고(.gitignore) 배포 시 GitHub Actions 가 만듭니다.
const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'site', 'data');
const COLLECTIONS = ['notices', 'news', 'members', 'projects', 'publications', 'seminars', 'resources'];

for (const name of COLLECTIONS) {
  const dir = path.join(DATA, name);
  let items = [];
  if (fs.existsSync(dir)) {
    for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort()) {
      try {
        const obj = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
        obj._id = f.replace(/\.json$/, '');
        items.push(obj);
      } catch (e) {
        console.error(`[build-data] 잘못된 JSON: ${name}/${f} - ${e.message}`);
        process.exitCode = 1;
      }
    }
  }
  fs.writeFileSync(path.join(DATA, `${name}.json`), JSON.stringify({ items }, null, 2) + '\n');
  console.log(`[build-data] ${name}: ${items.length}건`);
}
