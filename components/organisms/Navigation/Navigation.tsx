import { useMediaQuery } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';

import {
  Toolbar,
  Grid,
  Box,
  Typography,
  Spacer,
  MenuIcon,
  IconButton,
  Link
} from '../../atoms';
import { NavLink } from '../../molecules';
import { LogoImage, StyledAppBar } from './Navigation.styles';

export interface NavigationProps {
  pages: array;
}

const Navigation = ({ pages }) => {

  const router = useRouter()

  const menuItems = []

  for (const [index, value] of pages.entries()) {
    menuItems.push(
      <Grid item>
        <NavLink onClick={ () => router.push(value.url) }>
          <Typography variant="sh4" color="grey">
            { value.name }
          </Typography>
        </NavLink>
      </Grid>
    )
  }

  return (
    <Box data-test-id="header-menu">
      <StyledAppBar position="relative" data-testid="header-menu" color="inherit" elevation={0}>
        <Toolbar variant="dense">
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={12} md={8}>
              <Grid container justify="space-evenly" alignItems="center">
                <Grid item xs={4}>
                  <Link onClick={ () => router.push('/') }>
                    <LogoImage />
                  </Link>
                </Grid>

                <Spacer asDivider y={3} />

                { menuItems }
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
};

export default Navigation;
