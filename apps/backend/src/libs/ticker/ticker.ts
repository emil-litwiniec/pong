import config from '../../config';
import { TickerSubscriber } from './ticker.types';

class Ticker {
  static instance: Ticker | null = null;

  public fps: number;
  public frameTime: number;

  private subscribers: Map<number, TickerSubscriber> = new Map();
  private idCount = 0;

  private lastTime = performance.now();

  constructor() {
    if (!Ticker.instance) {
      this.fps = config.FPS;
      this.frameTime = 1000 / config.FPS;
      Ticker.instance = this;
    }

    return Ticker.instance;
  }

  public start() {
    this.tick();
  }

  private tick() {
    const now = performance.now();
    let delta = now - this.lastTime;

    while (delta >= this.frameTime) {
      this.callSubscribers(delta);

      this.lastTime += this.frameTime;
      delta -= this.frameTime;
    }

    setImmediate(this.tick.bind(this));
  }

  private callSubscribers(delta: number) {
    this.subscribers.forEach((subscriber) => {
      subscriber(delta);
    });
  }

  public subscribe(subscriberFn: TickerSubscriber) {
    const id = this.idCount;
    this.subscribers.set(this.idCount, subscriberFn);

    this.idCount++;

    return id;
  }

  public unsubscribe(subscriberId: number) {
    this.subscribers.delete(subscriberId);
  }
}

export const ticker = new Ticker();
