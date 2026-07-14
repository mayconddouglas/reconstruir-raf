import { cn } from "../../lib/utils";
import type { ReactNode } from "react";

/**
 * Container padrão do site.
 *
 * Substitui os max-w-[1400px] / max-w-[1500px] / max-w-4xl / max-w-5xl
 * que antes eram definidos manualmente em cada seção. Toda seção deve
 * usar este componente como wrapper de largura — nunca max-w-[...] solto.
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
        "w-full max-w-app mx-auto px-xs sm:px-sm lg:px-md",
        className
      )}
    >
      {children}
    </div>
  );
}
