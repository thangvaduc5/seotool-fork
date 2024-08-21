import ProfileOptions from './shared/ProfileOptions'
import { Profile } from '../context/ProfileContext'

const ProfileItem: React.FC<{ profile: Profile; id: number }> = (props) => {
  // console.log(index)
  return (
    <tr key={props.id}>
      <th scope="row">{props.id}</th>
      <td className="text-truncate" style={{ maxWidth: '40px' }}>
        {props.profile.name}
      </td>
      <td className="text-truncate" style={{ maxWidth: '200px' }}>
        <a href={props.profile.website} target="_blank" rel="noopener noreferrer">
          {props.profile.website}
        </a>
      </td>
      <td className="">
        <div className="d-flex justify-content-end">
          <ProfileOptions profile={props.profile} />
        </div>
      </td>
    </tr>
  )
}

export default ProfileItem
