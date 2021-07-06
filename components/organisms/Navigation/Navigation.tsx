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
  profileName: string;
}

const Navigation = ({ profileName }: NavigationProps) => {

  const router = useRouter()

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

              <Grid item>
                <NavLink onClick={ () => router.push('/') }>
                  <Typography variant="sh4" color="grey">
                    Home
                  </Typography>
                </NavLink>
              </Grid>

                <Grid item>
                  <NavLink onClick={ () => router.push('/about') }>
                    <Typography variant="sh4" color="grey">
                      About
                    </Typography>
                  </NavLink>
                </Grid>

                <Grid item>
                  <NavLink onClick={ () => router.push('/contact') }>
                    <Typography variant="sh4" color="grey">
                      Contact
                    </Typography>
                  </NavLink>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
};

export default Navigation;
