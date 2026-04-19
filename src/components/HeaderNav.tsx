import { useEffect, useState } from 'react';
import { Menu, ArrowRight, MoonStar, SunMedium } from 'lucide-react';
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
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = document.documentElement;
    setTheme(root.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;

    root.classList.toggle('dark', nextTheme === 'dark');
    window.localStorage.setItem('pit-theme', nextTheme);
    setTheme(nextTheme);
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
        <Button type="button" variant="outline" size="icon" aria-label="Toggle color theme" onClick={toggleTheme}>
          {theme === 'dark' ? <SunMedium /> : <MoonStar />}
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
              <Button type="button" variant="outline" className="justify-start" onClick={toggleTheme}>
                {theme === 'dark' ? <SunMedium /> : <MoonStar />}
                {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              </Button>
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
