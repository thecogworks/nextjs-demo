import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LayoutContainer from '../components/templates/LayoutContainer'
import Navigation from '../components/organisms/Navigation'
import theme from '../themes/mui';

function MyApp({ Component, pageProps }: AppProps) {

  let pages = []

  if (pageProps.data) {
    pages = [...pageProps.data.navigation]
  }

  return (
    <StylesProvider>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LayoutContainer maxWidth={false} disableGutters>
            <Navigation pages={pages} />
            <Component {...pageProps} />
          </LayoutContainer>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  )
}
export default MyApp
