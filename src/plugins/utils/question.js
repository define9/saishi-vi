import { Platform } from "./common"

export function grabQuestionTitle(platform) {
  switch (platform) {
    case Platform.PC:
      return document.querySelector(".tigan").innerText
    case Platform.Mobile:
    default:
      return document.querySelector("#q_body .topic").innerText
  }
}

export function getQuestionIndex(platform) {
  let num = ""
  switch (platform) {
    case Platform.PC:
      num = document.querySelector(".question-title .num").innerText
      break;
    case Platform.Mobile:
      num = document.querySelector("#q_number span").innerText
  }
  return parseInt(num)
}
