import {
  AddCircleOutlineTwoTone,
  FactCheckTwoTone,
} from "@mui/icons-material";
import { Button } from "@mui/material";

const EventThemes = () => {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h6>Assign themes to the Tracks</h6>
        </div>
        <div>
          <Button
            variant="contained"
            color="success"
            size="small"
            className="text-capitalize py-2"
          >
            <AddCircleOutlineTwoTone />
            &nbsp;Add Theme
          </Button>
        </div>
      </div>
      {/* Modal form For Adding Personal Tracks  */}
      <form action="">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label className="form-check-label" for="flexCheckDefault">
            Finance Track
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckChecked"
          />
          <label className="form-check-label" for="flexCheckChecked">
            Sherpa Track
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckChecked"
          />
          <label className="form-check-label" for="flexCheckChecked">
            Foreign Ministers Track
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckChecked"
          />
          <label className="form-check-label" for="flexCheckChecked">
            Leaders Track
          </label>
        </div>
        <div>
          <Button
            variant="outlined"
            className="text-capitalize rounded mt-4 py-2"
            color="success"
            size="large"
          >
            <FactCheckTwoTone />
            &nbsp;&nbsp;Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EventThemes;
