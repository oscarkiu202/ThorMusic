import heroImg from './assets/hero.png'
import './App.css'

const playlists = [
  { title: 'Mood Booster', subtitle: 'Pop + Feel-Good', color: '#1db954' },
  { title: 'Chill Vibes', subtitle: 'Downtempo and lounge', color: '#5a5d74' },
  { title: 'Deep Focus', subtitle: 'Ambient, instrumental', color: '#2f4b6a' },
  { title: 'Top Hits', subtitle: 'Today’s favorites', color: '#8c489f' },
]

const tracks = [
  { title: 'Electric Dreams', artist: 'Nova Pulse', duration: '3:42' },
  { title: 'Night Drive', artist: 'Luna Stereo', duration: '4:08' },
  { title: 'Summer Blue', artist: 'Arcade Bloom', duration: '3:19' },
  { title: 'Golden Hour', artist: 'Velvet Ray', duration: '4:21' },
  { title: 'Afterglow', artist: 'Skyline Hearts', duration: '5:00' },
]

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">T</div>
          <span>Thorify</span>
        </div>

        <nav className="nav-group">
          <button className="nav-button active">Inicio</button>
          <button className="nav-button">Buscar</button>
          <button className="nav-button">Tu Biblioteca</button>
        </nav>

        <div className="library">
          <p className="library-title">Tus playlists</p>
          <ul>
            <li>Rock Clasicos</li>
            <li>Electronica Chill</li>
            <li>Favoritos</li>
            <li>Recientes</li>
          </ul>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <div>
            <h1>Buen día</h1>
            <p>Explora música nueva, playlists y tus favoritos.</p>
          </div>
          <button className="profile-button">Perfil</button>
        </header>

        <section className="hero-card">
          <div className="hero-cover">
            <img src={heroImg} alt="Portada de álbum" />
          </div>
          <div className="hero-meta">
            <span className="eyebrow">Playlist destacada</span>
            <h2>Ritmos energéticos</h2>
            <p>Una selección perfecta para concentrarte y subir el ánimo.</p>
            <div className="hero-actions">
              <button className="btn play">Reproducir</button>
              <button className="btn secondary">Seguir</button>
            </div>
          </div>
        </section>

        <section className="playlist-grid">
          {playlists.map((playlist) => (
            <article key={playlist.title} className="playlist-card" style={{ background: playlist.color }}>
              <div>
                <p>{playlist.title}</p>
                <span>{playlist.subtitle}</span>
              </div>
            </article>
          ))}
        </section>

        <section className="track-list-section">
          <div className="section-header">
            <div>
              <h3>Tracks recientes</h3>
              <p>Continuá tu sesión con estas canciones.</p>
            </div>
            <button className="link-button">Ver todo</button>
          </div>

          <div className="track-list">
            {tracks.map((track) => (
              <div key={track.title} className="track-item">
                <div>
                  <p className="track-title">{track.title}</p>
                  <p className="track-artist">{track.artist}</p>
                </div>
                <span>{track.duration}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="player-bar">
        <div className="player-info">
          <div className="now-playing-cover">
            <img src={heroImg} alt="Now playing" />
          </div>
          <div>
            <p className="track-title">Electric Dreams</p>
            <p className="track-artist">Nova Pulse</p>
          </div>
        </div>
        <div className="player-controls">
          <button>⏮</button>
          <button className="play-button">⏯</button>
          <button>⏭</button>
        </div>
        <div className="player-extra">
          <span>03:12 / 03:42</span>
        </div>
      </footer>
    </div>
  )
}

export default App
