// Web Audio API Sound Effects (Candle Blow, Chimes, Fanfare)
// Note: Background music is strictly Anirudh's Remo Birthday Song (remo-birthday.mp3)

class SoundEngine {
  private ctx: AudioContext | null = null;
  private volumeNode: GainNode | null = null;
  private currentVolume = 0.5;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.volumeNode = this.ctx.createGain();
      this.volumeNode.gain.value = this.currentVolume;
      this.volumeNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft high-register celeste / chime note for interactions
  public playChime(freq = 880, duration = 1.0) {
    try {
      this.initCtx();
      if (!this.ctx || !this.volumeNode) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.02, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.volumeNode);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio not permitted yet
    }
  }

  // Candle blowing sound effect
  public playCandleBlow() {
    try {
      this.initCtx();
      if (!this.ctx || !this.volumeNode) return;

      const bufferSize = this.ctx.sampleRate * 1.2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(500, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 1.0);
      filter.Q.value = 2.5;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.volumeNode);

      noise.start();
      noise.stop(this.ctx.currentTime + 1.3);
    } catch {
      // ignore
    }
  }

  // Sparkling fanfare / celebration sound
  public playCelebration() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 1.2);
      }, idx * 110);
    });
  }
}

export const soundEngine = new SoundEngine();
