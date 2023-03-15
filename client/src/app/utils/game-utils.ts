export class GameUtils {
  static transformNameFromType(type: string): string {
    const sw: { [key: string]: string } = {
      infinity: 'Игра без времени',
      timer: 'Игра на время',
      multi: 'Мультиплеер',
    };
    return sw[type] ?? type;
  }
}
