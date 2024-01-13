<script lang="ts">
  import { auth, userData } from '$lib/firebase'
  import { signOut } from 'firebase/auth'

  async function signOutSSR() {
    const res = await fetch('/api/signin', { method: 'DELETE' })
    await signOut(auth)
  }
</script>

<div class="navbar bg-base-100">
  <div class="navbar-start">
    <span class="hidden lg:inline">Branches</span>
  </div>
  <div class="navbar-center">
    <span class="btn btn-ghost normal-case text-xl">
      <a href="/{$userData?.username}"
        >👁️ <span class="hidden lg:inline">View</span></a
      >
    </span>
    <span class="btn btn-ghost normal-case text-xl">
      <a href="/{$userData?.username}/edit"
        >🔗 <span class="hidden lg:inline">Edit</span></a
      >
    </span>
    <span class="btn btn-ghost normal-case text-xl">
      <a href="/{$userData?.username}/bio"
        >🍪 <span class="hidden lg:inline">Edit Bio</span></a
      >
    </span>
  </div>
  <div class="navbar-end">
    <a href="/" class="btn btn-outline btn-xs" on:click={() => signOutSSR()}
      >Sign Out</a
    >
  </div>
</div>
