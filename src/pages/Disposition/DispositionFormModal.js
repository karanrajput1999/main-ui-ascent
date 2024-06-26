import {
  Input,
  Label,
  Form,
  FormFeedback,
  Modal,
  ModalBody,
  ModalHeader,
  Alert,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { useState, useRef } from "react";

function DispositionFormModal({
  modal_list, // modal state
  tog_list, // to change modal state
  handleDispositionFormSubmit, // submit function for form
  dispositionFormValidation, // to get the values from formik
  isEditingDisposition, // state of whether we are editing the user or not, if we are editing the user then form fields will have the values of that user
  alreadyExistsError,
  inputBadges,
  setInputBadges,
}) {
  const [inputWidth, setInputWidth] = useState(0);

  const inputRef = useRef();

  // add badge when enter key is pressed
  function handleInputOnKeyPress(e) {
    if (e.key === "Enter") {
      setInputBadges((prev) => [...prev, e.target.value]);

      dispositionFormValidation.setFieldValue("options", [
        ...inputBadges,
        e.target.value,
      ]);
      dispositionFormValidation.setFieldValue("options", "");
    }

    if (e.key === "Backspace") {
      // check if input doesn't have any value then remove the last badge
      if (e.target.value === "") {
        setInputBadges((prev) => {
          // Remove the last item from inputBadges array
          const updatedBadges = [...prev];
          updatedBadges.pop();
          return updatedBadges;
        });
      }
    }
  }

  function handleInputWidth(e) {
    const inputValue = e.target.value;
    setInputWidth(inputValue.length);
  }

  function handleInputFocus() {
    inputRef.current.focus();
  }

  return (
    <Modal
      isOpen={modal_list}
      toggle={() => {
        tog_list();
      }}
      centered
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          tog_list();
        }}
      >
        {isEditingDisposition ? "Update Disposition" : "Create Disposition"}
      </ModalHeader>
      <Form
        className="tablelist-form"
        // onSubmit={(e) => {
        //   handleDispositionFormSubmit(
        //     e,
        //     dispositionFormValidation.dispositionName
        //   );
        // }}
        onSubmit={handleDispositionFormSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      >
        <ModalBody style={{ paddingTop: "0px" }}>
          {alreadyExistsError && (
            <Alert color="danger" style={{ marginBlock: "10px" }}>
              {alreadyExistsError}
            </Alert>
          )}
          <div className="mb-2">
            <Label htmlFor="dispositionName" className="form-label">
              Disposition Name
            </Label>

            <Input
              id="dispositionName"
              name="dispositionName"
              className="form-control"
              placeholder="Enter Disposition Name"
              type="text"
              onChange={dispositionFormValidation.handleChange}
              onBlur={dispositionFormValidation.handleBlur}
              value={dispositionFormValidation.values.dispositionName || ""}
              invalid={
                dispositionFormValidation.touched.dispositionName &&
                dispositionFormValidation.errors.dispositionName
                  ? true
                  : false
              }
            />

            {dispositionFormValidation.touched.dispositionName &&
            dispositionFormValidation.errors.dispositionName ? (
              <FormFeedback type="invalid">
                {dispositionFormValidation.errors.dispositionName}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-3">
            <Label htmlFor="choices-text-unique-values" className="form-label">
              Options
            </Label>

            <div
              className="choices__inner d-flex align-items-center flex-wrap"
              style={{ paddingInline: "14px", paddingBlock: "3px", gap: "2px" }}
              onClick={handleInputFocus}
            >
              {inputBadges.map((badge, key) => (
                <div
                  key={key}
                  className="bg-primary fs-12 d-flex justify-content-center align-items-center rounded"
                  style={{
                    height: "22px",
                    marginRight: "2px",
                    lineHeight: 1,
                    color: "white",
                    paddingBlock: "3px",
                    paddingInline: "8px",
                  }}
                >
                  <span>{badge}</span>
                </div>
              ))}

              <Input
                id="options"
                name="options"
                className="form-control"
                type="text"
                style={{
                  height: "22px",
                  padding: "0",
                  width: inputWidth ? inputWidth + "ch" : "1ch",
                  border: "none",
                }}
                onChange={(e) => {
                  handleInputWidth(e);
                  dispositionFormValidation.handleChange(e);
                }}
                onKeyDown={handleInputOnKeyPress}
                innerRef={inputRef}
                onBlur={dispositionFormValidation.handleBlur}
                value={dispositionFormValidation.values.options || ""}
              />
            </div>
          </div>

          {/* <button onClick={handleInputFocus}>Focus input</button> */}
          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              {isEditingDisposition ? "Update " : "Create "}
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default DispositionFormModal;
