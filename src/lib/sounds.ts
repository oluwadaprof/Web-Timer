export const natureSounds = {
  rain: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_1fb1d4e8c1.mp3",
  thunder:
    "https://cdn.pixabay.com/download/audio/2021/10/19/audio_f8424bb033.mp3",
  drizzle:
    "https://cdn.pixabay.com/download/audio/2022/03/10/audio_1fb1d4e8c1.mp3",
  snow: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d02e4504ae.mp3",
  wind: "https://cdn.pixabay.com/download/audio/2021/11/25/audio_00fa5593f3.mp3",
  forest:
    "https://cdn.pixabay.com/download/audio/2021/09/06/audio_8ca324a4f6.mp3",
  waves:
    "https://cdn.pixabay.com/download/audio/2021/08/09/audio_88447e769f.mp3",
  stream:
    "https://cdn.pixabay.com/download/audio/2021/08/09/audio_88447e769f.mp3",
  night:
    "https://cdn.pixabay.com/download/audio/2021/08/09/audio_88447e769f.mp3",
  birds:
    "https://cdn.pixabay.com/download/audio/2021/08/09/audio_88447e769f.mp3",
  sunrise:
    "https://cdn.pixabay.com/download/audio/2021/08/09/audio_88447e769f.mp3",
  sunset:
    "https://cdn.pixabay.com/download/audio/2021/08/09/audio_88447e769f.mp3",
  cafe: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_270f49b83b.mp3",
  piano:
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_270f49b83b.mp3",
  fireplace:
    "https://cdn.pixabay.com/download/audio/2021/08/09/audio_88447e769f.mp3",
  fan: "https://cdn.pixabay.com/download/audio/2021/08/09/audio_88447e769f.mp3",
  rain_umbrella:
    "https://cdn.pixabay.com/download/audio/2021/08/09/audio_88447e769f.mp3",
  heartbeat:
    "https://cdn.pixabay.com/download/audio/2021/08/09/audio_88447e769f.mp3",
  leaves:
    "https://cdn.pixabay.com/download/audio/2021/08/09/audio_88447e769f.mp3",
  mountain:
    "https://cdn.pixabay.com/download/audio/2021/08/09/audio_88447e769f.mp3",
};

export class SoundPlayer {
  private audio: HTMLAudioElement;
  private volume: number = 50;
  private isMuted: boolean = false;

  constructor(url: string) {
    this.audio = new Audio(url);
    this.audio.loop = true;
  }

  play() {
    if (!this.isMuted) {
      this.audio.play();
    }
  }

  pause() {
    this.audio.pause();
  }

  setVolume(value: number) {
    this.volume = value;
    this.audio.volume = value / 100;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.audio.pause();
    } else if (this.volume > 0) {
      this.audio.play();
    }
  }

  cleanup() {
    this.audio.pause();
    this.audio.src = "";
  }
}
