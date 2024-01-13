<script lang="ts">
  import { auth, user } from '$lib/firebase'
  import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    const credential = await signInWithPopup(auth, provider)

    const idToken = await credential.user.getIdToken()

    const res = await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'CSRF-Token': csrfToken  // HANDLED by sveltekit automatically
      },
      body: JSON.stringify({ idToken }),
    })
  }
</script>

<h2>Login</h2>

{#if $user}
  <h2 class="card-title">Welcome, {$user.displayName}</h2>
  <p class="text-center text-success">You are logged in</p>
  <a class="btn btn-primary" href="/login/username">Pick your username</a>
{:else}
  <button class="btn btn-primary" on:click={signInWithGoogle}
    >Sign in with Google</button
  >
{/if}
