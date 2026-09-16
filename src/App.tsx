import { useEffect, useRef, useState } from 'react'
import type { TouchEvent } from 'react'

const artworks = [
  { src: '/ephremart/art/art-01.webp', alt: 'Figurative painting with musical and cultural motifs by Ephrem Tefera', shape: 'portrait' },
  { src: '/ephremart/art/art-02.webp', alt: 'Two stylized figures with a piano motif by Ephrem Tefera', shape: 'portrait-tall' },
  { src: '/ephremart/art/art-03.webp', alt: 'Highland landscape painting by Ephrem Tefera', shape: 'landscape-wide' },
  { src: '/ephremart/art/art-04.webp', alt: 'Painting with Ethiopian cultural symbols and colors by Ephrem Tefera', shape: 'landscape' },
  { src: '/ephremart/art/art-05.webp', alt: 'Heritage composition with shields and symbolic forms by Ephrem Tefera', shape: 'portrait' },
  { src: '/ephremart/art/art-06.webp', alt: 'Symbolic painting with a horse and geometric forms by Ephrem Tefera', shape: 'portrait-tall' },
  { src: '/ephremart/art/art-07.webp', alt: 'Contemporary figurative painting of two women by Ephrem Tefera', shape: 'portrait' },
  { src: '/ephremart/art/art-08.webp', alt: 'Blue figure resting across piano keys by Ephrem Tefera', shape: 'landscape' },
  { src: '/ephremart/art/art-09.webp', alt: 'Contemporary figurative painting by Ephrem Tefera', shape: 'portrait' },
  { src: '/ephremart/art/art-10.webp', alt: 'Urban water landscape painting with a boat by Ephrem Tefera', shape: 'landscape-wide' },
]

const featuredWorks = [2, 9, 7, 3]

const exhibitions = [
  'Hyatt Regency',
  'Ethiopian Skylight Hotel',
  'National Museum of Ethiopia',
  "St. George's Gallery",
  'Hilton Hotel',
]

const mobileLinks = [
  { href: '#hero-gallery', label: 'Highlights' },
  { href: '#works', label: 'Works' },
  { href: '#language', label: 'Visual language' },
  { href: '#about', label: 'About' },
  { href: '#exhibitions', label: 'Exhibitions' },
]

function App() {
  const [activeArtwork, setActiveArtwork] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const featuredSliderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (activeArtwork === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveArtwork(null)
      if (event.key === 'ArrowRight') setActiveArtwork((current) => current === null ? null : (current + 1) % artworks.length)
      if (event.key === 'ArrowLeft') setActiveArtwork((current) => current === null ? null : (current - 1 + artworks.length) % artworks.length)
    }

    document.body.classList.add('lightbox-open')
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('lightbox-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeArtwork])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.body.classList.add('menu-open')
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const moveArtwork = (direction: 1 | -1) => {
    setActiveArtwork((current) => {
      if (current === null) return null
      return (current + direction + artworks.length) % artworks.length
    })
  }

  const scrollFeatured = (direction: 1 | -1) => {
    const slider = featuredSliderRef.current
    if (!slider) return
    slider.scrollBy({ left: slider.clientWidth * 0.52 * direction, behavior: 'smooth' })
  }

  const onArtworkTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null
  }

  const onArtworkTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null) return
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current
    const delta = endX - touchStartX.current
    touchStartX.current = null

    if (Math.abs(delta) < 52) return
    moveArtwork(delta < 0 ? 1 : -1)
  }

  return (
    <main id="top">
      <a className="skip-link" href="#works">Skip to selected works</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Ephrem Tefera home" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">ET</span>
          <span className="brand-copy"><strong>Ephrem Tefera</strong><small>Visual Artist · Addis Ababa</small></span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#hero-gallery">Highlights</a>
          <a href="#works">Works</a>
          <a href="#language">Visual language</a>
          <a href="#about">About</a>
          <a href="#exhibitions">Exhibitions</a>
        </nav>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        {menuOpen && (
          <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
            {mobileLinks.map((link, index) => (
              <a href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <section className="hero hero-gallery-hero" id="hero-gallery" aria-labelledby="hero-title">
        <h1 id="hero-title" className="visually-hidden">Ephrem Tefera — Visual Artist</h1>

        <div className="hero-gallery-shell" aria-label="Highlighted works by Ephrem Tefera">
          <button className="hero-gallery-arrow hero-gallery-arrow-left" type="button" onClick={() => scrollFeatured(-1)} aria-label="Previous highlighted works">‹</button>
          <div className="hero-gallery-slider" ref={featuredSliderRef}>
            {featuredWorks.map((artworkIndex, slideIndex) => {
              const artwork = artworks[artworkIndex]
              return (
                <button
                  className="hero-gallery-slide"
                  key={artwork.src}
                  type="button"
                  onClick={() => setActiveArtwork(artworkIndex)}
                  aria-label={`Open highlighted work ${String(slideIndex + 1).padStart(2, '0')}`}
                >
                  <img src={artwork.src} alt={artwork.alt} fetchPriority={slideIndex < 2 ? 'high' : 'auto'} decoding="async" />
                  <span className="hero-gallery-number">{String(slideIndex + 1).padStart(2, '0')}</span>
                </button>
              )
            })}
          </div>
          <button className="hero-gallery-arrow hero-gallery-arrow-right" type="button" onClick={() => scrollFeatured(1)} aria-label="Next highlighted works">›</button>
        </div>

        <div className="hero-gallery-caption">
          <span className="hero-gallery-caption-label">Selected highlights · 01—04</span>
          <p>Contemporary visual stories in <em>color, culture & form.</em></p>
          <a href="#works">View all works <span>↘</span></a>
        </div>
      </section>

      <section className="manifesto" aria-label="Artist introduction">
        <p>Painting becomes a place where <span>identity</span>, memory, rhythm and cultural form can meet.</p>
      </section>

      <section className="section works" id="works">
        <div className="section-heading">
          <div>
            <p className="kicker">Portfolio</p>
            <h2>Selected works</h2>
          </div>
          <p>Ten works showing the breadth of Ephrem’s figurative, symbolic, musical and landscape practice.</p>
        </div>

        <div className="gallery-grid">
          {artworks.map((artwork, index) => (
            <button
              className={`gallery-item gallery-${index + 1}`}
              key={artwork.src}
              onClick={() => setActiveArtwork(index)}
              aria-label={`Open selected work ${String(index + 1).padStart(2, '0')}`}
            >
              <img src={artwork.src} alt={artwork.alt} loading={index < 3 ? 'eager' : 'lazy'} decoding="async" />
              <span className="gallery-meta"><b>{String(index + 1).padStart(2, '0')}</b><em>View work ↗</em></span>
            </button>
          ))}
        </div>
      </section>

      <section className="visual-language" id="language">
        <div className="language-copy">
          <p className="kicker">Recurring visual worlds</p>
          <h2>Identity.<br />Rhythm.<br /><span>Memory.</span></h2>
          <p>
            Across the work, stylized figures, musical forms, cultural symbols and landscapes
            move between personal experience and wider cultural memory.
          </p>
        </div>
        <div className="language-collage">
          <figure className="language-a"><img src={artworks[6].src} alt={artworks[6].alt} loading="lazy" /></figure>
          <figure className="language-b"><img src={artworks[3].src} alt={artworks[3].alt} loading="lazy" /></figure>
          <figure className="language-c"><img src={artworks[0].src} alt={artworks[0].alt} loading="lazy" /></figure>
        </div>
        <div className="theme-strip" aria-label="Recurring themes">
          <span>Figurative works</span><span>Music & form</span><span>Heritage & symbol</span><span>Land & place</span>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="about-visual">
          <figure className="about-main"><img src={artworks[5].src} alt={artworks[5].alt} loading="lazy" /></figure>
          <figure className="about-detail"><img src={artworks[2].src} alt={artworks[2].alt} loading="lazy" /></figure>
        </div>
        <div className="about-copy">
          <p className="kicker">The artist</p>
          <h2>Ephrem Tefera</h2>
          <p className="lead">A visual artist based in Addis Ababa, Ethiopia, working primarily in acrylic and oil painting.</p>
          <p>
            His work explores identity, beauty, culture, and women’s life journeys through contemporary visual expression.
          </p>
          <div className="about-facts">
            <div>
              <span>Education</span>
              <p>Addis Ababa University, Alle School of Fine Arts and Design<br />Abyssinia Fine Art School</p>
            </div>
            <div>
              <span>Recognition</span>
              <p>Certificate from UNFPI</p>
            </div>
          </div>
        </div>
      </section>

      <section className="exhibitions section" id="exhibitions">
        <div className="section-heading exhibitions-heading">
          <div>
            <p className="kicker">Selected venues</p>
            <h2>Exhibitions</h2>
          </div>
          <p>Ephrem’s work has been presented at selected museum, gallery and hospitality venues.</p>
        </div>
        <div className="exhibition-list">
          {exhibitions.map((venue, index) => (
            <article className="exhibition-row" key={venue}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{venue}</h3>
              <b>Selected exhibition venue</b>
            </article>
          ))}
        </div>
      </section>

      <section className="closing-art" aria-label="Closing artwork">
        <img src={artworks[4].src} alt={artworks[4].alt} loading="lazy" />
        <div className="closing-copy">
          <p>Visual Artist · Addis Ababa</p>
          <h2>Color becomes memory.<br />Form becomes story.</h2>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark">ET</span><span className="brand-copy"><strong>Ephrem Tefera</strong><small>Visual Artist</small></span></a>
        <p>Contemporary painting rooted in identity, culture and lived experience.</p>
        <div className="footer-meta"><span>Addis Ababa, Ethiopia</span><span>© {new Date().getFullYear()} Ephrem Tefera</span></div>
      </footer>

      {activeArtwork !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Artwork viewer" onClick={() => setActiveArtwork(null)}>
          <button className="lightbox-close" onClick={() => setActiveArtwork(null)} aria-label="Close artwork viewer">Close ×</button>
          <button className="lightbox-nav lightbox-prev" onClick={(event) => { event.stopPropagation(); moveArtwork(-1) }} aria-label="Previous artwork">←</button>
          <figure
            className="lightbox-art"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={onArtworkTouchStart}
            onTouchEnd={onArtworkTouchEnd}
          >
            <img src={artworks[activeArtwork].src} alt={artworks[activeArtwork].alt} />
            <figcaption><span>Selected work · swipe to browse</span><b>{String(activeArtwork + 1).padStart(2, '0')} / {artworks.length}</b></figcaption>
          </figure>
          <button className="lightbox-nav lightbox-next" onClick={(event) => { event.stopPropagation(); moveArtwork(1) }} aria-label="Next artwork">→</button>
        </div>
      )}
    </main>
  )
}

export default App