import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateOtherDetailsMutation } from "../redux/api/userApi";

function UpdateOtherProfileDetails() {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const [updateOtherDetails, { error, isSuccess, data }] =
    useUpdateOtherDetailsMutation();

  useEffect(() => {
    if (user) {
      setFormData({
        qualifications: user?.qualifications,
        experiences: user?.experiences,
        primarySkills: user?.primarySkills,
      });
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error.data.error);
    }

    if (isSuccess) {
      toast.success(data.message);
      navigate("/dashboard");
    }
  }, [error, isSuccess, data, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // reusable function for adding formData's qualifications, experiences, timeSlots object
  function addItem(key, item) {
    setFormData((prevData) => ({
      ...prevData,
      [key]: [...prevData[key], item],
    }));
  }

  // Reusable input change function
  // 'key' can be = 'qualifications', 'experiences', 'timeSlots'
  // 'index' is element of the selected key
  function handleResuableInputChange(key, index, event) {
    const { name, value } = event.target;

    setFormData((prevData) => {
      //const updateItems = [...prevData[key]];
      //updateItems[index][name] = value; // updating object properties

      return {
        ...prevData,
        [key]: prevData[key].map((obj, i) =>
          i === index ? { ...obj, [name]: value } : obj
        ),
      };
    });
  }

  // Reusable delete function
  function deleteItem(key, index) {
    setFormData((prevData) => ({
      ...prevData,
      [key]: [...prevData[key].filter((_, i) => i !== index)],
    }));
  }

  // function to add new qualification
  function addQualification(e) {
    e.preventDefault();
    addItem("qualifications", {
      courseStartDate: "",
      courseEndDate: "",
      degree: "",
      university: "",
    });
  }

  // function to add new experience
  function addExperience(e) {
    e.preventDefault();
    addItem("experiences", {
      startDate: "",
      endDate: "",
      position: "",
      company: "",
    });
  }

  const handleQualificationChange = (event, index) => {
    handleResuableInputChange("qualifications", index, event);
  };

  const handleExperienceChange = (event, index) => {
    handleResuableInputChange("experiences", index, event);
  };

  const deleteQualifications = (e, index) => {
    e.preventDefault();
    deleteItem("qualifications", index);
  };

  const deleteExperiences = (e, index) => {
    e.preventDefault();
    deleteItem("experiences", index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateOtherDetails(formData);
  };

  return (
    <form className="w-75 mx-auto" onSubmit={handleSubmit}>
      <h4 className="text-center my-4">Update Details</h4>

      {/* Qualification */}
      <label className="form-label">
        <b>Qualifications:</b>
      </label>
      <div>
        {formData.qualifications?.map((item, index) => (
          <div className="mb-3" key={index}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="courseStartDate" className="form-label">
                  Start Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="courseStartDate"
                  name="courseStartDate"
                  value={
                    item.courseStartDate
                      ? new Date(item.courseStartDate)
                          .toISOString()
                          .slice(0, 10)
                      : ""
                  }
                  onChange={(e) => handleQualificationChange(e, index)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="courseEndDate" className="form-label">
                  End Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="courseEndDate"
                  name="courseEndDate"
                  value={
                    item.courseEndDate
                      ? new Date(item.courseEndDate).toISOString().slice(0, 10)
                      : ""
                  }
                  onChange={(e) => handleQualificationChange(e, index)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="degree" className="form-label">
                  Degree
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="degree"
                  name="degree"
                  value={item.degree}
                  onChange={(e) => handleQualificationChange(e, index)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="university" className="form-label">
                  University
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="university"
                  name="university"
                  value={item.university}
                  onChange={(e) => handleQualificationChange(e, index)}
                />
              </div>
            </div>

            <button
              className="px-2 my-2 btn btn-danger"
              onClick={(e) => deleteQualifications(e, index)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        ))}

        <button className="btn btn-dark" onClick={addQualification}>
          Add Qualification
        </button>
      </div>

      {/* Experiences */}
      <label className="form-label mt-5">
        <b>Experiences:</b>
      </label>
      <div>
        {formData.experiences?.map((item, index) => (
          <div className="mb-3" key={index}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="startDate" className="form-label">
                  Start Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  name="startDate"
                  value={
                    item.startDate
                      ? new Date(item.startDate).toISOString().slice(0, 10)
                      : ""
                  }
                  onChange={(e) => handleExperienceChange(e, index)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="endDate" className="form-label">
                  End Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  name="endDate"
                  value={
                    item.endDate
                      ? new Date(item.endDate).toISOString().slice(0, 10)
                      : ""
                  }
                  onChange={(e) => handleExperienceChange(e, index)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="position" className="form-label">
                  Position
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="position"
                  name="position"
                  value={item.position}
                  onChange={(e) => handleExperienceChange(e, index)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="company" className="form-label">
                  Company
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="company"
                  name="company"
                  value={item.company}
                  onChange={(e) => handleExperienceChange(e, index)}
                />
              </div>
            </div>

            <button
              className="px-2 my-2 btn btn-danger"
              onClick={(e) => deleteExperiences(e, index)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        ))}

        <button className="btn btn-dark" onClick={addExperience}>
          Add Experience
        </button>
      </div>

      {/* Primary Skills */}
      <label className="form-label mt-5">
        <b>Primary Skills:</b>
      </label>
      <textarea
        rows={3}
        className="w-100 form-control"
        name="primarySkills"
        value={formData.primarySkills || ""}
        onChange={handleChange}
      >
        Add Your Primary Skills...
      </textarea>

      <button className="bgColor d-block mx-auto my-5 py-2 px-4 border-0 rounded">
        Update
      </button>
    </form>
  );
}

export default UpdateOtherProfileDetails;
