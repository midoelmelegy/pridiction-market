import { extendTheme as ChakraTheme, ThemeConfig } from '@chakra-ui/react'
import { radioTheme } from '@/styles/radio'
import { lightThemeColors } from '@/styles/light-theme-colors'
import { modalTheme } from '@/styles/modals'
import { accordionTheme } from '@/styles/accordion'

const fonts = `Helvetica Neue`
const pixels = 'Neue Pixel Sans'
export const colors = {
  brand: '#2492ff',
  bg: 'white',
  bgLight: '#f5f5f5',
  border: '#ddd',
  font: '#0F172A',
  fontLight: '#747675',
  green: '#48CB9A',
  red: '#EF5D5D',
  warn: '#d8b812',
  black: '#0F172A',
  grey: {
    100: '#FAFAF9',
    200: '#EDEDEB',
    700: '#747675',
    800: '#787A79',
  },
}

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

export const borderRadius = 'lg'

export const chakraTheme = ChakraTheme({
  ...config,
  fonts: {
    heading: pixels,
    body: fonts,
  },
  colors: lightThemeColors,
  styles: {
    global: {
      body: {
        overflowX: 'hidden',
        userSelect: 'none',
        color: colors.font,
        background: colors.bg,
        fontSize: '14px',
      },
      hr: {
        opacity: '1 !important',
      },
      div: {
        '::-webkit-scrollbar': {
          display: 'none',
        },
      },
      button: {
        fontSize: '14px',
      },
      '.chakra-switch__track': {
        '--switch-bg': 'grey  !important',
        _checked: {
          '--switch-bg': `${colors.brand} !important`,
        },
      },

      // w3a modal styling
      '#w3a-modal': { backdropFilter: 'blur(5px)' },
      '.w3a-modal__inner, .w3a-modal__loader, .w3a-modal__footer, .w3a-wallet-connect__container': {
        bg: `${colors.bg} !important`,
        color: `${colors.font} !important`,
        border: 'none !important',
        borderRadius: `${borderRadius} !important`,
      },
      '.w3a-header': {
        paddingTop: '10px !important',
      },
      '.w3a-header__logo': {
        display: 'none !important',
      },
      '.w3a-header__button': {
        right: '20px !important',
      },
      '.w3a-modal__content, .w3a-modal__header': {
        padding: '10px 20px !important',
      },
      '.w3a-modal__inner': {
        boxShadow: '0 0 30px #ddd !important',
        minHeight: '600px !important',
        maxWidth: '420px !important',
      },
      '.w3a-group__title, .w3a-header__title': {
        color: `${colors.font} !important`,
      },
      '.w3a-button-expand': {
        color: `${colors.brand} !important`,
      },
      '#w3a-modal button, #w3a-modal input, #w3a-modal canvas': {
        borderRadius: `${borderRadius} !important`,
        // border: 'none !important',
      },
      '.w3ajs-external-toggle__button': {
        background: `${colors.brand} !important`,
        color: 'white !important',
        fontWeight: 'bold !important',
      },
      '#w3a-modal .w3a-header__logo img, #w3a-modal .w3a-modal__loader-app-logo img': {
        filter: 'invert()',
        borderRadius: '50% !important',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontSize: '14px',
      },
      variants: {
        outline: {
          borderWidth: 0,
          bg: 'grey.100',
          color: 'black',
          height: '52px',
          fontWeight: 500,
        },
        contained: {
          bg: 'blue.500',
          color: 'white',
          borderRadius: '2px',
          py: '16px',
          px: '8px',
          h: '48px',
          fontSize: '14px',
          fontWeight: 500,
        },
        grey: {
          padding: '4px 8px',
          gap: '4px',
          borderRadius: '2px',
          background: 'grey.300',
          height: 'unset',
          fontWeight: 500,
          fontSize: '14px',
        },
        transparent: {
          background: 'unset',
          p: 0,
          fontSize: '14px',
          height: 'unset',
          fontWeight: 500,
          gap: '8px',
          _focus: {
            bg: 'unset',
          },
        },
      },
    },
    FormLabel: {
      baseStyle: {
        fontSize: '14px',
      },
    },
    Textarea: {
      baseStyle: {
        fontSize: '16px',
      },
    },
    HStack: {
      spacing: '8px',
    },
    Radio: radioTheme,
    Modal: modalTheme,
    Accordion: accordionTheme,
    // Divider
    // Button link
  },
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '1023px',
    xl: '1200px',
    xxl: '1400px',
  },
})
