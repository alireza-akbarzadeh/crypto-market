import AboutUsView from "./about-us.view";

type PropTypes = {};
export default function AboutUsPage(props: PropTypes) {
  const openEnamad = () => {
    window.open(
      "https://logo.samandehi.ir/Verify.aspx?id=314102&p=xlaorfthaodsrfthobpduiwk",
      "Popup",
      "toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30"
    );
    // window.open(
    //   // "https://logo.samandehi.ir/Verify.aspx?id=174471&amp;p=nbpdyndtshwlshwlyndtnbpd",
    //   // "https://logo.samandehi.ir/Verify.aspx?id=174471&amp;p=rfthjyoeaodsaodsjyoerfth",
    //   "https://logo.samandehi.ir/Verify.aspx?id=174471&p=rfthjyoeaodsaodsjyoerfth",
    //   "Popup",
    //   "toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30"
    // );
  };
  return <AboutUsView openEnamad={openEnamad} />;
}
