import axios from 'axios';
import HLSParser from 'hls-parser';

export const USER_AGENT =
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36';

export const headerOption = { headers: { 'User-Agent': USER_AGENT } };

export function getProxyUrl(url: string) {
	const proxy_url = 'https://hls.animos.cf';
	const file_extension = '.m3u8';
	const urlBase = Buffer.from(url).toString('base64');
	return `${proxy_url}/${urlBase}${file_extension}`;
}

export async function getHlsDuration(url: string) {
	const resp = await axios.get<string>(url);
	const hls = HLSParser.parse(resp.data);
	if (!hls.isMasterPlaylist) {
		const totalLength = hls.segments.reduce((prev, current) => prev + current.duration, 0);
		return Math.ceil(totalLength);
	} else {
		throw new Error('Playlist is Master.');
	}
}
