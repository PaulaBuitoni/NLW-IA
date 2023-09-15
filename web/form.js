import { server } from "./server.js"
const form = document.querySelector("#form")
const imput = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  const videoURL = imput.value
  
  if (!videoURL.includes("shorts")){
     return content.textContent = "Isso ai não é um shorts amigão!"
  }

  const [_,params]= videoURL.split("/shorts/")
  const [videoID] = params.split("?Si")


  content.textContent = "Obtendo o texto do áudio..."

  const transcription = await server.get("/summary/" + videoID)

  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})