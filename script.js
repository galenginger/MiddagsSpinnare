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

      let removeButton = document.createElement("button")
      removeButton.textContent = "X"
      removeButton.addEventListener("click", function() {
        meals.splice(i, 1)
        showList()
      })

      item.appendChild(removeButton)
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

  let currentAngle = 0
  let isSpinning = false

  // Snurrar hjulet i 5-6 sekunder med sakta inbromsning
  function spin() {
    if (isSpinning) return

    isSpinning = true
    document.getElementById("spin-button").disabled = true

    // Nollställ resultatet från föregående snurrning
    let resultDiv = document.getElementById("result")
    resultDiv.textContent = ""
    resultDiv.className = ""

    let startAngle = currentAngle
    let totalRotation = 1440 + Math.random() * 360  // 4-5 hela varv plus slump
    let duration = 5000 + Math.random() * 1000      // 5-6 sekunder i millisekunder
    let startTime = null

    function animate(timestamp) {
      if (!startTime) startTime = timestamp

      let elapsed = timestamp - startTime
      let progress = Math.min(elapsed / duration, 1)

      // progress går linjärt 0->1, men eased rusar snabbt och kryper in i slutet
      // vid 50% tid är redan 87.5% av rotationen klar.
      //(Fick ta lite AI/google hjälp)
      let eased = 1 - Math.pow(1 - progress, 3)

      currentAngle = startAngle + totalRotation * eased
      document.getElementById("wheel").style.transform = "rotate(" + currentAngle + "deg)"

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        isSpinning = false
        document.getElementById("spin-button").disabled = false
        showWinner()
      }
    }

    requestAnimationFrame(animate)
  }

  // Räknar ut vilket segment pilen pekar på och visar vinnaren
  function showWinner() {
    let segmentSize = 360 / meals.length
    let normalized = ((currentAngle % 360) + 360) % 360
    let winnerIndex = Math.floor((360 - normalized) % 360 / segmentSize) % meals.length

    let resultDiv = document.getElementById("result")
    resultDiv.textContent = "Ikväll äter vi: " + meals[winnerIndex] + "!"
    resultDiv.classList.add("show-result")
  }

  document.getElementById("spin-button").addEventListener("click", spin)

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
