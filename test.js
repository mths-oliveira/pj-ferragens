const l = require("./imgSrc.json")
const fs = require("fs")
const data = {}
for (const obj of l.list) {
  data[obj.ref] = obj.src
}

fs.writeFileSync("./productImages.json", JSON.stringify(data), (err) => {
  console.log(err)
})
