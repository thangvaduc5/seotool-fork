import { useContext } from 'react'
import SpinnerLoading from '../utils/SpinnerLoading'
import ProfileItem from './ProfileItem'
import ProfileContext, { ProfileContextType } from '../context/ProfileContext'

const ProfileList = () => {
  const { profiles, isLoading } = useContext(
    ProfileContext
  ) as ProfileContextType

  return (
    <div className="row mt-4">
      <div className="col-12">
        {isLoading ? ( // Check for loading state
          <SpinnerLoading /> // Render spinner while loading
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Name</th>
                <th scope="col">URL</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {profiles?.map((profile, index) => (
                <ProfileItem key={index} profile={profile} id={index+1} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default ProfileList
