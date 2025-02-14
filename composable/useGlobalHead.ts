export function useGlobalHead(branding: any) {
  if (!branding) return

  const calcForeground = (background: string) => {
    const hsl = background.match(/(\d{1,3})\s+(\d{1,3})%\s+(\d{1,3})%/);
    if (!hsl) return '0 0% 0%';

    const [h, s, l] = hsl.slice(1).map(Number);
    const luminance = (l <= 50) ? 98 : 4;

    return `224 71% ${luminance}%`
  }

  useHead({
    link: [
      {
        rel: 'stylesheet',
        href: `https://fonts.googleapis.com/css2?family=${encodeURIComponent(branding.heading_font)}:wght@500;600;700&family=${encodeURIComponent(branding.body_font)}:wght@400;500;600;700&display=swap`,
      },
    ],
    style: [
      {
        innerHTML: `
          :root {
            --primary: ${branding.primary_color} !important;
            --primary-foreground: ${calcForeground(branding.primary_color)} !important;
            --accent: ${branding.accent_color} !important;
            --accent-foreground: ${calcForeground(branding.accent_color)} !important;
            --radius: ${branding.border_radius}rem !important;
            --radius-button: ${branding.button_radius}rem !important;
            --font-headings: '${branding.heading_font || 'Inter'}' !important;
            --font-body: '${branding.body_font || 'Inter'}' !important;
          }
        `,
      },
    ],
  })
}