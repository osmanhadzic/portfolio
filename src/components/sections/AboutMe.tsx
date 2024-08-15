import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const AboutMe = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-5 bg-gray-800 dark:bg-gray-900 md:py-10">
      <div>
        <Helmet>
          <title>OCode</title>
          <meta
            name="description"
            content="Osman Hadzic is an experienced .NET developer specializing in ASP.NET Core, Entity Framework, and SQL Server. Discover high-quality .NET development services and solutions."
          />
          <meta
            name="keywords"
            content=".NET developer, ASP.NET Core, Entity Framework, SQL Server, software development, backend developer, C#, Microsoft technologies"
          />
          <link rel="canonical" href="https://osman-hadzic.com/" />
        </Helmet>
      </div>
      <h2 className="text-center text-xl font-medium uppercase tracking-widest text-gray-100 dark:text-gray-200">
        {t("about_me.title")}
      </h2>

      <div className="flex flex-col items-center justify-center gap-10 px-10 pb-10 md:flex-row md:pb-0">
        <div className="text-center md:w-1/3">
          <div className="mb-[30px] mt-[55px] inline-block p-4 pb-10 shadow-card bg-gray-100 dark:bg-gray-800">
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
          <div className="rounded-sm border border-gray-600 dark:border-gray-700">
            <div className="flex items-center gap-3 border-b border-gray-600 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 px-3 py-2">
              <Icon icon="emojione:red-circle" width={10} />
              <Icon icon="twemoji:yellow-circle" width={10} />
              <Icon icon="twemoji:green-circle" width={10} />
            </div>
            <div
              className="p-3 text-justify text-gray-800 dark:text-gray-300"
              style={{
                height: "auto",
                fontSize: "132%",
                lineHeight: "200%",
              }}
            >
              <br />
              <span className="text-xl font-medium dark:text-white">
                {t("about_me.greeting")} :){" "}
              </span>
              <br />
              <br />
              <p className="text-sm font-medium dark:text-gray-300">
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
