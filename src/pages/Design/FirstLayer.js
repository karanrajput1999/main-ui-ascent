function FirstLayer({
  design,
  tog_list,
  setLayerId,
  number_tog_list,
  tog_delete,
  setListDesignId,
  handleEditDesign,
}) {
  return (
    <td className="first">
      <div className="d-flex align-items-center" style={{ gap: "10px" }}>
        <span>{design?.audioText}</span>
        <div
          className="bg-primary-subtle d-flex justify-content-center align-items-center rounded-2"
          style={{
            width: "25px",
            height: "25px",
            border: "1px solid #32A6E4",
          }}
        >
          {design?.key}
        </div>
        <div className="d-flex" style={{ gap: "2px" }}>
          <button
            type="button"
            className="d-flex justify-content-center align-items-center  btn btn-primary waves-effect waves-light"
            style={{
              width: "25px",
              height: "25px",
            }}
            onClick={() => {
              setLayerId(design?.id);
              tog_list();
            }}
          >
            <i className="ri-add-line"></i>
          </button>
          <button
            type="button"
            className="d-flex justify-content-center align-items-center  btn btn-success waves-effect waves-light"
            style={{
              width: "25px",
              height: "25px",
            }}
            onClick={() => {
              setLayerId(design?.id);
              number_tog_list();
            }}
          >
            <i className="ri-phone-line"></i>
          </button>
          <button
            type="button"
            className="d-flex justify-content-center align-items-center  btn btn-warning waves-effect waves-light"
            style={{
              width: "25px",
              height: "25px",
            }}
            onClick={() => {
              handleEditDesign(design);
            }}
          >
            <i className="ri-edit-line"></i>
          </button>
          <button
            type="button"
            className="d-flex justify-content-center align-items-center  btn btn-danger waves-effect waves-light"
            style={{
              width: "25px",
              height: "25px",
            }}
            onClick={() => {
              tog_delete();
              setListDesignId(design?.id);
            }}
          >
            <i className="ri-delete-bin-2-line"></i>
          </button>
        </div>
      </div>
    </td>
  );
}

export default FirstLayer;
