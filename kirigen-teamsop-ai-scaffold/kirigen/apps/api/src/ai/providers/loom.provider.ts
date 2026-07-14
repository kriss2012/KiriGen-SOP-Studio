import { Injectable } from '@nestjs/common';

/**
 * Fetches a transcript for a given Loom video URL via the Loom API.
 * Requires LOOM_API_KEY. See https://dev.loom.com for API access —
 * transcript availability depends on the workspace plan.
 */
@Injectable()
export class LoomProvider {
  private apiKey = process.env.LOOM_API_KEY;

  async fetchTranscript(loomUrl: string): Promise<string> {
    const videoId = this.extractVideoId(loomUrl);
    const res = await fetch(`https://api.loom.com/v1/videos/${videoId}/transcript`, {
      headers: { Authorization: `Bearer ${this.apiKey}` },
    });
    if (!res.ok) {
      throw new Error(`Loom transcript fetch failed: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data.transcript ?? '';
  }

  private extractVideoId(url: string): string {
    const match = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/);
    if (!match) throw new Error('Could not parse a Loom video id from that URL');
    return match[1];
  }
}
