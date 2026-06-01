// Väntar tills hela DOM:en är inläst innan koden körs
document.addEventListener("DOMContentLoaded", function() {

  // En array som håller alla måltider
  let meals = ["Pizza", "Pasta", "Tacos"]

  // Färger som segmenten loopar igenom
  let colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"]

  // Visar måltidslistan i DOM:en
  function showList() {
    let list = document.getElementById("meal-list")
    list.innerHTML = ""

    for (let i = 0; i < meals.length; i++) {
      let item = document.createElement("li")
      item.textContent = meals[i]
      list.appendChild(item)
    }

    drawWheel()
  }

  // Bygger hjulet och legenden med conic-gradient via DOM-manipulation
  function drawWheel() {
    let wheel = document.getElementById("wheel")
    let legend = document.getElementById("color-legend")
    let segmentSize = 100 / meals.length

    let gradientParts = []

    for (let i = 0; i < meals.length; i++) {
      let color = colors[i % colors.length]
      let start = i * segmentSize
      let end = (i + 1) * segmentSize
      gradientParts.push(color + " " + start + "% " + end + "%")
    }

    // Sätter CSS-egenskapen direkt på elementet - det är DOM-manipulation
    wheel.style.background = "conic-gradient(" + gradientParts.join(", ") + ")"

    legend.innerHTML = ""

    for (let i = 0; i < meals.length; i++) {
      let item = document.createElement("li")
      item.textContent = meals[i]
      item.style.borderLeft = "12px solid " + colors[i % colors.length]
      item.style.paddingLeft = "0.6rem"
      legend.appendChild(item)
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
