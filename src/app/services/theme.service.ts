import { effect, Injectable, signal, WritableSignal } from '@angular/core';

export interface Theme {
  id: string;
  primary: string;
  displayName: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themes: Theme[] = [
    {
      id: 'green',
      primary: '#6b9080',
      displayName: 'Viridian',
    },
    // { id: 'green', primary: '#00796B', displayName: 'Green' },
    // { id: 'orange', primary: '#E65100', displayName: 'Orange' },
    // { id: 'purple', primary: '#6200EE', displayName: 'Purple' },
    // { id: 'red', primary: '#C2185B', displayName: 'Red' },
  ];

  public mode: WritableSignal<'light' | 'dark'> = signal<'light' | 'dark'>(
    'light'
  );

  public currentTheme: WritableSignal<Theme> = signal<Theme>(this.themes[0]);

  public getThemes(): Theme[] {
    return this.themes;
  }

  public setTheme(themeId: string): void {
    const theme = this.themes.find((t) => t.id === themeId);
    if (theme) {
      this.currentTheme.set(theme);
    }
  }

  public toggleMode = effect(() => {
    document.body.style.colorScheme = this.mode();
  });

  public updateThemeClass = effect(() => {
    const theme = this.currentTheme();

    document.body.classList.remove(...this.themes.map((t) => `${t.id}-theme`));
    document.body.classList.add(`${theme.id}-theme`);
  });
}
