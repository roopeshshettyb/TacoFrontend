const ParralaxBG = ({ url, children = "TACOOOO" }) => {
  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: "url(" + url + ")",
        backgroundAttachment: "fixed",
        padding: "30px 0px 35px 0px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        display: "block",
      }}
    >
      <h2 className="display-1 font-weight-bold text-center py-5">
        {children}
      </h2>
    </div>
  );
};
export default ParralaxBG;
