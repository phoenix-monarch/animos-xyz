<script lang="ts">
  import CoverAnime from "$lib/components/CoverAnime.svelte";
  import EpisodeProgress from "$lib/components/EpisodeProgress.svelte";
  import { formatTime } from "$lib/utils";
  import type { EpisodeWithAnime } from "$lib/types";

  export let episode: EpisodeWithAnime;
</script>

<a
  href="/episode?animeId={episode.anime
    .kitsuId}&episodeId={episode.number}&totalEpisode={episode.anime.episodes}"
>
  <div class="flex flex-col gap-2 items-center">
    <CoverAnime anime={episode.anime} infoOnHover={false} navigate={false} />
    <div class="flex justify-between w-full text-sm my-2 text-gray-300 px-2">
      <span>Episode {episode.number}</span>
      <span
        >{formatTime(episode.history.watchTime)} / {formatTime(
          episode.length ?? 0
        )}</span
      >
    </div>
    <div class="w-full px-4">
      <EpisodeProgress
        length={episode.length ?? 0}
        watched={episode.history.watchTime}
      />
    </div>
  </div>
</a>
