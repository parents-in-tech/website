import { useEffect, useRef, useState } from 'react';
import { Menu, ArrowRight, MoonStar, Palette, SunMedium } from 'lucide-react';
import { navItems } from '@/lib/site';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function HeaderNav() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [palette, setPalette] = useState<'copper' | 'blue' | 'violet' | 'firefly' | 'lantern'>('copper');
  const [chooserOpen, setChooserOpen] = useState(false);
  const chooserRef = useRef<HTMLDivElement>(null);

  const palettes = [
    { id: 'copper', label: 'Storytime', light: '#b45309', dark: '#f59e0b' },
    { id: 'blue', label: 'Harbor', light: '#1f4b99', dark: '#7fb0ff' },
    { id: 'violet', label: 'Twilight', light: '#883aee', dark: '#a776f4' },
    { id: 'firefly', label: 'Firefly', light: '#8faa04', dark: '#c9e001' },
    { id: 'lantern', label: 'Lantern', light: '#8c2f39', dark: '#f28b82' },
  ] as const;

  useEffect(() => {
    const root = document.documentElement;
    setMode(root.classList.contains('dark') ? 'dark' : 'light');
    const currentPalette = root.dataset.palette;
    if (
      currentPalette === 'blue' ||
      currentPalette === 'violet' ||
      currentPalette === 'copper' ||
      currentPalette === 'firefly' ||
      currentPalette === 'lantern'
    ) {
      setPalette(currentPalette);
    }
  }, []);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (chooserRef.current && !chooserRef.current.contains(event.target as Node)) {
        setChooserOpen(false);
      }
    }

    if (chooserOpen) {
      document.addEventListener('pointerdown', handlePointerDown);
    }

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [chooserOpen]);

  function applyAppearance(
    nextMode: 'light' | 'dark',
    nextPalette: 'copper' | 'blue' | 'violet' | 'firefly' | 'lantern',
  ) {
    const root = document.documentElement;

    root.classList.toggle('dark', nextMode === 'dark');
    root.dataset.palette = nextPalette;
    window.localStorage.setItem('pit-theme-mode', nextMode);
    window.localStorage.setItem('pit-theme-palette', nextPalette);
    setMode(nextMode);
    setPalette(nextPalette);
  }

  function toggleThemeMode() {
    applyAppearance(mode === 'dark' ? 'light' : 'dark', palette);
  }

  function selectPalette(nextPalette: 'copper' | 'blue' | 'violet' | 'firefly' | 'lantern') {
    applyAppearance(mode, nextPalette);
  }

  const activePalette = palettes.find((item) => item.id === palette) ?? palettes[0];

  function renderPaletteButtons(compact = false) {
    return palettes.map((item) => {
      const selected = item.id === palette;

      return (
        <button
          key={item.id}
          type="button"
          onClick={() => selectPalette(item.id)}
          className={`flex items-center justify-between rounded-2xl border px-3 py-3 text-left transition ${
            selected
              ? 'border-primary bg-accent text-accent-foreground'
              : 'border-border/70 bg-background/80 text-foreground hover:border-primary/30'
          } ${compact ? 'w-full' : ''}`}
        >
          <span className="flex flex-col">
            <span className="text-sm font-semibold">{item.label}</span>
            <span className="text-xs text-muted-foreground">{selected ? 'Selected' : 'Switch palette'}</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 rounded-full border border-black/10" style={{ backgroundColor: item.light }} />
            <span className="h-4 w-4 rounded-full border border-white/10" style={{ backgroundColor: item.dark }} />
          </span>
        </button>
      );
    });
  }

  return (
    <>
      <div className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink href={item.href} className={navigationMenuTriggerStyle()}>
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="hidden items-center gap-2 md:flex">
        <div className="relative" ref={chooserRef}>
          <Button type="button" variant="outline" size="sm" onClick={() => setChooserOpen((open) => !open)} aria-expanded={chooserOpen}>
            <Palette />
            {activePalette.label}
          </Button>

          {chooserOpen && (
            <div className="absolute right-0 top-full z-50 mt-3 w-80 rounded-[1.75rem] border border-border/70 bg-popover p-4 shadow-[0_24px_80px_-42px_rgba(0,0,0,0.35)]">
              <div className="mb-4 space-y-1">
                <p className="text-sm font-semibold text-foreground">Appearance</p>
                <p className="text-sm leading-6 text-muted-foreground">Choose a palette and combine it with light or dark mode.</p>
              </div>

              <div className="grid gap-2">{renderPaletteButtons()}</div>

              <Button type="button" variant="outline" className="mt-4 w-full justify-start" onClick={toggleThemeMode}>
                {mode === 'dark' ? <SunMedium /> : <MoonStar />}
                {mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              </Button>
            </div>
          )}
        </div>
        <Button type="button" variant="outline" size="icon" aria-label="Toggle light and dark mode" onClick={toggleThemeMode}>
          {mode === 'dark' ? <SunMedium /> : <MoonStar />}
        </Button>
        <Button asChild size="sm">
          <a href="/invite">
            Join the community
            <ArrowRight />
          </a>
        </Button>
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button type="button" variant="outline" size="icon" aria-label="Open navigation">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="pr-10">
              <SheetTitle>Parents in Tech</SheetTitle>
              <SheetDescription>
                Join the X community, explore the repos, and contribute to mission-aligned work in GitHub.
              </SheetDescription>
            </SheetHeader>

            <nav className="mt-10 flex flex-col gap-3">
              <div className="rounded-[1.75rem] border border-border/70 bg-background/80 p-4">
                <p className="mb-3 text-sm font-semibold text-foreground">Appearance</p>
                <div className="grid gap-2">{renderPaletteButtons(true)}</div>
                <Button type="button" variant="outline" className="mt-3 w-full justify-start" onClick={toggleThemeMode}>
                  {mode === 'dark' ? <SunMedium /> : <MoonStar />}
                  {mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                </Button>
              </div>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-border/70 bg-background/80 px-4 py-3 text-base font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-6">
              <Button asChild className="w-full">
                <a href="/invite">
                  Join the community
                  <ArrowRight />
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
