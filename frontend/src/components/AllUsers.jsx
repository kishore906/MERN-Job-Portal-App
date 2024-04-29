import { toast } from "react-toastify";
import { useEffect } from "react";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../redux/api/userApi";

function AllUsers() {
  const { error, data } = useGetAllUsersQuery();
  const [deleteUser, { error: deleteErr, isSuccess, data: deleteMsg }] =
    useDeleteUserMutation();

  useEffect(() => {
    if (error) {
      toast.error(error.data.error);
    }
  }, [error, data]);

  useEffect(() => {
    if (deleteErr) {
      toast.error(deleteErr.data.error);
    }

    if (isSuccess) {
      toast.success(deleteMsg.message);
    }
  }, [deleteErr, isSuccess, deleteMsg]);

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover text-center w-75 mx-auto">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">FullName</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.users?.map((user, index) => (
            <tr key={index + 1}>
              <th scope="row">{index + 1}</th>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => deleteUser(user._id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllUsers;
