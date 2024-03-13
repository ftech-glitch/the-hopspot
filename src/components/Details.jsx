import React from "react";

// Format phone number string
const formatNumber = (phoneStr) => {
  let cleaned = ("", phoneStr).replace(/\D/g, "");

  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }

  return null;
};

/**
 *
 * @param {object} brewery
 */
const Details = ({ brewery }) => {
  const breweryAddress =
    brewery.street +
    ", " +
    brewery.city +
    ", " +
    brewery.state +
    " " +
    brewery.postal_code;

  return (
    <div>
      <div
        className="modal fade"
        id={"detailsModal_" + brewery.id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="detailsModal"
        aria-hidden="true"
        key={brewery.id}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {brewery.name}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                <div
                  className="mr-2"
                  text=":beer:"
                  style={{ fontSize: "1.5em" }}
                />
                {brewery.brewery_type[0].toUpperCase() +
                  brewery.brewery_type.slice(1)}
              </p>
              <p>
                <div
                  className="mr-2"
                  text=":house:"
                  style={{ fontSize: "1.5em" }}
                />
                <a
                  href={"http://maps.google.com/?q=" + breweryAddress}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="Brewery address"
                >
                  {breweryAddress}
                </a>
              </p>
              <p>
                <div
                  className="mr-2"
                  text=":phone:"
                  style={{ fontSize: "1.5em" }}
                />
                {brewery.phone ? (
                  <a
                    aria-label="Brewery phone number"
                    href={"tel:" + formatNumber(brewery.phone)}
                  >
                    {formatNumber(brewery.phone)}
                  </a>
                ) : (
                  <span>None</span>
                )}
              </p>
              <p>
                <div
                  className="mr-2"
                  text=":link:"
                  style={{ fontSize: "1.5em" }}
                />
                {brewery.website_url ? (
                  <a
                    aria-label="Brewery website"
                    href={brewery.website_url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {brewery.website_url}
                  </a>
                ) : (
                  <span>None</span>
                )}
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
