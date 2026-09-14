const art = {
  musicPortrait: '/ephremart/art/photo_1_2026-09-14_18-07-20.webp',
  dualPortrait: '/ephremart/art/photo_2_2026-09-14_18-07-20.webp',
  landscape: '/ephremart/art/photo_3_2026-09-14_18-07-20.webp',
  heritageVertical: '/ephremart/art/photo_5_2026-09-14_18-07-20.webp',
  horseSymbol: '/ephremart/art/photo_6_2026-09-14_18-07-20.webp',
  embrace: '/ephremart/art/photo_7_2026-09-14_18-07-20.webp',
  pianoWide: '/ephremart/art/photo_8_2026-09-14_18-07-20.webp',
  figures: '/ephremart/art/photo_9_2026-09-14_18-07-20.webp',
}

const exhibitions = [
  'Hyatt Regency',
  'Ethiopian Skylight Hotel',
  'National Museum of Ethiopia',
  "St. George's Gallery",
  'Hilton Hotel',
]

function App() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Ephrem Tefera home">
          <span className="brand-mark">ET</span>
          <span>Ephrem Tefera</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#works">Works</a>
          <a href="#themes">Themes</a>
          <a href="#about">About</a>
          <a href="#exhibitions">Exhibitions</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Visual Artist · Addis Ababa, Ethiopia</p>
          <h1>
            Contemporary stories
            <span>through color, culture & form.</span>
          </h1>
          <p className="hero-intro">
            Ephrem Tefera works primarily in acrylic and oil painting, exploring identity,
            beauty, culture and women’s life journeys through contemporary visual expression.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#works">Explore works <span>↗</span></a>
            <a className="text-link" href="#about">Meet the artist <span>↓</span></a>
          </div>
        </div>

        <div className="hero-gallery" aria-label="Selected paintings by Ephrem Tefera">
          <figure className="hero-card card-a"><img src={art.musicPortrait} alt="Selected painting by Ephrem Tefera" /></figure>
          <figure className="hero-card card-b"><img src={art.dualPortrait} alt="Selected painting by Ephrem Tefera" /></figure>
          <figure className="hero-card card-main"><img src={art.embrace} alt="Selected painting by Ephrem Tefera" /></figure>
          <figure className="hero-card card-c"><img src={art.heritageVertical} alt="Selected painting by Ephrem Tefera" /></figure>
          <figure className="hero-card card-d"><img src={art.figures} alt="Selected painting by Ephrem Tefera" /></figure>
        </div>
      </section>

      <section className="section works" id="works">
        <div className="section-heading">
          <div>
            <p className="script-label">Selected</p>
            <h2>Works</h2>
          </div>
          <p>A first selection from Ephrem’s figurative, cultural, musical and landscape work.</p>
        </div>

        <div className="works-grid">
          <figure className="work work-tall"><img src={art.musicPortrait} alt="Painting by Ephrem Tefera" /><figcaption><span>Selected work</span><span>01</span></figcaption></figure>
          <figure className="work work-wide"><img src={art.landscape} alt="Landscape painting by Ephrem Tefera" /><figcaption><span>Selected work</span><span>02</span></figcaption></figure>
          <figure className="work work-wide-bottom"><img src={art.pianoWide} alt="Painting with musical imagery by Ephrem Tefera" /><figcaption><span>Selected work</span><span>03</span></figcaption></figure>
        </div>
      </section>

      <section className="dark-feature" id="themes">
        <div className="feature-title">
          <p className="script-label">Recurring visual worlds</p>
          <h2>Identity, rhythm<br />& memory</h2>
        </div>
        <div className="feature-art feature-one"><img src={art.dualPortrait} alt="Painting by Ephrem Tefera" /></div>
        <div className="feature-art feature-two"><img src={art.heritageVertical} alt="Painting by Ephrem Tefera" /></div>
        <div className="feature-art feature-three"><img src={art.pianoWide} alt="Painting by Ephrem Tefera" /></div>
        <p className="feature-note">Figurative works · Music & form · Heritage & symbol · Land & place</p>
      </section>

      <section className="themes section">
        <div className="section-heading compact">
          <div>
            <p className="script-label">Explore</p>
            <h2>Visual themes</h2>
          </div>
        </div>
        <div className="theme-list">
          <article><span>01</span><h3>Figurative works</h3><p>Expressive figures, relationships, beauty and human presence.</p></article>
          <article><span>02</span><h3>Music & form</h3><p>Rhythm, instruments and musical motifs translated into shape and color.</p></article>
          <article><span>03</span><h3>Heritage & symbol</h3><p>Cultural forms and visual symbols reinterpreted through a contemporary language.</p></article>
          <article><span>04</span><h3>Land & place</h3><p>Landscape, environment and place as part of the artist’s wider visual world.</p></article>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="about-art"><img src={art.horseSymbol} alt="Painting by Ephrem Tefera" /></div>
        <div className="about-copy">
          <p className="script-label">The artist</p>
          <h2>Ephrem Tefera</h2>
          <p className="lead">Ephrem Tefera is a visual artist based in Addis Ababa, Ethiopia, working primarily in acrylic and oil painting.</p>
          <p>His work explores identity, beauty, culture, and women’s life journeys through contemporary visual expression.</p>
          <div className="about-facts">
            <div><span>Education</span><p>Addis Ababa University, Alle School of Fine Arts and Design<br />Abyssinia Fine Art School</p></div>
            <div><span>Recognition</span><p>Certificate from UNFPI</p></div>
          </div>
        </div>
      </section>

      <section className="exhibitions section" id="exhibitions">
        <div className="section-heading">
          <div>
            <p className="script-label">Selected</p>
            <h2>Exhibitions</h2>
          </div>
          <p>Venues where Ephrem Tefera’s work has been exhibited.</p>
        </div>
        <div className="exhibition-list">
          {exhibitions.map((venue, index) => (
            <div className="exhibition-row" key={venue}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{venue}</h3>
              <p>Selected exhibition venue</p>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <div>
          <p className="footer-kicker">Ephrem Tefera</p>
          <h2>Art shaped by identity,<br />culture and lived experience.</h2>
        </div>
        <div className="footer-meta">
          <p>Visual Artist</p>
          <p>Addis Ababa, Ethiopia</p>
          <p>© {new Date().getFullYear()} Ephrem Tefera</p>
        </div>
      </footer>
    </main>
  )
}

export default App
