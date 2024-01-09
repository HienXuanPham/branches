import { initializeApp } from 'firebase/app'
import { doc, getFirestore, onSnapshot } from 'firebase/firestore'
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { writable, type Readable, derived } from 'svelte/store'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDm2WAP1pcNaP4PhUwivNP59vqq0s5wrsM',
  authDomain: 'branches-a75f7.firebaseapp.com',
  projectId: 'branches-a75f7',
  storageBucket: 'branches-a75f7.appspot.com',
  messagingSenderId: '404479366982',
  appId: '1:404479366982:web:f712e9ca129a96e8263747',
  measurementId: 'G-B07SSHLNKQ',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore()
export const auth = getAuth()
export const storage = getStorage()

/**
 * @returns a store with the current firebase user
 */
function userStore() {
  let unsubscribe: () => void

  if (!auth || !globalThis.window) {
    console.warn('Auth is not initialized or not in browser')
    const { subscribe } = writable<User | null>(null)
    return {
      subscribe,
    }
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user)
    })

    return () => unsubscribe()
  })

  return {
    subscribe,
  }
}

export const user = userStore()

/**
 * @param {string} path document path or reference
 * @returns a store with realtime updates on document data
 */
export function docStore<T>(path: string) {
  let unsubscribe: () => void

  const docRef = doc(db, path)

  const { subscribe } = writable<T | null>(null, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set((snapshot.data() as T) ?? null)
    })

    return () => unsubscribe()
  })

  return {
    subscribe,
    ref: docRef,
    id: docRef.id,
  }
}

interface UserData {
  username: string
  bio: string
  photoURL: string
  links: any[]
}

export const userData: Readable<UserData | null> = derived(
  user,
  ($user, set) => {
    if ($user) {
      return docStore<UserData>(`users/${$user.uid}`).subscribe(set)
    } else {
      set(null)
    }
  },
)
