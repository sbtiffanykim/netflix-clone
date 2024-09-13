import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    red: string;
    black: {
      300: string;
      200: string;
      100: string;
    };
    white: {
      200: string;
      100: string;
    };
  }
}
