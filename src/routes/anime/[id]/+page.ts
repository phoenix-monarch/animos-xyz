import Jikan from '$lib/common/jikan/index.js';

export async function load({ params }) {
	const { id } = params;
	const malId = Number(id);
	const result = await Jikan.getAnime(malId);
	const recommendations = await Jikan.getRecommendations(malId);
	console.log("done");
	return { result, recommendations };
}