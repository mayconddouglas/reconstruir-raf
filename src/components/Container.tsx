import { cn } from "../../lib/utils";
import type { ReactNode } from "react";

/**
 * Container padrão do site.
 *
 * Substitui os containers de largura fixa (px absolutos e classes max-w
 * herdadas do Tailwind, ex.: os "xl" e "5" grandes) que antes eram
 * definidos manualmente em cada seção. Toda seção deve usar este
 * componente como wrapper de largura — nunca um max-width solto.
 *
 * Largura: 1280px (--container-app), múltiplo de 8pt, base para 12 colunas.
 * Padding horizontal segue a escala semântica de spacing (8pt grid).
 */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-app mx-auto px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}
