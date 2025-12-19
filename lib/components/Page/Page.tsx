import CasinoIcon from "@mui/icons-material/Casino";
import ComputerIcon from "@mui/icons-material/Computer";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import MenuIcon from "@mui/icons-material/Menu";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import StorageIcon from "@mui/icons-material/Storage";
import TranslateIcon from "@mui/icons-material/Translate";
import AppBar from "@mui/material/AppBar";
import Box, { BoxProps } from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Images } from "../../constants/Images";
import { env } from "../../constants/env";
import { useZIndex } from "../../constants/zIndex";
import { useLogger } from "../../contexts/InjectionsContext/hooks/useLogger";
import { MyBinderContext } from "../../contexts/MyBinderContext/MyBinderContext";
import { SettingsContext } from "../../contexts/SettingsContext/SettingsContext";
import { Icons } from "../../domains/Icons/Icons";
import { useHighlight } from "../../hooks/useHighlight/useHighlight";
import { useTranslate } from "../../hooks/useTranslate/useTranslate";
import {
  IPossibleLanguages,
  PossibleLanguagesNames,
} from "../../services/internationalization/InternationalizationService";
import { AppLink } from "../AppLink/AppLink";
import { CookieConsent } from "../CookieConsent/CookieConsent";
import { ScrollToTop } from "../ScrollToTop/ScrollToTop";
import { NavLink, NavLinkCategory } from "./NavLink";

let gameIdSingleton: string | undefined = undefined;

export const AppMaxWidth = "1920px";
export const AppToolbarMaxWidth = "1280px";

export enum LiveMode {
  Connecting,
  Live,
}

export const Page: React.FC<{
  gameId?: string;
  isLive?: boolean;
  maxWidth?: string;
  hideHeaderLogo?: boolean;
  hideFooter?: boolean;
  children?: React.ReactNode;
  sx?: BoxProps["sx"];
}> = (props) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const [menuOpen, setMenuOpen] = useState(false);
  const [gameId, setGameId] = useState(gameIdSingleton);
  const shouldDisplayRejoinButton = gameId && !props.gameId;
  const { t, i18n, currentLanguage } = useTranslate();

  const myBinderManager = useContext(MyBinderContext);
  const settingsManager = useContext(SettingsContext);
  const logger = useLogger();
  const zIndex = useZIndex();

  const isLive = props.isLive;
  const highlight = useHighlight();

  useEffect(() => {
    if (props.gameId) {
      setGameId(props.gameId);
      gameIdSingleton = props.gameId;
    }
  }, [props.gameId]);

  return (
    <>
      <ScrollToTop />

      {renderHeader()}
      {renderContent()}
    </>
  );

  function renderContent() {
    return (
      <Fade in timeout={250}>
        <Box>
          <Box
            sx={{
              height: "100%",
              // paddingBottom: "4rem",
              // minHeight: "calc(100vh - 56px)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                ...(props.sx || {}),
                maxWidth: props.maxWidth ?? AppMaxWidth,
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%",
                flex: "1 0 auto",
              }}
            >
              {props.children}
            </Box>
          </Box>

          {renderFooter()}
        </Box>
      </Fade>
    );
  }

  function renderFooter() {
    if (props.hideFooter) {
      return null;
    }
    return (
      <Box
        displayPrint="none"
        sx={{
          paddingTop: "1rem",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <CookieConsent />

        <Container>
          <Box py="1rem">
            <Grid
              container
              justifyContent="space-between"
              spacing={4}
              alignItems="center"
            >
              <Grid item xs={isSmall ? 12 : undefined}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {t("home-route.meta.description")}
                </Typography>
              </Grid>
              <Grid item xs={isSmall ? 12 : undefined}>
                <Typography color="text.secondary">
                  {t("home-route.play-offline.description")}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Grid container justifyContent="center">
            <Grid item xs>
              <Box mb=".5rem">
                <Typography variant="caption" align="justify">
                  iHunt is a clean-room fork prepared for local testing. No
                  external trackers or donation links are bundled in this build.
                </Typography>
              </Box>
              <Box mb=".5rem">
                <Typography variant="caption" align="justify">
                  Version {env.version} • Build {env.buildNumber} • Commit{" "}
                  {env.hash}
                </Typography>
              </Box>
              <Box mb=".5rem">
                <Typography variant="caption" align="justify">
                  Licenses for bundled SRDs and assets remain unchanged from
                  their original publishers.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }

  function renderHeader() {
    const background = highlight.linearBackground;
    const color = highlight.color;
    return (
      <Box
        displayPrint="none"
        sx={{
          color: color,
          background: background,
          transition: theme.transitions.create(["color", "background"]),
        }}
      >
        <AppBar
          position="relative"
          sx={{
            color: "inherit",
            background: "inherit",
            boxShadow: "none",
            zIndex: zIndex.navBar,
          }}
        >
          <Box sx={{ padding: ".5rem 2.5rem" }}>
            <Toolbar
              sx={{
                margin: "0 auto",
                maxWidth: AppToolbarMaxWidth,
                minHeight: "72px",
                width: "100%",
                padding: "0",
                position: "relative",
                zIndex: zIndex.navBar,
              }}
            >
              <Box
                sx={{
                  textTransform: "none",
                  marginRight: "1rem",
                  textDecoration: "none",
                  display: props.hideHeaderLogo ? "none" : "inherit",
                }}
              >
                <NavLink to="/" data-cy="page.menu.home">
                  <Grid container wrap="nowrap" alignItems="center">
                    <Grid item sx={{ display: "flex" }}>
                      <Box
                        component="img"
                        alt="iHunt"
                        sx={{
                          height: "3.5rem",
                          cursor: "pointer",
                        }}
                        src={Images.logoWhiteSvg}
                      />
                    </Grid>
                    <Grid item sx={{ display: "flex" }}>
                      <Typography
                        noWrap
                        sx={{
                          color: "#fff",
                          whiteSpace: "nowrap",
                          fontSize: "1.1rem",
                          fontWeight: theme.typography.fontWeightBold,
                        }}
                      >
                        iHunt{" "}
                        <Typography
                          component="span"
                          sx={{
                            fontSize: "1.1rem",
                            fontWeight: theme.typography.fontWeightRegular,
                          }}
                        >
                          Toolkit
                        </Typography>
                      </Typography>
                    </Grid>
                  </Grid>
                </NavLink>
              </Box>

              <Hidden mdDown>{renderMenu(false)}</Hidden>
              <Hidden mdUp>
                {!isLive && (
                  <IconButton
                    color="inherit"
                    sx={{ padding: "0" }}
                    onClick={() => {
                      setMenuOpen(true);
                    }}
                    size="large"
                  >
                    <MenuIcon color="inherit" />
                  </IconButton>
                )}
              </Hidden>
              <Drawer
                anchor="bottom"
                sx={{
                  "& .MuiPaper-root": {
                    maxHeight: "80vh",
                  },
                }}
                open={menuOpen}
                onClose={() => {
                  setMenuOpen(false);
                }}
              >
                <Box
                  p="1.5rem"
                  color={"#fff"}
                  bgcolor={theme.palette.primary.main}
                >
                  {renderMenu(true)}
                </Box>
              </Drawer>
              <Typography
                sx={{
                  flex: "1 1 auto",
                }}
              />
              {shouldDisplayRejoinButton && (
                <ThemeProvider theme={highlight.highlightTheme}>
                  <Button
                    color="primary"
                    onClick={() => {
                      navigate(`/play/${gameId}`);
                    }}
                    variant={"outlined"}
                    sx={{
                      minWidth: "10rem",
                    }}
                  >
                    <Typography variant="button" noWrap>
                      Rejoin&nbsp;Game
                    </Typography>
                  </Button>
                </ThemeProvider>
              )}
            </Toolbar>
          </Box>
        </AppBar>
      </Box>
    );
  }

  function renderMenu(mobile: boolean) {
    const itemClass: BoxProps["sx"] = mobile
      ? { textAlign: "center !important" }
      : { flex: "0 1 auto !important" };

    const smSize = 8;
    const xsSize = 12;

    return (
      <Grid
        container
        spacing={3}
        justifyContent={mobile ? "center" : undefined}
        alignItems="center"
      >
        {!isLive && (
          <>
            <Grid item xs={xsSize} sm={smSize} sx={itemClass}>
              <NavLink
                highlight
                data-cy="page.menu.my-binder"
                startIcon={<MenuBookIcon />}
                onClick={() => {
                  myBinderManager.actions.open();
                }}
              >
                {t("menu.my-binder")}
              </NavLink>
            </Grid>
            <Grid item xs={xsSize} sm={smSize} sx={itemClass}>
              <NavLinkCategory
                label={t("menu.tools")}
                data-cy="page.menu.tools"
                subNav={[
                  {
                    label: t("menu.tools"),
                    links: [
                      {
                        to: "/data",
                        label: t("menu.data"),
                        icon: <StorageIcon />,
                      },
                      {
                        to: "/dice",
                        label: t("menu.dice"),
                        icon: <Icons.FateDice />,
                        ["data-cy"]: "page.menu.tools.dice",
                      },

                      {
                        to: "/story-builder",
                        label: "Story Builder",
                        icon: <LocalLibraryIcon />,
                      },
                      {
                        to: "/story-dice",
                        label: "Story Dice",
                        icon: <CasinoIcon />,
                      },
                      {
                        to: "/oracle",
                        label: t("menu.oracle"),
                        icon: <Icons.EyeIcon />,
                      },
                    ],
                  },
                ]}
              />
            </Grid>
          </>
        )}

        <Grid item xs={xsSize} sm={smSize} sx={itemClass}>
          <NavLinkCategory
            data-cy="page.menu.languages"
            tooltip={t("menu.languages")}
            label={<TranslateIcon />}
          >
            <Box>
              <Select
                fullWidth
                native
                value={currentLanguage}
                inputProps={{
                  ["data-cy"]: "app.languages",
                }}
                onChange={(e) => {
                  const newLanguage = e.target.value as string;
                  i18n.changeLanguage(newLanguage);
                  logger.setTag("language", newLanguage);
                }}
                variant="standard"
              >
                {Object.keys(PossibleLanguagesNames).map((languageKey) => {
                  const shouldRenderDev = languageKey === "dev" && env.isDev;
                  if (languageKey !== "dev" || shouldRenderDev) {
                    return (
                      <option key={languageKey} value={languageKey}>
                        {
                          PossibleLanguagesNames[
                            languageKey as IPossibleLanguages
                          ]
                        }
                      </option>
                    );
                  }
                })}
              </Select>
            </Box>
          </NavLinkCategory>
        </Grid>

        <Grid item xs={xsSize} sm={smSize} sx={itemClass}>
          <NavLink
            data-cy="page.use-theme-from-system-preferences"
            tooltip={t("menu.use-theme-from-system-preferences")}
            onClick={() => {
              settingsManager.actions.setThemeMode(undefined);
            }}
          >
            <ComputerIcon />
          </NavLink>
        </Grid>
        <Grid item xs={xsSize} sm={smSize} sx={itemClass}>
          <NavLink
            data-cy="page.toggle-dark-mode"
            tooltip={t("menu.toggle-theme")}
            onClick={() => {
              if (settingsManager.state.themeMode === "dark") {
                settingsManager.actions.setThemeMode("light");
              } else {
                settingsManager.actions.setThemeMode("dark");
              }
            }}
          >
            {settingsManager.state.themeMode === "dark" ? (
              <LightModeIcon />
            ) : (
              <DarkModeIcon />
            )}
          </NavLink>
        </Grid>
        <Grid item xs={xsSize} sm={smSize} sx={itemClass}>
          <NavLink
            tooltip={t("menu.whats-new")}
            onClick={() => {
              // ignore
            }}
          >
            <AppLink to="/changelog" underline="hover" color="inherit">
              {t("menu.whats-new")}
            </AppLink>
          </NavLink>
        </Grid>
      </Grid>
    );
  }
};
