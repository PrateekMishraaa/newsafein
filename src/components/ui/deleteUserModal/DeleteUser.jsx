import { apiJson } from "api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "./delete.module.css";

export const DeleteUsers = async (id) => {
  const result = await Swal.fire({
    title: "Please type 'confirm' for Delete the User.",
    input: "text",
    inputValue: "",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "Please Enter Text 'confirm' in Input Field.";
      }
    },
    customClass: {
      title: "title_text",
    },
  });

  if (result.isConfirmed) {
    const value = result.value;

    try {
      let res = await apiJson.delete(
        `/admin/deleteUserData/${id}?confirmation=${value}`
      );
      if (res.status == 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "Something Went Wrong Check your Network Connection"
      );
    }
  }
};

//Delete Institute Api is call
export const DeleteInstitute = async (id) => {
  const result = await Swal.fire({
    title: "Please type 'confirm' for Delete the Institute.",
    input: "text",
    inputValue: "",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "Please Enter Text 'confirm' in Input Field.";
      }
    },
    customClass: {
      title: "title_text",
    },
  });

  if (result.isConfirmed) {
    const value = result.value;
    try {
      let res = await apiJson.delete(
        `/admin/deleteInstituteData/${id}?confirmation=${value}`
      );
      if (res.status == 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "Something Went Wrong Check your Network Connection"
      );
    }
  }
};

//Certificate delete api is call

export const deleteCertificateById = async (id) => {
  const userConfirmation = await Swal.fire({
    title: "Are you sure?",
    text: "You want to delete this certifate.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  });
  if (userConfirmation.isConfirmed) {
    try {
      let res = await apiJson.delete(`/admin/deleteCertifate/${id}`);
      if (res.status == 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "Something went wrong check your Network connection."
      );
    }
  }
};
