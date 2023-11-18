export default {
  palette: {
    primary: {
      main: '#fa7b11',
      contrastText: '#FFF'
    }
  },
  typography: {
    subtitle1: {
      fontWeight: 500,
    },
    caption: {
      color: '#666'
    },
    body1: {
      color: '#666'
    },
    body2: {
      color: '#666'
    }
  },
  components: {
    MuiAvatar: {
      defaultProps: {
        sx: {
          bgcolor: '#fa7b11'
        }
      }
    },
    MuiButton: {
      defaultProps: {
        //        size: 'small',
      },
    },
    MuiCard: {
      defaultProps: {
        sx: {
          py: 1
        }
      }
    },
    MuiDivider: {
      defaultProps: {
        sx: {
          my: 1
        }
      }
    },
    MuiTab: {
      defaultProps: {
        sx: {
          bgcolor: 'white'
        }
      }
    },

  }
};