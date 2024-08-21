import { useContext } from "react";
import AddEditModal from "./AddEditModal"
import ProfileContext, { ProfileContextType } from "../../context/ProfileContext";
import { Profile } from "../../context/ProfileContext";

const ProfileOptions: React.FC<{ profile: Profile }> = ({ profile }) => {
    const { deleteProfile, editProfile } = useContext(ProfileContext) as ProfileContextType;

    const handleEdit = (data: Profile) => {
        if (editProfile) {
            editProfile(data);
        }
        console.log('Editing Profile Data:', data);
    };

    const handleDelete = () => {
        if (deleteProfile) {
          deleteProfile(profile._id!);
        }
        console.log('Deleted Profile ID:', profile._id);
      };

    return (
        <div>
            <ul className="list-inline m-0">
                <li className="list-inline-item">
                    <AddEditModal mode="edit" onSubmit={handleEdit} profile={profile} />
                </li>
                <li className="list-inline-item">
                    <button className="btn btn-danger btn-sm rounded-0" onClick={handleDelete} type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button>
                </li>
            </ul>
        </div>
    )
}

export default ProfileOptions
