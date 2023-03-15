export class Utils {
  static showError(error: any, func?: (param: any) => void) {
    const text = Utils.getErrorText(error);
    console.error(text);
    func?.(text);
  }

  static getErrorText(error: any) {
    if (typeof error === 'string') {
      return error;
    }
    if (typeof error?.error === 'string') {
      return error.error;
    }
    if (typeof error?.message === 'string') {
      return error.message;
    }
    return error;
  }
}
