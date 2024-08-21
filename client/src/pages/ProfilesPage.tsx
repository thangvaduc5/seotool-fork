import { useContext } from "react"
import ProfileContext, { ProfileContextType, Profile } from "../context/ProfileContext"
import AddEditModal from "../components/shared/AddEditModal";
import ProfileList from "../components/ProfileList";

const ProfilesPage: React.FC = () => {
  const { addProfile } = useContext(ProfileContext) as ProfileContextType;

  const handleCreate = (data: Profile) => {
    if (addProfile) {
      addProfile(data);
    }
    console.log('Created Profile with:', data);
  };

  return (
    <div className="container mt-5">
      {/* Header + Create */}
      <div className="d-flex justify-content-between">
        <div className="">
          <h1>Profiles</h1>
        </div>
        <div className="d-flex align-items-center">
          <AddEditModal mode="create" onSubmit={handleCreate} />
        </div>
      </div>

      {/* Table list */}
      <ProfileList />
    </div>
  );
}

export default ProfilesPage;
