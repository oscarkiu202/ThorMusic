export interface User {
  id: number
  email: string
  username: string
  is_admin: boolean
  is_active: boolean
  avatar_url: string | null
  created_at: string
}

export interface Track {
  id: number
  audius_id: string
  title: string
  artist_name: string
  genre: string
  duration: number
  play_count: number
  popularity_score: number
  cover_art_url: string
  stream_url: string
  track_url: string
}

export interface Playlist {
  id: number
  name: string
  description: string
  cover_art: string | null
  is_public: boolean
  play_count: number
  created_at: string
  owner_id: number
  owner_name: string
  tracks_count: number
  tracks?: Track[]
}

export interface AdminStats {
  total_users: number
  total_tracks: number
  total_playlists: number
  total_listening_history: number
}

export interface AuthResponse {
  access_token: string
  token_type: string
}
