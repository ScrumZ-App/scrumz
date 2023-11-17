// read gts.json
import { readFileSync } from 'fs'
import { join } from 'path'

const __dirname = process.cwd()

console.log(__dirname)

// every line is a json object
const rawData = readFileSync(join(__dirname, 'gts.json'), 'utf8')
const gts = rawData.split('\n').filter(Boolean).map(JSON.parse)

const Yok = (bilesen) => {
  if (bilesen === '0') return true
  if (bilesen === 0) return true
  if (bilesen === '') return true
  // null or undefined
  if (isNaN(bilesen)) return true
  if (bilesen === null) return true
  if (bilesen === undefined) return true
  if (!bilesen) return true
  // other
  return false
}

const Var = (bilesen) => {
  return !Yok(bilesen)
}

const ozellikVar = (word, ozellik_id) => {
  return word.anlamlarListe?.some((anlam) =>
    anlam.ozelliklerListe?.some((ozellik) => ozellik.ozellik_id === ozellik_id)
  )
}

const XFilter = (all, customFilter = () => true) => {
  return all
    .filter((word) => {
      if (Var(word.on_taki)) return false
      if (Var(word.cogul_mu)) return false
      if (Var(word.ozel_mi)) return false
      if (ozellikVar(word, '31')) return false // eskiyi sil
      if (ozellikVar(word, '30') || ozellikVar(word, '36')) return false // argoyu ve kabayı sil
      if (word.lisan_kodu !== '0') return false
      return true
    })
    .filter(customFilter)
    .filter((word) => {
      // only work if a-z
      if (word.madde.match(/[^a-z]/)) return false
      return true
    })
}

let tumSifatlar = XFilter(
  gts.filter(
    (word) => word.anlamlarListe?.[0]?.ozelliklerListe?.[0]?.tam_adi === 'sıfat'
  ),
  (word) => {
    if (word.madde.length < 3 || word.madde.length > 7) return false
    return true
  }
)

let tumIsimler = XFilter(
  gts.filter(
    (word) => word.anlamlarListe?.[0]?.ozelliklerListe?.[0]?.tam_adi === 'isim'
  ),
  (word) => {
    if (word.madde.match(/(siz|suz|si)$/)) return false
    if (word.madde.match(/(ma|me)$/)) return false
    if (word.madde.match(/(ci|cı|ca|ce)$/)) return false
    if (word.madde.match(/(lik|lık|luk)$/)) return false
    if (word.madde.match(/(cuk|cik)$/)) return false
    if (word.madde.match(/(lu|lı|li)$/)) return false
    if (word.madde.match(/(sul)$/)) return false
    if (word.madde.length < 3 || word.madde.length > 6) return false
    return true
  }
)

console.log(tumSifatlar.length)
console.log(tumIsimler.length)
// random 10 sifat+isim
const random = () => {
  const sifat = tumSifatlar[Math.floor(Math.random() * tumSifatlar.length)]
  const isim = tumIsimler[Math.floor(Math.random() * tumIsimler.length)]
  return `${sifat.madde} ${isim.madde}`
}

// random isim
console.log(tumIsimler[Math.floor(Math.random() * tumIsimler.length)])

let errorRate = 0
let randoms = []
for (let i = 0; i < 100; i++) {
  let chosen = random()
  // if duplicate, push again
  while (randoms.includes(chosen)) {
    errorRate++
    chosen = random()
  }
  randoms.push(chosen)
}

console.log(randoms)
