import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";

import { setLocale, Translate } from "react-redux-i18n";

function LangSwitcher({ locale, setLocale }) {
  const handleChange = e => {
    const value = e.target.value;

    if (setLocale) setLocale(value);
  };

  return (
    <section className="langSwitcher">
      <h3>
        <Translate value="lang.language" />
      </h3>
      <form onChange={handleChange}>
        <div className="radio-group">
          <input
            id="en-option"
            type="radio"
            name="lang"
            value="en"
            checked={locale == "en"}
          />
          <label htmlFor="en-option">
            <Translate value="lang.en" />
          </label>
          <input
            id="ru-option"
            type="radio"
            name="lang"
            value="ru"
            checked={locale == "ru"}
          />
          <label htmlFor="ru-option">
            <Translate value="lang.ru" />
          </label>
        </div>
      </form>
    </section>
  );
}

const mapStateToProps = ({ i18n }) => ({ locale: i18n.locale });
const mapDispatchToProps = { setLocale };

export default connect(mapStateToProps, mapDispatchToProps)(LangSwitcher);
