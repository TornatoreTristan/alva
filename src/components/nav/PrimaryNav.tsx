import * as React from "react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Chauffage",
    href: "/",
    description:
      "Tout ce qu'il faut savoir sur les différents types de chauffage.",
  },
  {
    title: "Isolation",
    href: "/",
    description:
      "Des articles et des ressources pour vous aider à isoler votre logement.",
  },
  {
    title: "Solaire",
    href: "/",
    description:
      "Preparez au mieux votre projet de panneaux solaires photovoltaïques.",
  },
  {
    title: "Aides & Primes",
    href: "/",
    description: "Découvrez les aides et primes disponibles pour vos travaux.",
  },
  {
    title: "Actualités",
    href: "/",
    description:
      "Alva décrypte l'actualité de la rénovation énergétique pour vous.",
  },
  {
    title: "Partenaires",
    href: "/",
    description:
      "Découvrez nos partenaires spécialisés dans la rénovation énergétique.",
  },
]

export function PrimaryNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Estimateurs en ligne</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      ALVA
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Nos estimateurs sont réalisés avec nos partenaires spécialisés dans leur domaine.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Bilan énergétique">
                Estimez la note DPE de votre bien immobilier.
              </ListItem>
              <ListItem href="/docs/installation" title="Coût travaux">
                Estimez le coût de vos travaux de rénovation.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Aides & Financements">
                Simulez les aides et financements disponibles pour vos travaux.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Guides de la rénovation</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a href="/docs">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Courtage en travaux
            </NavigationMenuLink>
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
