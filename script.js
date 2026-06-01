// Väntar tills hela DOM:en är inläst innan koden körs
document.addEventListener("DOMContentLoaded", function() {

  // En array som håller alla måltider
  let meals = ["Pizza", "Pasta", "Tacos"]

  // Visar måltidslistan i DOM:en
  function showList() {
    let list = document.getElementById("meal-list")
    list.innerHTML = ""

    for (let i = 0; i < meals.length; i++) {
      let item = document.createElement("li")
      item.textContent = meals[i]
      list.appendChild(item)
    }
  }

  // Lyssnar på formuläret när användaren lägger till en måltid
  document.getElementById("meal-form").addEventListener("submit", function(e) {
    e.preventDefault()

    let input = document.getElementById("meal-input")
    let newName = input.value.trim()

    if (newName === "") {
      alert("Du måste skriva in en måltid!")
      return
    }

    meals.push(newName)
    input.value = ""
    showList()
  })

  showList()

})
