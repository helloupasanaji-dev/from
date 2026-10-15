import './style.css'

const icons = {
  home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/><path d="M9 21v-7h6v7"/></svg>',
  office: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 21v-4h6v4M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>',
  plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
}

let addresses = []
let selectedType = 'Home'
const birlaHome = { type: 'Home', line1: '5, Tees January Marg, Birla House', line2: 'Gandhi Smriti', city: 'New Delhi', region: 'Delhi', postal: '110011', country: 'India' }

document.querySelector('#app').innerHTML = `
  <main class="page-shell">
    <header class="topbar">
      <a class="brand" href="#" aria-label="Address book home"><span class="brand-mark">${icons.pin}</span><span>place<span class="brand-dot">.</span></span></a>
      <span class="top-note"><span class="secure-dot"></span> Saved to your address book</span>
    </header>

    <section class="hero">
      <div class="hero-copy">
        <span class="eyebrow"><span class="eyebrow-line"></span> YOUR PERSONAL ADDRESS BOOK</span>
        <h1>Every place<br />has a <em>place.</em></h1>
        <p>Keep your home and office addresses together, tidy and easy to find.</p>
        <div class="hero-foot"><span class="hero-number">01</span><span class="hero-rule"></span><span>Simple to save. Easy to find.</span></div>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="art-sun"></div><div class="art-orbit orbit-one"></div><div class="art-orbit orbit-two"></div>
        <div class="art-pin">${icons.pin}<span></span></div>
        <div class="art-label label-home"><span class="tiny-icon">${icons.home}</span><span>HOME</span></div>
        <div class="art-label label-work"><span class="tiny-icon">${icons.office}</span><span>WORK</span></div>
        <div class="art-coordinate">40° 42' N<br />74° 00' W</div>
        <div class="art-grid"></div>
      </div>
    </section>

    <section class="map-section" aria-labelledby="map-title">
      <div class="map-heading"><div><span class="step-label">FIND YOUR PLACE <span>— NEW DELHI</span></span><h2 id="map-title">Birla House · Gandhi Smriti</h2><p>Drag and zoom to explore the area around your home.</p></div><span class="map-coordinate">28.6019° N&nbsp; · &nbsp;77.2143° E</span></div>
      <div class="map-frame"><iframe title="Map centered on Birla House, Gandhi Smriti, New Delhi" src="https://www.openstreetmap.org/export/embed.html?bbox=77.18%2C28.575%2C77.25%2C28.63&layer=mapnik&marker=28.601861%2C77.214331" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
      <a class="map-link" href="https://www.openstreetmap.org/?mlat=28.601861&mlon=77.214331#map=16/28.601861/77.214331" target="_blank" rel="noreferrer">Open larger map <span>${icons.arrow}</span></a>
    </section>

    <section class="content-grid">
      <div class="form-panel">
        <div class="section-heading"><div><span class="step-label">ADD A PLACE <span>— 01</span></span><h2>New address</h2></div><span class="heading-icon">${icons.plus}</span></div>
        <div class="type-label">WHAT KIND OF PLACE?</div>
        <div class="type-switch" role="group" aria-label="Address type">
          <button class="type-option active" data-type="Home" type="button"><span class="type-icon">${icons.home}</span><span>Home</span><span class="radio-dot"></span></button>
          <button class="type-option" data-type="Office" type="button"><span class="type-icon">${icons.office}</span><span>Office</span><span class="radio-dot"></span></button>
        </div>
        <form id="address-form">
          <label class="field"><span>ADDRESS LINE</span><input name="line1" value="5, Tees January Marg, Birla House" placeholder="Street address, building, apartment" required autocomplete="street-address" /><span class="field-icon">${icons.pin}</span></label>
          <label class="field"><span>ADDRESS LINE 2 <small>OPTIONAL</small></span><input name="line2" value="Gandhi Smriti" placeholder="Floor, suite, unit, etc." autocomplete="address-line2" /></label>
          <div class="field-row"><label class="field"><span>CITY</span><input name="city" value="New Delhi" placeholder="Your city" required autocomplete="address-level2" /></label><label class="field"><span>STATE / REGION</span><input name="region" value="Delhi" placeholder="Your state" autocomplete="address-level1" /></label></div>
          <div class="field-row"><label class="field"><span>POSTAL CODE</span><input name="postal" value="110011" placeholder="ZIP / postal code" autocomplete="postal-code" /></label><label class="field"><span>COUNTRY</span><input name="country" value="India" placeholder="Your country" autocomplete="country-name" /></label></div>
          <div class="form-bottom"><span class="required-note"><i>*</i> Required fields</span><button class="save-button" type="submit"><span>Save address</span>${icons.arrow}</button></div>
        </form>
      </div>
      <aside class="saved-panel">
        <div class="saved-heading"><div><span class="step-label">YOUR PLACES <span>— 02</span></span><h2>Saved addresses <span class="count" id="count">0</span></h2></div><span class="saved-decoration">${icons.check}</span></div>
        <div id="address-list" class="address-list"></div>
        <div id="empty-state" class="empty-state"><div class="empty-icon">${icons.pin}</div><strong>Your places will show up here</strong><p>Add your home or office address to get started.</p><div class="empty-lines"><i></i><i></i><i></i></div></div>
        <div class="privacy-note"><span class="privacy-lock">✳</span><span>MongoDB storage.<br /><strong>Saved addresses go to your configured database.</strong></span></div>
      </aside>
    </section>
    <footer><span>PLACEBOOK <span class="footer-dot">●</span> MADE FOR EVERYDAY</span><span>YOUR PLACES, RIGHT WHERE YOU NEED THEM.</span></footer>
  </main>
  <div class="toast" id="toast" role="status" aria-live="polite">${icons.check}<span>Address saved</span></div>
`

const form = document.querySelector('#address-form')
const list = document.querySelector('#address-list')
const empty = document.querySelector('#empty-state')
const toast = document.querySelector('#toast')
let toastTimer

document.querySelectorAll('.type-option').forEach((button) => {
  button.addEventListener('click', () => {
    selectedType = button.dataset.type
    document.querySelectorAll('.type-option').forEach((option) => option.classList.toggle('active', option === button))
  })
})

function renderAddresses() {
  document.querySelector('#count').textContent = String(addresses.length).padStart(2, '0')
  empty.hidden = addresses.length > 0
  list.innerHTML = addresses.map((address) => `
    <article class="address-card">
      <div class="card-top"><span class="address-kind ${address.type.toLowerCase()}"><span class="card-icon">${icons[address.type.toLowerCase()]}</span>${address.type.toUpperCase()}</span><button class="delete-button" type="button" data-id="${escapeHtml(address._id)}" aria-label="Delete ${address.type} address">×</button></div>
      <strong class="address-street">${escapeHtml(address.line1)}</strong>
      ${address.line2 ? `<span class="address-extra">${escapeHtml(address.line2)}</span>` : ''}
      <span class="address-location">${[address.city, address.region, address.postal].filter(Boolean).map(escapeHtml).join(', ')}</span>
      ${address.country ? `<span class="address-country">${escapeHtml(address.country)}</span>` : ''}
    </article>`).join('')
  list.querySelectorAll('.delete-button').forEach((button) => button.addEventListener('click', async () => {
    try {
      const response = await fetch(`/api/addresses/${encodeURIComponent(button.dataset.id)}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Delete failed')
      await loadAddresses()
    } catch {
      showToast('Could not delete address')
    }
  }))
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])
}

async function loadAddresses() {
  const response = await fetch('/api/addresses')
  if (!response.ok) throw new Error('Could not load address book')
  const saved = await response.json()
  const unique = new Map()
  for (const address of saved) unique.set(`${address.type}:${address.line1.trim().toLowerCase()}`, address)
  addresses = [...unique.values()]
  renderAddresses()
}

function showToast(message) {
  document.querySelector('#toast span').textContent = message
  toast.classList.add('show')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600)
}

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const data = new FormData(form)
  const address = { type: selectedType, line1: data.get('line1').trim(), line2: data.get('line2').trim(), city: data.get('city').trim(), region: data.get('region').trim(), postal: data.get('postal').trim(), country: data.get('country').trim() }
  try {
    const response = await fetch('/api/addresses', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(address) })
    if (!response.ok) throw new Error('Save failed')
    form.reset()
    await loadAddresses()
    showToast('Address saved to database')
  } catch {
    showToast('Could not save — check the server and database')
  }
})

async function initializeAddressBook() {
  try {
    await loadAddresses()
    let legacy = []
    try {
      const parsed = JSON.parse(localStorage.getItem('address-book') || '[]')
      if (Array.isArray(parsed)) legacy = parsed
    } catch { /* Ignore invalid data from the previous local-only version. */ }

    if (legacy.length) {
      const migratedKeys = new Set()
      for (const address of legacy) {
        const migrated = address.type === 'Home' ? { ...address, ...birlaHome } : address
        const key = `${migrated.type}:${String(migrated.line1).trim().toLowerCase()}`
        if (migratedKeys.has(key)) continue
        migratedKeys.add(key)
        const exists = addresses.some((saved) => saved.type === migrated.type && saved.line1 === migrated.line1)
        if (!exists) {
          const response = await fetch('/api/addresses', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(migrated) })
          if (!response.ok) throw new Error('Migration failed')
          addresses.push(await response.json())
        }
      }
    }

    if (!addresses.some((address) => address.type === 'Home')) {
      const response = await fetch('/api/addresses', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(birlaHome) })
      if (!response.ok) throw new Error('Could not add default home address')
      addresses.push(await response.json())
    }
    localStorage.removeItem('address-book')
    await loadAddresses()
  } catch {
    showToast('Database unavailable — check MongoDB and the API server')
  }
}

initializeAddressBook()
