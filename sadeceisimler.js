// read gts.json
import { readFileSync } from 'fs'
import { join } from 'path'

const __dirname = process.cwd()

console.log(__dirname)

// every line is a json object
const rawData = readFileSync(join(__dirname, 'gts.json'), 'utf8')
const gts = rawData.split('\n').filter(Boolean).map(JSON.parse)

const isFalsy = (bilesen) => {
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

const isTruthy = (component) => {
  return !isFalsy(component)
}

const hasProperty = (word, ozellik_id) => {
  return word.anlamlarListe?.some((meaning) =>
    meaning.ozelliklerListe?.some(
      (property) => property.ozellik_id === ozellik_id
    )
  )
}

const XFilter = (all, customFilter = () => true) => {
  return all
    .filter((word) => {
      if (isTruthy(word.on_taki)) return false
      if (isTruthy(word.cogul_mu)) return false
      if (isTruthy(word.ozel_mi)) return false
      if (hasProperty(word, '31')) return false // remove old
      if (hasProperty(word, '30') || hasProperty(word, '36')) return false // delete slang and vulgar
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

let allAdjectives = XFilter(
  gts.filter(
    (word) => word.anlamlarListe?.[0]?.ozelliklerListe?.[0]?.tam_adi === 'sıfat'
  ),
  (word) => {
    if (word.madde.length < 3 || word.madde.length > 7) return false
    return true
  }
)

let allNames = XFilter(
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

console.log(allAdjectives.length)
console.log(allNames.length)

// random 10 adjective + name
const random = () => {
  const adjective =
    allAdjectives[Math.floor(Math.random() * allAdjectives.length)]
  const name = allNames[Math.floor(Math.random() * allNames.length)]
  return `${adjective.madde} ${name.madde}`
}

// random name
console.log(allNames[Math.floor(Math.random() * allNames.length)])

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

console.log(errorRate, randoms)
