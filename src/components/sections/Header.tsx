import { useContext, useEffect, useMemo, useState } from "react";
import Switch from "react-switch";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react/dist/offline";
import { ThemeContext, ThemeContextInterface } from "@/contexts";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Header = () => {
  const { darkTheme, toggleTheme } = useContext(
    ThemeContext,
  ) as ThemeContextInterface;

  const { t, i18n } = useTranslation();

  const setLanguage = (lng: "en" | "bos") => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem("ocode_language", lng);
    } catch {
      // Ignore.
    }
  };

  const [TypeAnimationComponent, setTypeAnimationComponent] =
    useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    let cancelled = false;

    import("react-type-animation")
      .then((mod) => {
        if (!cancelled) {
          setTypeAnimationComponent(() => mod.TypeAnimation);
        }
      })
      .catch(() => {
        // If the chunk fails to load, keep the fallback text.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const titles = useMemo(() => {
    const raw = t("basic_info.titles", { returnObjects: true });
    return Array.isArray(raw) ? (raw as string[]) : [];
  }, [t]);

  const typeSequence = useMemo(
    () => titles.flatMap((title) => [title, 1000]),
    [titles],
  );

  return (
    <>
      <div>
        <HelmetProvider>
          <Helmet>
            <title>OCode</title>
            <meta name="keywords" content=".NET developer" />
            <meta
              name="google-site-verification"
              content="LafaBU9N3x5nwtSOc2vnA3on_V776QQIF6zzRRVyNPw"
            />
            <link rel="canonical" href="https://osman-hadzic.com/" />
            <link rel="canonical" href="https://osman-hadzic.com/blog" />
            <link
              rel="canonical"
              href="https://osman-hadzic.com/blog/hello-world"
            />
          </Helmet>
        </HelmetProvider>
      </div>
      <header className="h-[650px] w-[100%] bg-yellow dark:bg-[#494949]">
        <div className="flex h-full flex-col items-center justify-center gap-5">
          <div>
            <Icon
              className="text-gray-dark"
              icon="la:laptop-code"
              style={{
                height: "100%",
                fontSize: 150,
              }}
            />
          </div>

          <h1 className="text-4xl font-bold text-gray-dark dark:text-white">
            {t("basic_info.name")}
          </h1>

          {TypeAnimationComponent ? (
            <TypeAnimationComponent
              sequence={typeSequence}
              wrapper="span"
              speed={50}
              className="text-regular text-2xl text-gray-dark dark:text-white"
              repeat={Infinity}
            />
          ) : (
            <span className="text-regular text-2xl text-gray-dark dark:text-white">
              {titles[0] ?? ""}
            </span>
          )}

          <Link
            to="/blog"
            aria-label="Open blog"
            className="inline-flex items-center gap-2 rounded border border-gray-dark px-6 py-2 text-gray-dark shadow-card hover:shadow-card-hover dark:border-white dark:text-white"
          >
            <Icon icon="la:newspaper" className="text-[20px]" />
            <span className="font-medium">Blog</span>
          </Link>

          <label htmlFor="themeSwitch" className="flex items-center">
            <span className="sr-only">Toggle dark theme</span>{" "}
            {/* Screen reader-only label */}
            <Switch
              id="themeSwitch"
              checked={darkTheme}
              onChange={toggleTheme}
              offColor="#baaa80"
              onColor="#353535"
              className="react-switch mx-auto"
              width={90}
              height={40}
              uncheckedIcon={
                <Icon
                  className="ml-5 h-full text-end text-[25px] text-gray-dark"
                  icon="twemoji:owl"
                />
              }
              checkedIcon={
                <Icon
                  className="ml-5 h-full text-end text-[25px] text-gray-dark"
                  icon="noto-v1:sun-with-face"
                />
              }
            />
          </label>
        </div>
      </header>

      <div className="flex justify-center gap-5 bg-yellow pb-2.5 pt-20 dark:bg-[#494949]">
        <Icon
          className={clsx(
            "h-full cursor-pointer text-[50px] text-gray-dark",
            i18n.language === "en" && "brightness-50",
          )}
          icon="twemoji:flag-for-flag-united-kingdom"
          onClick={() => setLanguage("en")}
          aria-label="Change language to English" // Accessibility label
        />
        <Icon
          className={clsx(
            "h-full cursor-pointer text-[50px] text-gray-dark",
            i18n.language === "bos" && "brightness-50",
          )}
          icon="twemoji:flag-for-flag-bosnia-and-herzegovina"
          onClick={() => setLanguage("bos")}
          aria-label="Change language to Bosnian" // Accessibility label
        />
      </div>
    </>
  );
};

export default Header;
