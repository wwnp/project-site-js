const modals = () => {
  // const test = document.querySelector(".popup-test")
  const scrollLineWidth = calcScrollLine()

  function bindModal(popupSelector, triggerSelector, closeSelector = null, overlayClickClose = true) {
    const triggers = document.querySelectorAll(triggerSelector)
    const modal = document.querySelector(popupSelector)
    const close = document.querySelector(closeSelector)
    modal.classList.add('animated', 'fadeIn')

    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        modal.style.display = 'block'

        document.body.style.overflow = "hidden"
        document.body.style.marginRight = scrollLineWidth + 'px'
      })
    })

    close.addEventListener('click', () => {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
      document.body.style.marginRight = 0 + 'px'
    })

    modal.addEventListener('click', (e) => {
      if (e.target === modal && overlayClickClose) {
        modal.style.display = "none"
        document.body.style.overflow = "auto"
        document.body.style.marginRight = 0 + 'px'
      }
    })

  }

  function copyPromo(promoSelector) {
    const promocodes = document.querySelectorAll(promoSelector)
    let div = document.createElement('div')
    promocodes.forEach(p => {
      p.addEventListener('click', (e) => {
        try {
          div.style.color = "green"
          div.innerHTML = 'Успешно скопировано'
          navigator.clipboard.writeText(e.target.innerHTML.trim())
          p.parentNode.appendChild(div)
        } catch (error) {
          div.innerHTML = 'Произошла ошибка'
          div.style.color = "red"
        }
        setTimeout(() => {
          div.remove()
        }, 3000);
      })
    })
  }

  function calcScrollLine() {
    let div = document.createElement('div')
    div.style.width = '50px'
    div.style.height = '50px'
    div.style.overflowY = 'scroll'
    div.style.visibility = 'hidden'
    document.body.appendChild(div)
    let scrollLineWidth = div.offsetWidth - div.clientWidth
    div.remove()
    return scrollLineWidth
  }

  bindModal(".popup-test", ".btn-popup-test", ".popup-close")
  copyPromo('.promocode')
}
export default modals
