var express = require('express');
var app = express();
var figmaKeys = require('./keys.js')
var fetch = require('isomorphic-fetch');

const getWithHeaders = {
  method: "GET",
  headers: {
    'X-Figma-Token': figmaKeys.key
  }
}

async function figmaFetchFile(fileId) {
  let result = await fetch('https://api.figma.com/v1/files/' + fileId, getWithHeaders)

  let figmaFileStruct = await result.json()

  let figmaFrames = figmaFileStruct.document.children
    .filter(child => child.type === "CANVAS")[0].children
    .filter(child => child.type === "FRAME")
    .map(frame => {
      return {
        name: frame.name,
        id: frame.id
      }
    })


    let ids = figmaFrames.map(comp => comp.id).join(',') // 1

    let imageResult = await fetch('https://api.figma.com/v1/images/' + fileId + '?scale=3&ids=' + ids, getWithHeaders)
      .catch(console.log)

    let figmaImages = await imageResult.json() //3

    figmaImages = figmaImages.images //4
    console.log(JSON.stringify(figmaImages)) //4


    return figmaFrames.map(frame => {
      return {
        name: frame.name,
        url: figmaImages[frame.id]
      }
    })
}

app.use('/frames', async function(req, res, next){
  console.log("/frames")
  let result = await figmaFetchFile(figmaKeys.fileId)
    .catch(console.log)
  res.send(result)
})



app.listen(3001, console.log("server listening on port 3001"));
