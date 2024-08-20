import { Configuration, create, strict, apply } from 'twind';
import * as colors from 'twind/colors'
import { css, theme, keyframes } from 'twind/css';
import { cssomSheet } from 'twind';

export const sheet = cssomSheet({ target: new CSSStyleSheet() });

export const twindConfig: Configuration = {
  theme: {
    extend: {
      colors: {
        panel: {
          bgActive: 'oklch(80% 150 260 / 0.4)',
        },
        overlay: {
          bg: 'oklch(100% 0 0 / 0.05)',
          bgHover: 'oklch(60% 70 240 / 0.2)',
          bgActive: 'oklch(60% 70 240 / 0.4)',
          border: 'oklch(100% 0 0 / 0.3)',
          shadow: 'oklch(0% 0 0 / 0.15)',
          highlight: 'oklch(100% 0 0 / 0.5)',
        },
        icon: {
          default: 'oklch(100% 0 0 / 0.7)',
          hover: 'oklch(100% 80 240)',
          active: 'oklch(100% 150 260)',
          glow: 'oklch(70% 150 260 / 0.8)',
        },
      },
    },
  },
};

export const { tw } = create({ sheet, ...twindConfig });

export const sweepLightKeyframes = keyframes({
  '0%': { transform: 'translate(-40%, -40%)' },
  '100%': { transform: 'translate(40%, 40%)' },
});

export const bounceKeyframes = keyframes({
  '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
  '40%': { transform: 'translateY(-5px)' },
  '60%': { transform: 'translateY(-2px)' },
});

export const pulseGlowKeyframes = keyframes({
  '0%, 100%': { filter: 'drop-shadow(0 0 3px var(--icon-glow-color))' },
  '50%': { filter: 'drop-shadow(0 0 8px var(--icon-glow-color))' },
});

export const flexCenter = apply`flex items-center justify-center`;
export const gridLayout = apply`grid grid-cols-3 grid-rows-3 gap-2`;
export const fullSize = apply`w-full h-full`;
export const roundedMd = apply`rounded-md`;

export const overlayBackground = css`
  background: linear-gradient(135deg, ${theme('colors.overlay.bg')}, ${theme('colors.overlay.bg')});
  backdrop-filter: blur(10px);
`;

export const buttonNormalBackground = css`
  background: linear-gradient(135deg, ${theme('colors.overlay.bg')}, ${theme('colors.overlay.bg')});
`;

export const buttonHoverBackground = css`
  background: linear-gradient(135deg, ${theme('colors.overlay.bgHover')}, ${theme('colors.overlay.bgHover')});
`;

export const buttonActiveBackground = css`
  background: linear-gradient(135deg, ${theme('colors.overlay.bgActive')}, ${theme('colors.overlay.bgActive')});
`;

export const overlayBorder = css`border: 1px solid ${theme('colors.overlay.border')}`;


export const buttonShadow = css`
  box-shadow: 0 2px 4px ${theme('colors.overlay.shadow')}, inset 0 1px 0 ${theme('colors.overlay.bg')};
`;

export const defaultTransition = apply`transition-all duration-200 ease-in-out`;

export const cursorPointer = apply`cursor-pointer`;
export const scaleOnActive = apply`active:scale-97`;

export const sweepLightAnimation = css`
  &::before {
    content: '';
    position: absolute;
    top: -200%;
    left: -200%;
    width: 500%;
    height: 500%;
    background: linear-gradient(
      135deg,
      ${theme('colors.overlay.bg')} 20%,
      ${theme('colors.overlay.bg')} 35%,
      ${theme('colors.overlay.highlight')} 49%,
      ${theme('colors.overlay.highlight')} 50%,
      ${theme('colors.overlay.highlight')} 51%,
      ${theme('colors.overlay.bg')} 65%,
      ${theme('colors.overlay.bg')} 80%
    );
    transition: opacity 0.2s ease-in-out;
    opacity: 0;
  }

  &:hover::before {
    opacity: 1;
    animation: ${sweepLightKeyframes} 0.6s linear infinite;
  }
`;

export const bounceAnimation = css`
  animation: ${bounceKeyframes} 0.5s ease-in-out;
`;

export const pulseGlowAnimation = css`
  animation: ${pulseGlowKeyframes} 2s ease-in-out infinite;
`;

export const iconBaseStyles = css`
  --icon-glow-color: ${theme('colors.icon.glow')};
  & path, & circle, & line {
    stroke: ${theme('colors.icon.default')};
    stroke-width: 2;
    transition: all 0.2s ease-in-out;
  }
`;

export const iconHoverStyles = css`
  & path, & circle, & line {
    stroke: ${theme('colors.icon.hover')};
  }
`;

export const iconActiveStyles = css`
  & path, & circle, & line {
    stroke: ${theme('colors.icon.active')};
    stroke-width: 3;
  }
  ${pulseGlowAnimation}
`;

export const overlayContainerStyles = apply`
  ${gridLayout} ${fullSize} ${roundedMd}
  p-2 box-border
  ${overlayBackground}
`;

export const buttonBaseStyles = apply`
  ${flexCenter} ${fullSize} ${roundedMd}
  ${defaultTransition} ${cursorPointer}
  ${buttonNormalBackground}
  ${overlayBorder}
  ${buttonShadow}
  relative overflow-hidden
  ${sweepLightAnimation}
`;

export const ActivePanelBaseStyles = apply`
  ${overlayBorder}
  ${buttonShadow}
  relative overflow-hidden
`;

export const buttonHoverStyles = apply`
  hover:${buttonHoverBackground}
`;

export const buttonActiveStyles = apply`
  ${scaleOnActive}
  ${buttonActiveBackground}
  ${bounceAnimation}
`;

export const iconStyles = apply`
  w-1/3 h-1/3 ${defaultTransition}
  ${iconBaseStyles}
  ${css`
    button:hover & {
      ${iconHoverStyles}
    }
    .active & {
      ${iconActiveStyles}
    }
  `}
`;
