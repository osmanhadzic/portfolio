import "@/icons/register-resume";
import { Icon } from "@iconify/react/dist/offline";
import { useTranslation } from "react-i18next";

const Resume = () => {
  const { t } = useTranslation();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href =
      "https://drive.google.com/file/d/1Wff-7_tu1aBzwEF89TTf8xUQta47oD09/view?usp=sharing";
    link.download = "Osman_Hadzic_CV.pdf";
    link.target = "_blank";
    link.click();
  };

  return (
    <section className="bg-[#1f1f1f] px-3 py-5 pb-20 md:px-0">
      <div className="py-10 text-center">
        <h2 className="mb-4 text-xl font-medium uppercase tracking-widest text-white">
          {t("resume.title")}
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleDownload}
            type="button"
            className="bg-blue-500 hover:bg-blue-700 flex transform items-center rounded px-4 py-2 font-semibold text-white shadow-lg transition duration-200 ease-in-out hover:scale-105"
          >
            <Icon icon="mdi:download" className="mr-2" width="20" height="20" />
            {t("resume.title")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Resume;
