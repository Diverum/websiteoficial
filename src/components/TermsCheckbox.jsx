import { Link } from "react-router-dom";

export default function TermsCheckbox({ acceptedTerms, setAcceptedTerms, termsError, setTermsError, lang, t }) {
  const prefix = lang === "en" ? "/en" : "";
  const f = t.cta.fields;

  return (
    <>
      <div className="terms-checkbox">
        <input
          type="checkbox"
          id="accept-terms"
          checked={acceptedTerms}
          onChange={(e) => {
            setAcceptedTerms(e.target.checked);
            if (e.target.checked) setTermsError(false);
          }}
        />
        <label htmlFor="accept-terms">
          {f.acceptTerms}{" "}
          <Link to={`${prefix}/terms`} target="_blank" rel="noopener noreferrer">
            {f.termsLink}
          </Link>{" "}
          {f.andText}{" "}
          <Link to={`${prefix}/privacy`} target="_blank" rel="noopener noreferrer">
            {f.privacyLink}
          </Link>
        </label>
      </div>
      {termsError && (
        <p className="terms-error">{f.termsRequired}</p>
      )}
    </>
  );
}