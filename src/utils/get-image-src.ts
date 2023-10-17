import fs from "fs"

const dictionary = {
  "Fechaduras e acessórios": "fechaduras_e_acessorios",
  "Ferragens em geral": "ferragens_em_geral",
  "Ferragens para janelas": "ferragens_para_janelas",
  "Ferragens para portas": "ferragens_para_portas",
  "Peças para móveis": "pecas_para_moveis",
  "Utilidades domésticas": "utilidades_domesticas",
}

export function getImageSrc(category: string, code: string) {
  const dirName = dictionary[category]
  const rootDir = process.cwd()
  const pathName = rootDir + "\\public\\" + dirName
  const names = fs.readdirSync(pathName)
  for (const name of names) {
    if (name.includes(code)) {
      return `/${dirName}/${name}`
    }
  }
}
