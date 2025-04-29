import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { HelmetProvider, Helmet } from "react-helmet-async";

const AboutMe = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-gray-800 dark:bg-gray-900 relative py-5 md:py-10">
      <div>
        <HelmetProvider>
        <Helmet>
          <title>OCode</title>
          <meta
            name="description"
            content="Osman Hadzic is an experienced .NET developer based in the USA, specializing in ASP.NET Core, Entity Framework, and SQL Server. Discover high-quality .NET development services and solutions for your business."
          />
          <meta
            name="keywords"
            content=".NET developer USA, ASP.NET Core developer USA, Entity Framework developer USA, SQL Server developer USA, software development USA, backend developer USA, C# developer USA, Microsoft technologies USA"
          />
          <link rel="canonical" href="https://osman-hadzic.com/" />
        </Helmet>
        </HelmetProvider>
      </div>
      <h2 className="text-gray-100 dark:text-gray-200 text-center text-xl font-medium uppercase tracking-widest">
        {t("about_me.title")}
      </h2>

      <div className="flex flex-col items-center justify-center gap-10 px-10 pb-10 md:flex-row md:pb-0">
        <div className="text-center md:w-1/3">
          <div className="bg-gray-100 dark:bg-gray-800 mb-[30px] mt-[55px] inline-block p-4 pb-10 shadow-card">
            <img
              src={`images/${t("about_me.image")}`}
              alt="Profile"
              height="250px"
              className="w-[200px] rounded"
            />
            <div className="mt-3 flex justify-between">
              {t("about_me.tech_stacks", { returnObjects: true })?.map(
                (tech: string) => (
                  <Icon
                    key={tech}
                    icon={tech}
                    style={{
                      fontSize: 50,
                      color: "#E5E5E5", // Light gray color for icons
                    }}
                  />
                ),
              )}
            </div>
          </div>
        </div>
        <div className="md:w-2/3">
          <div className="border-gray-600 dark:border-gray-700 rounded-sm border">
            <div className="border-gray-600 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 flex items-center gap-3 border-b px-3 py-2">
              <Icon icon="emojione:red-circle" width={10} />
              <Icon icon="twemoji:yellow-circle" width={10} />
              <Icon icon="twemoji:green-circle" width={10} />
            </div>
            <div
              className="text-gray-800 dark:text-gray-300 p-3 text-justify"
              style={{
                height: "auto",
                fontSize: "132%",
                lineHeight: "200%",
              }}
            >
              <br />
              <span className="text-xl font-medium dark:text-white">
                {t("about_me.greeting")}{" "}
              </span>
              <br />
              <br />
              <p className="dark:text-gray-300 text-sl font-small font-mono">
                {t("about_me.content")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
