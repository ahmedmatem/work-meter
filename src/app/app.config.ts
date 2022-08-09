import { environment } from '../environments/environment'

export const APP_NAME: string = "Workmeter"

export const API_KEY: string = environment.firebaseApiKey

// Firebise auth rest api urls
export const SIGN_IN_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`

// Data storage keys
export const KEY_WORKERS_IDS: string = "workers_ids"

export const DB_URL = 'https://daywork-manager-default-rtdb.europe-west1.firebasedatabase.app/'