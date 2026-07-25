import { motion, AnimatePresence } from 'motion/react';

const PHONE_NUMBER = '5581987723203';
const DEFAULT_MESSAGE =
  'Olá, vi o anúncio da Reconstruir e quero um orçamento para minha obra.';

const WHATSAPP_LINK = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
  DEFAULT_MESSAGE
)}`;

/**
 * Botão flutuante de WhatsApp.
 *
 * Discreto por design: vidro escuro consistente com o resto do site
 * (mesmo bg-neutral-950/backdrop-blur usado nos cards), não um balão
 * verde piscando. O verde do WhatsApp aparece só no ícone e num pulso
 * bem sutil, o suficiente pra ser reconhecido de cara sem competir
 * visualmente com o resto da página.
 */
export function WhatsAppButton({ showNudge = false }: { showNudge?: boolean }) {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Falar no WhatsApp"
    >
      {/* Pulso sutil, lento, só pra chamar o olho sem ser inconveniente */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[#25D366]/25"
        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
      />

      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-neutral-950/70 backdrop-blur-xl border border-white/10 shadow-2xl group-hover:border-[#25D366]/40 transition-colors duration-300">
        <svg
          viewBox="0 0 16 16"
          className="w-6 h-6 fill-[#25D366]"
          aria-hidden="true"
        >
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
        </svg>
      </span>

      {/* Mensagem curta e contextual: aparece enquanto o usuário está
          navegando pelo portfólio, incentivando o contato — sem ser
          pop-up, só um balãozinho ao lado do botão */}
      <AnimatePresence>
        {showNudge && (
          <motion.span
            key="nudge"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-neutral-950/90 border border-[#25D366]/30 px-3 py-1.5 text-xs text-white shadow-xl"
          >
            Gostou? Fale com a gente →
          </motion.span>
        )}
      </AnimatePresence>

      {/* Rótulo padrão, só no hover (desktop) — não mostra junto com a
          mensagem contextual acima pra não sobrepor texto */}
      {!showNudge && (
        <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-neutral-950/90 border border-white/10 px-3 py-1.5 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
          Fale no WhatsApp
        </span>
      )}
    </motion.a>
  );
}
