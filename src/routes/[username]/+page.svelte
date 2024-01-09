<script lang="ts">
  import UserLink from '$lib/components/UserLink.svelte'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<svelte:head>
  <title>@{data.username} Links</title>
  <meta name="description" content={data.bio} />
</svelte:head>

<main class="prose text-center mx-auto mt-8">
  <a
    href="/{data.username}/edit"
    class="btn btn-secondary btn-xs absolute right-4 top-4">Edit Profile</a
  >
  <h1 class="text-3xl lg:text-3xl text-purple-500 mb-6">@{data.username}</h1>

  <img
    src={data.photoURL ?? '/user.png'}
    alt="photoURL"
    width="256"
    height="256"
    class="mx-auto"
  />
  <p class="text-xl my-8">{data.bio ?? 'no bio yet...'}</p>
  <ul class="list-none px-2 m-0">
    {#each data.links as item}
      <li>
        <UserLink {...item} />
      </li>
    {/each}
  </ul>
</main>
